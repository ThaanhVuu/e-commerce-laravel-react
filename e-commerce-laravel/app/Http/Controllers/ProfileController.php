<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(int $limit): JsonResponse
    {
        $profiles = Profile::with('user')->paginate($limit);
        return response()->json($profiles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validate = $request->validate([
            'user_id'   => 'nullable|exists:users,id',
            'full_name' => 'required|string|max:100',
            'phone'     => 'required|string|max:20',
            'address'   => 'required|string',
            'gender'    => 'nullable|in:MALE,FEMALE,OTHER',
            'dob'       => 'nullable|date',
        ]);

        $profile = Profile::create(array_merge(
            ['id' => Str::uuid()],
            $validate
        ));

        return response()->json($profile, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $profile = Profile::with('user')->find($id);
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }
        return response()->json($profile);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $profile = Profile::find($id);
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        $validate = $request->validate([
            'full_name' => 'nullable|string|max:100',
            'phone'     => 'nullable|string|max:20',
            'address'   => 'nullable|string',
            'gender'    => 'nullable|in:MALE,FEMALE,OTHER',
            'dob'       => 'nullable|date',
        ]);

        $profile->update($validate);

        return response()->json($profile);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $profile = Profile::find($id);
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        $profile->delete();
        return response()->json(['message' => 'Profile deleted successfully']);
    }
}
