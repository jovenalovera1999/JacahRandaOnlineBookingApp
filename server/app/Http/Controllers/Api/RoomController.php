<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
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

    // Store to tbl_rooms in database
    public function storeRoom(Request $request)
    {
        // Validate data
        $validatedData = $request->validate([
            'room_image' => ['nullable', 'image', 'mimes:png,jpg,jpeg'],
            'title' => ['required', 'max:55'],
            'description' => ['nullable', '255'],
            'room_type' => ['required'],
            'price' => ['required', 'numeric'],
            'room_status' => ['required']
        ]);

        if ($request->has('room_image')) {
        }

        Room::create([
            ''
        ]);
    }
}
