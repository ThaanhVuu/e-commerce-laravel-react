<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
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
            }
            // sort theo created_at (newest / oldest)
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
     * Tạo order mới (kèm order details)
     * @throws Throwable
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'profile_id' => 'required|exists:profiles,id',
            'items'   => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($validated) {
            $order = Order::create([
                'id' => Str::uuid(),
                'profile_id' => $validated['profile_id'],
                'total_price' => 0,
                'status' => 'PENDING',
            ]);

            $total = 0;

            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                $price = $product->price * $item['quantity'];

                OrderDetail::create([
                    'id' => Str::uuid(),
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $price,
                ]);

                if ($order->status !== 'CANCELED') {
                    $product->update([
                        'stock' => $product->stock - $item['quantity']
                    ]);
                }

                $total += $price;
            }

            $order->update(['total_price' => $total]);

            return response()->json([
                'message' => 'Order created successfully',
                'data' => $order->load('orderDetails.product')
            ], 201);
        });
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
            ->orderBy('stock', 'asc')
            ->get();
        // Trả về JSON
        return response()->json([
            'total_revenue' => $totalRevenue,
            'total_product' => $totalProducts,
            'low_stock_products' => $lowStockProducts,
            'pending'   => $orderCounts['PENDING'] ?? 0,
            'confirmed' => $orderCounts['CONFIRMED'] ?? 0,
            'shipped'   => $orderCounts['SHIPPED'] ?? 0,
            'completed' => $orderCounts['COMPLETED'] ?? 0,
            'cancelled' => $orderCounts['CANCELLED'] ?? 0,
        ]);
    }
}
