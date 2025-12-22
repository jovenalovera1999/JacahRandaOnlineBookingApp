<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    protected function tokenFromCookie()
    {
        $token = request()->cookie('access_token');

        if (!$token) {
            throw new UnauthorizedHttpException('', 'Token not provided');
        }

        return $token;
    }

    public function me()
    {
        $user = JWTAuth::setToken($this->tokenFromCookie())
            ->authenticate();

        return response()->json([
            'user' => $user->load(['role'])
        ]);
    }

    public function refresh()
    {
        $newToken = JWTAuth::refresh($this->tokenFromCookie());

        return response()
            ->json(['message' => 'Token Refreshed.'], 200)
            ->withCookie('access_token', $newToken, 60, '/', 'localhost', false, true, false, 'None');
    }

    public function logout()
    {
        JWTAuth::invalidate($this->tokenFromCookie());

        return response()
            ->json(['message' => 'Successfully Logged Out.'], 200)
            ->withCookie(cookie()->forget('access_token'));
    }
}
