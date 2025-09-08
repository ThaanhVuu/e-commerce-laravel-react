<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ManagerMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $jwtUser = $request->get('jwt_user');

        if (!$jwtUser) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $jwtRole = $jwtUser['role']; // đây là string

        if ($jwtRole !== 'MANAGER') return response()->json(['message' => 'Forbidden: insufficient role'], 403);

        return $next($request);
    }
}
