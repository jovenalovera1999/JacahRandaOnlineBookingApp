<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BookingStatus;
use Illuminate\Http\Request;

class BookingStatusController extends Controller
{
    public function loadBookingStatuses() {
        $bookingStatuses = BookingStatus::all();
        return response()->json(['bookingStatuses' => $bookingStatuses], 200);
    }
}
