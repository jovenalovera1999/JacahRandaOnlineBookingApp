<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BookingStatus;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function countPendingApprovedCancelledCompleted() {
        $countByBookingStatuses = BookingStatus::withCount('bookings')
            ->get();

        return response()->json([
            'countByBookingStatuses' => $countByBookingStatuses,
        ], 200);
    }
}
