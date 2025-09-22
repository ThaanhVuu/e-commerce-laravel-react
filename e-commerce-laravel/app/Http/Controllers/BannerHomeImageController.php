<?php

namespace App\Http\Controllers;

use App\Models\BannerHomeImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BannerHomeImageController extends Controller
{
    /**
     * Hiển thị danh sách banner có phân trang
     */
    public function index(Request $request): JsonResponse
    {
        $limit = $request->query('limit', 10);

        $banners = BannerHomeImage::paginate($limit);

        return response()->json($banners);
    }

    /**
     * Tạo mới banner
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:100',
            'img_url' => 'required|url',
            'status'  => 'required|in:ACTIVE,INACTIVE'
        ]);

        $banner = BannerHomeImage::create($validated);

        return response()->json([
            'message' => 'Banner created successfully',
            'data' => $banner
        ], 201);
    }

    /**
     * Xem chi tiết 1 banner
     */
    public function show(BannerHomeImage $bannerHomeImage): JsonResponse
    {
        return response()->json($bannerHomeImage);
    }

    /**
     * Cập nhật banner
     */
    public function update(Request $request, BannerHomeImage $bannerHomeImage): JsonResponse
    {
        $validated = $request->validate([
            'name'    => 'sometimes|required|string|max:100',
            'img_url' => 'sometimes|required|url',
            'status'  => 'sometimes|required|in:ACTIVE,INACTIVE'
        ]);

        $bannerHomeImage->update($validated);

        return response()->json([
            'message' => 'Banner updated successfully',
            'data' => $bannerHomeImage
        ]);
    }

    /**
     * Xóa banner
     */
    public function destroy(BannerHomeImage $bannerHomeImage): JsonResponse
    {
        $bannerHomeImage->delete();

        return response()->json([
            'message' => 'Banner deleted successfully'
        ]);
    }
}
