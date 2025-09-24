<?php

namespace App\Http\Controllers;

use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GalleryImageController extends Controller
{
    /**
     * Hiển thị danh sách gallery (có phân trang).
     */
    public function index(Request $request): JsonResponse
    {
        $limit = $request->get('limit', 10);

        $query = GalleryImage::query();

        // Filter theo status
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        // Search theo name
        if ($request->has('search') && $request->search !== '') {
            $query->where('name', 'LIKE', '%' . $request->search . '%');
        }

        // Sort (mặc định mới nhất)
        if ($request->has(['sort_by', 'sort_order'])) {
            $query->orderBy($request->sort_by, $request->sort_order);
        } else {
            $query->latest();
        }

        $gallery = $query->paginate($limit);

        return response()->json($gallery);
    }

    /**
     * Thêm mới gallery image.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'img_url' => 'required|string|max:1000',
            'status'  => 'required|in:ACTIVE,INACTIVE',
        ]);

        $gallery = GalleryImage::create($validated);

        return response()->json([
            'message' => 'Gallery image created successfully',
            'data'    => $gallery,
        ], 201);
    }

    /**
     * Lấy chi tiết 1 gallery image.
     */
    public function show(GalleryImage $galleryImage): JsonResponse
    {
        return response()->json($galleryImage);
    }

    /**
     * Cập nhật 1 gallery image.
     */
    public function update(Request $request, GalleryImage $galleryImage): JsonResponse
    {
        $validated = $request->validate([
            'name'    => 'sometimes|required|string|max:255',
            'img_url' => 'sometimes|required|string|max:1000',
            'status'  => 'sometimes|required|in:ACTIVE,INACTIVE',
        ]);

        $galleryImage->update($validated);

        return response()->json([
            'message' => 'Gallery image updated successfully',
            'data'    => $galleryImage,
        ]);
    }

    /**
     * Xóa 1 gallery image.
     */
    public function destroy(GalleryImage $galleryImage): JsonResponse
    {
        $galleryImage->delete();

        return response()->json([
            'message' => 'Gallery image deleted successfully',
        ]);
    }
}
