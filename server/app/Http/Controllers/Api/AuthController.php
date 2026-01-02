<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use function Symfony\Component\Clock\now;

class AuthController extends Controller
{
    public function login(Request $request) {
        $validatedData = $request->validate([
            'username' => ['required', 'min:6', 'max:12'],
            'password' => ['required', 'min:6', 'max:15'],
        ]);

        if(!Auth::attempt(['username' => $validatedData['username'], 'password' => $validatedData['password']])) {
            return response()
                ->json([
                    'message' => 'The provided credentials are incorrect.',
                ], 401);
        }

        $request->session()->regenerate();

        $user = $request->user();

        $user->update([
            'last_login_at' => now()
        ]);

        return response()
            ->json([
                'user' => $user,
            ], 200);
    }

    public function me(Request $request) {
        $user = $request->user();
        $user->load('role');

        return response()
            ->json([
                'user' => $user
            ], 200);
    }

    public function logout(Request $request) {
        Auth::guard('web')
            ->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()
            ->json([
                'message' => 'Successfully Logged Out.'
            ], 200);
    }
}
