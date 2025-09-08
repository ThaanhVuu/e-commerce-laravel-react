<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderDetailController extends Controller
{
    /**
     * Danh sách OrderDetails của 1 order
     */
    public function index($orderId)
    {
        $order = Order::findOrFail($orderId);
        $details = $order->orderDetails()->with('product')->get();

        return response()->json($details);
    }

    /**
     * Thêm 1 sản phẩm vào order
     */
    public function store(Request $request, $orderId)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        $order = Order::findOrFail($orderId);
        $product = Product::findOrFail($validated['product_id']);
        $price = $product->price * $validated['quantity'];

        $detail = OrderDetail::create([
            'id'         => Str::uuid(),
            'order_id'   => $order->id,
            'product_id' => $product->id,
            'quantity'   => $validated['quantity'],
            'price'      => $price,
        ]);

        // Cập nhật lại tổng giá trị order
        $order->update([
            'total_price' => $order->orderDetails()->sum('price'),
        ]);

        return response()->json([
            'message' => 'Order detail added successfully',
            'data'    => $detail->load('product')
        ], 201);
    }

    /**
     * Hiển thị chi tiết 1 OrderDetail
     */
    public function show(OrderDetail $orderDetail)
    {
        return response()->json($orderDetail->load('product', 'order'));
    }

    /**
     * Cập nhật số lượng sản phẩm trong order
     */
    public function update(Request $request, OrderDetail $orderDetail)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $product = $orderDetail->product;
        $newPrice = $product->price * $validated['quantity'];

        $orderDetail->update([
            'quantity' => $validated['quantity'],
            'price'    => $newPrice,
        ]);

        // cập nhật tổng giá trị order
        $order = $orderDetail->order;
        $order->update([
            'total_price' => $order->orderDetails()->sum('price'),
        ]);

        return response()->json([
            'message' => 'Order detail updated successfully',
            'data'    => $orderDetail->load('product')
        ]);
    }

    /**
     * Xoá sản phẩm khỏi order
     */
    public function destroy(OrderDetail $orderDetail)
    {
        $order = $orderDetail->order;

        $orderDetail->delete();

        // cập nhật tổng giá trị order
        $order->update([
            'total_price' => $order->orderDetails()->sum('price'),
        ]);

        return response()->json([
            'message' => 'Order detail deleted successfully'
        ]);
    }
}
