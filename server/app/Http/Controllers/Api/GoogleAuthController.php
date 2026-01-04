<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;

class GoogleAuthController extends Controller
{
    // Redirect to Google login
    public function redirect(Request $request)
    {
        $redirectTo = $request->query('redirect_to', config('app.frontend_url'));

        return Socialite::driver('google')
            ->stateless()
            ->with(['state' => $redirectTo])
            ->redirect();
    }

    // Google callback
    public function callback(Request $request)
    {
        if($request->has('error')) {
            return redirect()->away(config('app.frontend_url') . '/');
        }

        $googleUser = Socialite::driver('google')
            ->stateless()
            ->user();

        $user = User::updateOrCreate(
            ['google_id' => $googleUser->id],
            [
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'username' => explode('@', $googleUser->email)[0],
                'role_id' => 3,
                'last_login_at' => now(),
            ]
        );

        // Log in user to create Sanctum session
        Auth::login($user, true);

        // Regenerate session for security
        $request->session()->regenerate();

        $redirectTo = $request->query('state', '/');

        return redirect()->away(config('app.frontend_url') . $redirectTo);
    }

    // Get authenticated user
    public function me(Request $request)
    {
        // logged-in user from Sanctum
        $user = $request->user();

        // Fetch the role and approved bookings if there's any
        $user->load('role');

        $user->load(['bookings' => function($query) {
            $query->whereHas('room.room_status', function($q) {
                $q->where('room_status', 'Occupied');
            })
            ->with(['room.room_status'])
            ->latest('check_in_date')
            ->limit(1);
        }]);

        return response()->json(['user' => $user], 200);
    }

    // Logout
    public function logout(Request $request)
    {
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
