<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Throwable;

class OrderController extends Controller
{
    /**
     * Danh sách orders
     */
    public function index(Request $request)
    {
        $limit = $request->query('limit', 10);

        $query = Order::with(['profile', 'orderDetails.product']);

        // 🔹 Filter theo status
        $query->when($request->filled('status'), function ($q) use ($request) {
            $q->where('status', $request->status);
        });

        // 🔹 Sort
        if ($request->filled('sort_by') && $request->filled('sort_order')) {
            // sort theo total_price
            if ($request->sort_by === 'total_price') {
                $qOrder = $request->sort_order === 'asc' ? 'asc' : 'desc';
                $query->orderBy('total_price', $qOrder);
            } // sort theo created_at (newest / oldest)
            elseif ($request->sort_by === 'created_at') {
                $qOrder = $request->sort_order === 'asc' ? 'asc' : 'desc';
                $query->orderBy('created_at', $qOrder);
            }
        } else {
            // mặc định: newest
            $query->orderBy('created_at', 'desc');
        }

        $query->when($request->search, function ($q, $search) {
            $q->where(function ($q2) use ($search) {
                $q2->where('id', 'LIKE', "%$search%")
                    ->orWhereHas('profile', fn($u) => $u->where('full_name', 'LIKE', "%$search%"));
            });
        });

        return response()->json($query->paginate($limit));
    }

    /**
     * @throws Throwable
     */
//DÙNG PROCEDURE
    //    public function store(Request $request)
//    {
//        $validate = $request->validate([
//            'profile_id' => 'required|exists:profiles,id',
//            'items' => 'required|array|min:1',
//            'items.*.product_id' => 'required|exists:products,id',
//            'items.*.quantity' => 'required|integer|min:1',
//        ]);
//
//        $orderId = DB::selectOne("
//        SELECT create_order(:profile_id, :items::jsonb) AS order_id
//    ", [
//            'profile_id' => $validate['profile_id'],
//            'items' => json_encode($validate['items']),
//        ])->order_id;
//
//        $order = Order::with('orderDetails.product')->findOrFail($orderId);
//
//        return response()->json([
//            'message' => 'Order created successfully',
//            'data' => $order
//        ], 201);
//    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'profile_id' => 'required|exists:profiles,id',
            'shipping_address' => 'required|string|max:200',
            'payment_method' => 'required|string|max:200',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $order = Order::create([
            'profile_id' => $validate['profile_id'],
            'total_price' => 0,
            'status' => 'PENDING',
            'shipping_address' => $validate['shipping_address'],
            'payment_method' => $validate['payment_method'],
        ]);

        DB::transaction(function () use ($validate, $order) {
            $totalPrice = 0;

            foreach ($validate['items'] as $item) {
                $product = Product::lockForUpdate()->findOrFail($item['product_id']);
                // lockForUpdate để tránh race condition khi nhiều người mua cùng sp
                if ($product->stock < $item['quantity']) {
                    throw new Exception("The product \"$product->name\" is out of stock");
                }

                $product->decrement('stock', $item['quantity']);

                $lineTotal = $item['quantity'] * $product->price;
                $totalPrice += $lineTotal;
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $lineTotal,  // giá tại thời điểm mua
                    ]);

                $order->update(['total_price' => $totalPrice]);
            }
        });

        return response()->json([
            'message' => 'Order created successfully',
            'data' => $order
        ], 201);
    }


    /**
     * Xem chi tiết 1 order
     */
    public function show(Order $order)
    {
        return response()->json($order->load(['user', 'orderDetails.product']));
    }

    /**
     * Cập nhật trạng thái order
     */
    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:PENDING,CONFIRMED,SHIPPED,COMPLETED,CANCELLED',
        ]);

        $order->update($validated);

        return response()->json([
            'message' => 'Order status updated successfully',
            'data' => $order
        ]);
    }

    /**
     * Xoá order
     */
    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json([
            'message' => 'Order deleted successfully'
        ]);
    }

    public function dashboardStats()
    {
        $month = Carbon::now()->month;
        $year = Carbon::now()->year;

        // Tổng doanh thu trong tháng
        $totalRevenue = Order::whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->sum('total_price');

        // Đếm đơn hàng theo trạng thái
        $orderCounts = Order::select('status', DB::raw('COUNT(*) as total'))
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->groupBy('status')
            ->pluck('total', 'status');

        $totalProducts = Product::count();
        $lowStockProducts = Product::where('stock', '<', 10)
            ->select('id', 'name', 'stock', 'price', 'status')
            ->orderBy('stock')
            ->get();
        // Trả về JSON
        return response()->json([
            'total_revenue' => $totalRevenue,
            'total_product' => $totalProducts,
            'low_stock_products' => $lowStockProducts,
            'pending' => $orderCounts['PENDING'] ?? 0,
            'confirmed' => $orderCounts['CONFIRMED'] ?? 0,
            'shipped' => $orderCounts['SHIPPED'] ?? 0,
            'completed' => $orderCounts['COMPLETED'] ?? 0,
            'cancelled' => $orderCounts['CANCELLED'] ?? 0,
        ]);
    }

    public function getOrderWithProfile(Request $request)
    {
        $infoRequest = $request->get('jwt_user');

        if (!$infoRequest) return response()->json(['message' => 'Unauthenticated'], 401);

        $user = User::find($infoRequest['sub']);//sub chứa username

        $profile = optional($user->profile);

        if (!$profile->id) {
            return response()->json(['message' => 'User has no profile'], 404);
        }

        $order = Order::where('profile_id', $profile->id)
            ->with('orderDetails.product.category')
            ->get();

        return response()->json($order);
    }
}
