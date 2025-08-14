<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Login user và trả về token
     */
    public function signIn(Request $request)
    {
        $credentials = $request->only('username', 'password');

        $user = User::where('username', $credentials['username'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        try {
            $token = JWTAuth::fromUser($user);
        } catch (JWTException $ex) {
            return response()->json(['error' => 'Could not create token: ' . $ex->getMessage()], 500);
        }

        return response()->json([
            'token' => $token
        ]);
    }

    public function signOut(Request $request)
    {
        try{
            JWTAuth::invalidate(JWTAuth::parseToken());
            return response()->json([
               'message' => 'Sign out successful'
            ]);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Failed to logout: ' . $e->getMessage()], 500);
        }
    }

    public function me()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return response()->json($user);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token invalid or expired'], 401);
        }
    }
}
