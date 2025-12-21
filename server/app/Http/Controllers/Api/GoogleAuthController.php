<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;

use function Symfony\Component\Clock\now;

class GoogleAuthController extends Controller
{
    public function redirect(Request $request)
    {
        $redirectTo = $request->query('redirect_to', config('app.frontend_url'));

        return Socialite::driver('google')
            ->stateless()
            ->with(['state' => $redirectTo])
            ->redirect();
    }

    public function callback(Request $request)
    {
        $googleUser = Socialite::driver('google')
            ->stateless()
            ->user();

        $user = User::updateOrCreate(
            ['google_id' => $googleUser->id],
            [
                'email' => $googleUser->email,
                'username' => explode('@', $googleUser->email)[0],
                'role_id' => 3,
                'last_login_at' => now()
            ]
        );

        $token = JWTAuth::fromUser($user);

        // Get the redirect URL from Google 'state', fallback to homepage
        $redirectTo = $request->query('state', '/');

        // Redirect BACK to Next.js with token
        return redirect()->away(
            config('app.frontend_url') . $redirectTo . (str_contains($redirectTo, '?') ? '&' : '?') . "token={$token}"
        )->withCookie('access_token', $token, 60, '/', null, false, true);
    }
}
