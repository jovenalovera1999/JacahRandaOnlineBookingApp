<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class GoogleAuthExtendedController extends Controller
{
    public function me(Request $request)
    {
        $user = $request->user();

        return response()
            ->json([
                'user' => $user->load(['role'])
            ], 200);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()
            ->json(['message' => 'Successfully Logged Out.'], 200);
    }
}
