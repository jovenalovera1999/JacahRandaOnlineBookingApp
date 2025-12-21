<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $origin = $request->get('Origin');

        $allowedOrigins = [
            'http://localhost:3000',
        ];

        if ($origin && in_array($origin, $allowedOrigins)) {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
            $response->headers->set('Access-Control-Allow-Credentials', 'true');
            $response->headers->set(
                'Access-Control-Allow-Headers',
                'Origin, Content-Type, Accept, Authorization, X-Requested-With'
            );
            $response->headers->set(
                'Access-Control-Allow-Methods',
                'GET, POST, PUT, PATCH, DELETE, OPTIONS'
            );
        }

        if ($request->getMethod() === 'OPTIONS') {
            return response()->json('OK', 200, $response->headers->all());
        }

        return $response;
    }
}
