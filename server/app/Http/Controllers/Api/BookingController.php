<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\BookingStatus;
use App\Models\Notification;
use App\Models\Room;
use App\Models\RoomStatus;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    // Load bookings in my bookings
    public function loadBookingsOfCurrentLoggedInUserClient(Request $request)
    {
        $user = $request->user();

        $bookings = Booking::with(['user', 'room.room_type', 'booking_status'])
            ->where('user_id', $user->user_id)
            ->orderBy('booking_id', 'desc')
            ->get();

        return response()->json([
            'bookings' => $bookings
        ], 200);
    }

    // Load bookings in booked management
    public function loadBookings(Request $request)
    {
        $filter = $request->input('filter');

        $bookings = Booking::with(['user', 'room.room_type', 'booking_status'])
            ->orderBy('booking_id', 'desc');

        if(!empty($filter)) {
            $bookings->whereHas('booking_status', function($booking) use ($filter) {
                $booking->where('booking_status', $filter);
            });
        }

        $bookings = $bookings->get();

        return response()->json([
            'bookings' => $bookings
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

        $user = $request->user();

        // Check if there is an APPROVED booking that overlaps
        $conflictExists = Booking::with('booking_status')
            ->where('room_id', $validatedData['room_id'])
            ->whereHas('booking_status', function ($query) {
                $query->where('booking_status', 'Pending')
                    ->orWhere('booking_status', 'Approved');
            })
            ->where('check_in_date', '<=', $validatedData['check_out_date'])
            ->where('check_out_date', '>=', $validatedData['check_in_date'])
            ->exists();

        if($conflictExists) {
            return response()->json([
                'message' => 'This room is not available for the selected dates.'
            ], 422);
        }

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

        return response()
            ->json([
                'message' => 'Booking Success.',
            ], 200);
    }

    public function approveBooking(Booking $booking)
    {
        $bookingStatus = BookingStatus::where('booking_status', 'Approved')
            ->firstOrFail();

        $booking->update([
            'booking_status_id' => $bookingStatus->booking_status_id,
        ]);

        Notification::create([
            'booking_id' => $booking->booking_id,
            'description' => 'The room you booked has been approved.',
        ], 200);

        return response()->json([
            'message' => 'Booking Successfully Approved.'
        ], 200);
    }

    // Canel booking by soft delete and updates room back to available status in admin or employee side
    public function cancelBookingInAdminOrEmployeeSide(Request $request, Room $room, Booking $booking)
    {
        // Data validation
        $validatedData = $request->validate([
            'description' => ['required', 'max:255'],
        ]);

        $bookingStatus = BookingStatus::where('booking_status', 'Cancelled')
            ->firstOrFail();

        // Update booking status to cancelled
        $booking->update([
            'booking_status_id' => $bookingStatus->booking_status_id,
        ]);

        Notification::create([
            'booking_id' => $booking->booking_id,
            'description' => "The room you booked has been called: {$validatedData['description']}",
        ]);

        return response()
            ->json([
                'message' => 'Booking Successfully Cancelled.'
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
