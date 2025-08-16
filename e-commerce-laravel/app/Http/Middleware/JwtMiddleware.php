<?php

namespace App\Http\Middleware;

use App\Models\BlacklistedToken;
use App\Models\User;
use Closure;
use Exception;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $authHeader = $request->header('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer')) {
            return \response()->json([
                'error' => 'Authorizaion Header is missing', 401
            ]);
        }

        $token = substr($authHeader, 7);

        try {
            $payload = (array)JWT::decode($token, new Key(env('JWT_SECRET'), 'HS512'));

            // ✅ Kiểm tra token đã bị blacklist chưa
            $isBlacklisted = BlacklistedToken::where('token', $token)->exists();
            if ($isBlacklisted) {
                return response()->json(['error' => 'Token has been revoked'], 401);
            }

            $user = User::find($payload['sub'] ?? null);
            if (!$user) {
                return response()->json(['error' => 'User not found'], 401);
            }

            // gắn user vào request để các controller có thể dùng
            $request->merge(['auth_user' => $user]);

        } catch (ExpiredException) {
            return response()->json(['error' => 'Token expired'], 401);
        } catch (Exception) {
            return response()->json(['error' => 'Invalid token'], 401);
        }

        return $next($request);
    }
}
