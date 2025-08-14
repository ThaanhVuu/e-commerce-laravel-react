<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        //
        return response()->json(User::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        //
        $validated = $request->validate([
            'username' => 'required|string|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'in:ADMIN,USER,MANAGER', // không required
        ]);

        $validated['password'] = Hash::make($validated['password']);

        return response()->json(User::create($validated), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $user = User::find($id);
        if(!$user){
            return response()->json(['message' => 'User not found'],404);
        }
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $user = User::find($id);
        if(!$user){
            return response()->json(['message' => 'User not found'],404);
        }

        $validated = $request->validate([
            'password' => 'required|min:6',
        ]);

            $validated['password'] = Hash::make($validated['password']);

        $user->update($validated);

        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $user = User::find($id);
        if(!$user){
            return response()->json(['message' => 'User not found'],404);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
