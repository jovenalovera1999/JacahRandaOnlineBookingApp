<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Room;
use App\Models\RoomStatus;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Tymon\JWTAuth\Facades\JWTAuth;

class BookingController extends Controller
{
    protected function tokenFromCookie()
    {
        $token = request()->cookie('access_token');

        if (!$token) {
            throw new UnauthorizedHttpException('', 'Token not provided');
        }

        return $token;
    }

    protected function authenticatedUser()
    {
        return JWTAuth::setToken($this->tokenFromCookie())
            ->authenticate();
    }

    public function storeBooking(Request $request)
    {
        $validatedData = $request->validate([
            'room_id' => ['exists:tbl_rooms,room_id'],
            'check_in_date' => ['required', 'date'],
            'check_out_date' => ['required', 'date', 'after:check_in_date'],
            'additional_information' => ['nullable', 'max:255'],
        ]);

        $user = $this->authenticatedUser();

        Booking::create([
            'user_id' => $user->user_id,
            'room_id' => $validatedData['room_id'],
            'check_in_date' => $validatedData['check_in_date'],
            'check_out_date' => $validatedData['check_out_date'],
            'additional_information' => $validatedData['additional_information'],
        ]);

        $roomStatus = RoomStatus::where('room_status', 'Occupied')
            ->first();

        Room::where('room_id', $validatedData['room_id'])
            ->update([
                'room_status_id' => $roomStatus->room_status_id,
            ]);

        return response()
            ->json([
                'message' => 'Booking Success.'
            ], 200);
    }
}
