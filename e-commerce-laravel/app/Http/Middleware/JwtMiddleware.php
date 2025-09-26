<?php

namespace App\Http\Middleware;

use App\Models\BlackToken;
use App\Services\AuthService;
use Closure;
use Exception;
use Firebase\JWT\ExpiredException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JwtMiddleware
{
    /**
     * Service to decode and validate JWT tokens.
     */
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Handle an incoming request: validate JWT from cookie and attach payload.
     *
     * @param Request $request Current HTTP request.
     * @param Closure $next Next middleware.
     * @return Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->cookie('access_token');

        if (!$token) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        if (BlackToken::where('token', $token)->exists()) {
            return response()->json(['error' => 'Token revoked'], 401);
        }

        try {
            $payload = $this->authService->decodeToken($token);

            if (isset($payload['exp']) && time() > $payload['exp']) {
                return response()->json(['error' => 'Token expired'], 401);
            }

            $request->merge(['jwt_user' => $payload]);
        } catch (ExpiredException) {
            return response()->json(['error' => 'Token expired'], 401);
        } catch (Exception) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
        return $next($request);
    }
}
