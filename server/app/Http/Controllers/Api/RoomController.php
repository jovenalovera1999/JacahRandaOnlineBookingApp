<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\RoomStatus;
use App\Models\RoomType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RoomController extends Controller
{
    // Load avaiable rooms for client to book
    public function loadAvailableRooms()
    {
        $rooms = Room::with(['room_type', 'room_status'])
            ->whereHas('room_status', function ($query) {
                $query->where('room_status', 'Available');
            })
            ->orderBy('price', 'desc')
            ->get();

        $rooms->transform(function ($room) {
            $room->room_image = $room->room_image ? url("storage/img/room/{$room->room_image}") : null;
            return $room;
        });

        return response()->json([
            'rooms' => $rooms
        ], 200);
    }

    // Load room references such as room type and room status in add and edit modal room from tbl_room_types and tbl_room_statuses
    public function loadRoomReferences()
    {
        $roomTypes = RoomType::all();
        $roomStatuses = RoomStatus::all();

        return response()->json([
            'roomTypes' => $roomTypes,
            'roomStatuses' => $roomStatuses
        ], 200);
    }

    // Load rooms from tbl_rooms
    public function loadRooms(Request $request)
    {
        $search = $request->input('search');

        $rooms = Room::with(['room_type', 'room_status'])
            ->orderBy('price', 'desc');

        if (!empty($search)) {
            $rooms->where(function ($query) use ($search) {
                $query->where('room_no', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%")

                    ->orWhereHas('room_type', function ($q) use ($search) {
                        $q->where('room_type', 'LIKE', "%{$search}%");
                    })

                    ->orWhereHas('room_status', function ($q) use ($search) {
                        $q->where('room_status', 'LIKE', "%{$search}%");
                    });
            });
        }

        $rooms = $rooms->get();

        $rooms->transform(function ($room) {
            $room->room_image = $room->room_image ? url("storage/img/room/{$room->room_image}") : null;
            return $room;
        });

        return response()->json([
            'rooms' => $rooms
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
        if ($request->hasFile('room_image')) {
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

    // Update the selected room at tbl_rooms in database
    public function updateRoom(Request $request, Room $room)
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

        // Checks room image if exists, removed or uploaded a new one
        if ($request->has('room_image_removed') && $request->room_image_removed === '1') {
            if ($room->room_image && Storage::disk('public')->exists('img/room/' . $room->rom_image)) {
                Storage::disk('public')->delete('img/room/' . $room->room_image);
            }

            $room->room_image = null;
        } else if ($request->hasFile('room_image')) {
            if ($room->room_image && Storage::disk('public')->exists('img/room/' . $room->room_image)) {
                Storage::disk('public')->delete('img/room/' . $room->room_image);
            }

            $file = $request->file('room_image');
            $extension = $file->getClientOriginalExtension();
            $fileNameToStore = uniqid() . '.' . $extension;
            $file->storeAs('img/room', $fileNameToStore, 'public');
            $validatedData['room_image'] = $fileNameToStore;
        }

        // Update room in tbl_rooms in database
        $room->update([
            'room_image' => $validatedData['room_image'] ?? $room->room_image,
            'room_no' => $validatedData['room_no'],
            'room_type_id' => $validatedData['room_type'],
            'description' => $validatedData['description'],
            'price' => $validatedData['price'],
            'room_status_id' => $validatedData['room_status']
        ]);

        // Return message to client
        return response()->json([
            'message' => 'Room Successfully Updated.'
        ], 200);
    }

    public function destroyRoom(Room $room)
    {
        $room->delete();

        return response()->json([
            'message' => 'Room Successfully Deleted.'
        ], 200);
    }
}
