<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RoomType;

class RoomTypeController extends Controller
{
    public function loadRoomTypes()
    {
        $roomTypes = RoomType::all();

        return response()->json([
            'roomTypes' => $roomTypes
        ], 200);
    }
}
