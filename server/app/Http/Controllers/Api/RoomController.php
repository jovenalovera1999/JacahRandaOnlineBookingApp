<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RoomStatus;
use App\Models\RoomType;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    // Load room references such as room type and room status in add and edit room
    public function loadRoomReferences()
    {
        $roomTypes = RoomType::all();
        $roomStatuses = RoomStatus::all();

        return response()->json([
            'roomTypes' => $roomTypes,
            'roomStatuses' => $roomStatuses
        ], 200);
    }
}
