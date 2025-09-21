<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    /**
     * Hiển thị danh sách sản phẩm (có phân trang).
     * GET /api/v1.0/categories?limit=5&search=shirt&sort_by=name&sort_order=asc
     */
    public function index(Request $request): JsonResponse
    {
        $query = Product::with('category');

        // Filter theo status
        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        // Filter theo category_id
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->get('category_id'));
        }

        // Search theo tên
        if ($request->filled('search')) {
            $query->where('name', 'LIKE', "%" . $request->get('search') . "%");
        }

        // Sort
        if ($request->filled(['sort_by', 'sort_order'])) {
            $query->orderBy($request->get('sort_by'), $request->get('sort_order'));
        } else {
            $query->latest(); // mặc định created_at desc
        }

        // Pagination
        $limit = (int) $request->get('limit', 10);
        $products = $query->paginate($limit);

        return response()->json($products);
    }

    /**
     * Thêm mới sản phẩm.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string|max:150',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'stock'       => 'integer|min:0',
            'status'      => 'in:ACTIVE,INACTIVE',
        ]);

        $product = Product::create($validated);

        return response()->json([
            'message' => 'Product created successfully',
            'data'    => $product->load('category')
        ], 201);
    }

    /**
     * Hiển thị chi tiết sản phẩm.
     */
    public function show(Product $product): JsonResponse
    {
        return response()->json($product->load('category'));
    }

    /**
     * Cập nhật sản phẩm.
     */
    public function update(Request $request, Product $product): JsonResponse
    {
        $validated = $request->validate([
            'category_id' => 'sometimes|required|exists:categories,id',
            'name'        => 'sometimes|required|string|max:150',
            'description' => 'nullable|string',
            'price'       => 'sometimes|required|numeric|min:0',
            'stock'       => 'integer|min:0',
            'status'      => 'in:ACTIVE,INACTIVE',
        ]);

        $product->update($validated);

        return response()->json([
            'message' => 'Product updated successfully',
            'data'    => $product->load('category')
        ]);
    }

    /**
     * Xoá sản phẩm.
     */
    public function destroy(Product $product): JsonResponse
    {
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }
}
