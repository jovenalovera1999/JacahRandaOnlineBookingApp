<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request) {
        $validatedData = $request->validate([
            'username' => ['required', 'min:6', 'max:12'],
            'password' => ['required', 'min:6', 'max:15'],
        ]);

        $credentials = [
            'username' => $validatedData['username'],
            'password' => $validatedData['password'],
        ];

        if(!$token = JWTAuth::attempt($credentials)) {
            return response()
                ->json([
                    'message' => 'The provided credentials are incorrect.',
                ], 401);
        }

        $user = JWTAuth::user()->load('role');

        // Set the token in an httpOnly cookie
        $cookie = cookie(
            'jwt_token', // cookie name
            $token,      // token value
            60,          // minutes (1 hour)
            '/',         // path
            null,        // domain (null = current)
            false,       // secure (set true in production with HTTPS)
            true         // httpOnly
        );

        return response()
            ->json([
                'user' => $user,
                'token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->guard('api')->factory()->getTTL() * 60,
            ], 200)
            ->cookie($cookie);
    }

    public function me() {
        $user = JWTAuth::parseToken()->authenticate()->load('role');

        return response()
            ->json([
                'user' => $user
            ], 200);
    }

    public function logout() {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()
            ->json([
                'message' => 'Successfully Logged Out.'
            ], 200);
    }

    public function refresh() {
        $previousToken = JWTAuth::getToken();
        $newToken = JWTAuth::refresh($previousToken);

        // Set the token in an httpOnly cookie
        $cookie = cookie(
            'jwt_token', // cookie name
            $newToken,      // token value
            60,          // minutes (1 hour)
            '/',         // path
            null,        // domain (null = current)
            false,       // secure (set true in production with HTTPS)
            true         // httpOnly
        );

        return response()
            ->json([
                'token' => $newToken,
                'token_type' => 'bearer',
                'expires_in' => auth()->guard('api')->factory()->getTTL() * 60,
            ], 200)
            ->cookie($cookie);
    }
}
