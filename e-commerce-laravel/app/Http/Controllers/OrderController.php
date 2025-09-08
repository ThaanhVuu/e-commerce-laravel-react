<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    /**
     * Danh sách orders
     */
    public function index(Request $request)
    {
        $limit = $request->query('limit', 10);
        $orders = Order::with(['user', 'orderDetails.product'])->paginate($limit);
        return response()->json($orders);
    }

    /**
     * Tạo order mới (kèm order details)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'items'   => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($validated) {
            $order = Order::create([
                'id' => Str::uuid(),
                'user_id' => $validated['user_id'],
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
}
