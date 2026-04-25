<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BookingStatus;
use App\Models\Room;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function loadDashboard() {
        $countByBookingStatuses = BookingStatus::withCount('bookings')
            ->get();

        $rooms = Room::with(['room_type', 'room_status'])
            ->withCount(['bookings as bookings_count' => function ($query) {
                $query->whereHas('booking_status', function ($q) {
                    $q->whereIn('booking_status', ['Pending', 'Approved']);
                });
            }])
            ->orderByDesc('bookings_count')
            ->take(5)
            ->get();

        $rooms->transform(function ($room) {
            $room->room_image = $room->room_image ? url("storage/img/room/{$room->room_image}") : null;
            return $room;
        });

        return response()->json([
            'countByBookingStatuses' => $countByBookingStatuses,
            'rooms' => $rooms,
        ], 200);
    }
}
