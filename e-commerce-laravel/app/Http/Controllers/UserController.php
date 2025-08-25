<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * List users ordered by username.
     *
     * @return JsonResponse Collection of users.
     */
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $users = User::orderBy('username')->get();
        return response()->json($users);
    }

    /**
     * Create a new user with validated fields.
     *
     * @param Request $request Incoming request with username/password/role.
     * @return JsonResponse Created user payload.
     */
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validate = $request->validate([
            'username' => 'required|string|unique:users|max:50',
            'password' => 'required|string|min:6',
            'role' => 'in:ADMIN,USER,MANAGER,SALER'
        ]);

        $validate['password'] = Hash::make($validate['password']);
        $user = User::create($validate);

        return response()->json($user, 201);
    }

    /**
     * Show a specific user by id.
     *
     * @param string $id User primary key (UUID).
     * @return JsonResponse User data or not found.
     */
    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    /**
     * Update a given user with conditional validation.
     *
     * @param Request $request Fields to update.
     * @param string $id User primary key (UUID).
     * @return JsonResponse Updated user or not found.
     */
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validate = $request->validate([
            'username' => 'sometimes|required|string|unique:users,username,' . $id . '|max:50',
            'password' => 'sometimes|required|string|min:6',
            'role' => 'sometimes|in:ADMIN,USER,MANAGER,SALER'
        ]);

        if (isset($validate['password'])) {
            $validate['password'] = Hash::make($validate['password']);
        }

        $user->update($validate);

        return response()->json($user);
    }

    /**
     * Delete a user by id.
     *
     * @param string $id User primary key (UUID).
     * @return JsonResponse Deletion result.
     */
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    /**
     * Return profile of the current JWT-authenticated user.
     *
     * @param Request $request Must contain `jwt_user` injected by middleware.
     * @return JsonResponse User data or appropriate error.
     */
    public function profile(Request $request): JsonResponse
    {
        $infoInToken = $request->get('jwt_user');

        if (!$infoInToken) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $user = User::find($infoInToken['sub']);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user); // trả JsonResponse chuẩn
    }
}
