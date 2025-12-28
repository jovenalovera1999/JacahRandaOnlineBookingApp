<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\BookingStatus;
use App\Models\Notification;
use App\Models\Room;
use App\Models\RoomStatus;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Tymon\JWTAuth\Facades\JWTAuth;

class BookingController extends Controller
{

    // Get the token of client or customer from cookie
    protected function tokenFromCookie()
    {
        $token = request()->cookie('access_token');

        if (!$token) {
            throw new UnauthorizedHttpException('', 'Token not provided');
        }

        return $token;
    }

    // Authenticated client or customer
    protected function authenticatedUser()
    {
        return JWTAuth::setToken($this->tokenFromCookie())
            ->authenticate();
    }

    // Load pending bookings in client or customer side
    public function loadPendingBookingsOfCurrentClientUserLoggedIn()
    {
        $user = $this->authenticatedUser();

        $bookings = Booking::with(['user', 'room.room_type', 'booking_status'])
            ->where('user_id', $user->user_id)
            ->whereHas('booking_status', function ($query) {
                $query->where('booking_status', 'Pending');
            })
            ->get();

        return response()
            ->json([
                'bookings' => $bookings
            ], 200);
    }

    // Load pending bookings in admin or employee side
    public function loadPendingBookings()
    {
        $bookings = Booking::with(['user', 'room.room_type', 'booking_status'])
            ->whereHas('booking_status', function ($query) {
                $query->where('booking_status', 'Pending');
            })
            ->get();

        return response()
            ->json([
                'bookings' => $bookings
            ], 200);
    }

    // Count the unread notifications and load cancelled bookings with reason for client
    public function countUnreadNotificationsAndLoadCancelledBookings()
    {
        $user = $this->authenticatedUser();

        $totalUnseenNotification = Notification::with(['booking.user'])
            ->whereHas('booking.user', function ($query) use ($user) {
                $query->where('user_id', $user->user_id);
            })
            ->where('is_seen', null)
            ->count();

        return response()
            ->json([
                'totalUnseenNotification' => $totalUnseenNotification,
            ], 200);
    }

    public function loadCancelledBookings()
    {
        $user = $this->authenticatedUser();

        $cancelledBookings = Notification::with(['booking.room', 'booking.booking_status', 'booking.room.room_type', 'booking.room.room_status'])
            ->whereHas('booking', function ($query) use ($user) {
                $query->where('user_id', $user->user_id);
            })
            ->where('is_seen', null)
            ->get();

        return response()
            ->json([
                'cancelledBookings' => $cancelledBookings
            ], 200);
    }

    // Stores booking in client side
    public function storeBooking(Request $request)
    {
        $validatedData = $request->validate([
            'room_id' => ['exists:tbl_rooms,room_id'],
            'check_in_date' => ['required', 'date'],
            'check_out_date' => ['required', 'date', 'after:check_in_date'],
            'additional_information' => ['nullable', 'max:255'],
        ]);

        $user = $this->authenticatedUser();

        $bookingStatus = BookingStatus::where('booking_status', 'Pending')
            ->firstOrFail();

        Booking::create([
            'user_id' => $user->user_id,
            'room_id' => $validatedData['room_id'],
            'check_in_date' => $validatedData['check_in_date'],
            'check_out_date' => $validatedData['check_out_date'],
            'additional_information' => $validatedData['additional_information'],
            'booking_status_id' => $bookingStatus->booking_status_id,
        ]);

        $roomStatus = RoomStatus::where('room_status', 'Booked')
            ->firstOrFail();

        Room::where('room_id', $validatedData['room_id'])
            ->update([
                'room_status_id' => $roomStatus->room_status_id,
            ]);

        return response()
            ->json([
                'message' => 'Booking Success.',
            ], 200);
    }

    // Canel booking by soft delete and updates room back to available status in admin or employee side
    public function cancelBookingInAdminOrEmployeeSide(Request $request, Room $room, Booking $booking)
    {
        // Data validation
        $validatedData = $request->validate([
            'reason' => ['required', 'max:255'],
        ]);

        // Soft deletes the booking
        $booking->delete();

        $bookingStatus = BookingStatus::where('booking_status', 'Cancelled')
            ->firstOrFail();

        // Update booking status to cancelled
        $booking->update([
            'booking_status_id' => $bookingStatus->booking_status_id,
        ]);

        $roomStatus = RoomStatus::where('room_status', 'Available')
            ->firstOrFail();

        // Update the room to available
        $room->update([
            'room_status_id' => $roomStatus->room_status_id,
        ]);

        Notification::create([
            'booking_id' => $booking->booking_id,
            'reason' => $validatedData['reason'],
        ]);

        return response()
            ->json([
                'message' => 'Booking Successfully Cancelled.'
            ], 200);
    }

    public function approveBooking(Room $room, Booking $booking)
    {
        $roomStatus = RoomStatus::where('room_status', 'Occupied')
            ->firstOrFail();

        $room->update([
            'room_status_id' => $roomStatus->room_status_id,
        ]);

        $bookingStatus = BookingStatus::where('booking_status', 'Approved')
            ->firstOrFail();

        $booking->update([
            'booking_status_id' => $bookingStatus->booking_status_id,
        ]);

        return response()->json([
            'message' => 'Booking Successfully Approved.'
        ], 200);
    }

    // Canel booking by soft delete and updates room back to available status in client side
    public function cancelBookingInClientSide(Room $room, Booking $booking)
    {
        // Soft deletes the booking
        $booking->delete();

        $bookingStatus = BookingStatus::where('booking_status', 'Cancelled')
            ->firstOrFail();

        // Update booking status to cancelled
        $booking->update([
            'booking_status_id' => $bookingStatus->booking_status_id,
        ]);

        $roomStatus = RoomStatus::where('room_status', 'Available')
            ->firstOrFail();

        // Update the room to available
        $room->update([
            'room_status_id' => $roomStatus->room_status_id,
        ]);

        return response()
            ->json([
                'message' => 'Booking Successfully Cancelled.'
            ], 200);
    }
}
