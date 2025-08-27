<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Authorize access for ADMIN role only based on JWT payload.
     *
     * @param Request $request Current request with `jwt_user` injected.
     * @param Closure $next Next middleware.
     * @return Response JSON error or next middleware response.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $jwtUser = $request->get('jwt_user');

        if (!$jwtUser) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $jwtRole = $jwtUser['role']; // đây là string

        if ($jwtRole !== 'ADMIN') return response()->json(['message' => 'Forbidden: insufficient role'], 403);

        return $next($request);
    }
}
