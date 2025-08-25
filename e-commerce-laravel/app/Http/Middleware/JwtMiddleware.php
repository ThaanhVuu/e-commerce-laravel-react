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
    protected BlackToken $blackToken;
    protected AuthService $authService;

    /**
     * @param BlackToken $blackToken
     */
    public function __construct(BlackToken $blackToken, AuthService $authService)
    {
        $this->blackToken = $blackToken;
        $this->authService = $authService;
    }


    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->cookie('access_token');

        if (!$token) return response()->json(['error' => 'Unauthenticated'], 401);

        if ($this->blackToken->where('token', $token)->exists())
            return response()->json(['error' => 'Token revoked'], 401);

        try {
            $payload = $this->authService->decodeToken($token);

            if (isset($payload['exp']) && time() > $payload['exp'])
                return response()->json(['error' => 'Token expired'], 401);

            $request->merge(['jwt_user' => $payload]);
        } catch (ExpiredException $e) {
            return response()->json(['error' => 'Token expired'], 401);
        } catch (Exception $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }

        return $next($request);
    }
}
