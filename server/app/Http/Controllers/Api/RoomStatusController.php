<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RoomStatus;
use Illuminate\Http\Request;

class RoomStatusController extends Controller
{
    public function loadRoomStatuses() {
        $roomStatuses = RoomStatus::all();
        return response()->json(['roomStatuses' => $roomStatuses], 200);
    }
}
