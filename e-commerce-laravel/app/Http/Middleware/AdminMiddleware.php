<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @param mixed ...$roles
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
