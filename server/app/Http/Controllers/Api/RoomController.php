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
            'room_no' => ['required', 'numeric'],
            'room_type' => ['required'],
            'description' => ['nullable', 'max:255'],
            'price' => ['required', 'numeric'],
            'room_status' => ['required']
        ]);

        // Uploading image
        if ($request->has('room_image')) {
            $file = $request->file('room_image');
            $extension = $file->getClientOriginalExtension();
            $fileNameToStore = uniqid() . '.' . $extension;
            $file->storeAs('img/room', $fileNameToStore, 'public');
            $validatedData['room_image'] = $fileNameToStore;
        }

        // Insert room to tbl_rooms in database
        Room::create([
            'room_image' => $validatedData['room_image'],
            'room_no' => $validatedData['room_no'],
            'room_type_id' => $validatedData['room_type'],
            'description' => $validatedData['description'],
            'price' => $validatedData['price'],
            'room_status_id' => $validatedData['room_status']
        ]);

        // Return message to client
        return response()->json([
            'message' => 'Room Successfully Created.'
        ], 200);
    }
}
