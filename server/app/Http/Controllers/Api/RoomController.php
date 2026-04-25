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
    // Load avaiable rooms

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

    // Load room references

    public function loadRoomReferences()
    {
        $roomTypes = RoomType::all();
        $roomStatuses = RoomStatus::all();

        return response()->json([
            'roomTypes' => $roomTypes,
            'roomStatuses' => $roomStatuses
        ], 200);
    }

    // Load rooms with or without search

    public function loadRooms(Request $request)
    {
        $search = $request->input('search');

        $rooms = Room::with(['room_type', 'room_status'])
            ->orderBy('room_no', 'asc')
            ->orderBy('price', 'desc');

        if (!empty($search)) {
            $rooms->where('room_no', 'LIKE', "%{$search}%")
                ->orWhere('description', 'LIKE', "%{$search}%")

                ->orWhereHas('room_type', function ($room) use ($search) {
                    $room->where('room_type', 'LIKE', "%{$search}%");
                })

                ->orWhereHas('room_status', function ($room) use ($search) {
                    $room->where('room_status', 'LIKE', "%{$search}%");
                });
        }

        $rooms = $rooms->get();

        $rooms->transform(function ($room) {
            $room->room_image = $room->room_image ? url('storage/img/room/' . $room->room_image) : null;
            return $room;
        });

        return response()->json([
            'rooms' => $rooms
        ], 200);
    }

    // Save room to database

    public function storeRoom(Request $request)
    {
        // Validate data
        $validatedData = $request->validate([
            'room_image' => ['nullable', 'image', 'mimes:png,jpg,jpeg'],
            'room_no' => ['required', 'numeric'],
            'room_type' => ['required'],
            'capacity' => ['required'],
            'description' => ['nullable', 'max:255'],
            'price' => ['required', 'numeric'],
            'room_status' => ['required']
        ]);

        // Image save

        if ($request->hasFile('room_image')) {
            $file = $request->file('room_image');
            $extension = $file->getClientOriginalExtension();
            $fileNameToStore = uniqid() . '.' . $extension;
            $file->storeAs('img/room', $fileNameToStore, 'public');
            $validatedData['room_image'] = $fileNameToStore;
        }

        Room::create([
            'room_image' => $validatedData['room_image'],
            'room_no' => $validatedData['room_no'],
            'room_type_id' => $validatedData['room_type'],
            'capacity' => $validatedData['capacity'],
            'description' => $validatedData['description'],
            'price' => $validatedData['price'],
            'room_status_id' => $validatedData['room_status']
        ]);

        return response()->json([
            'message' => 'Room Successfully Created.'
        ], 200);
    }

    // Update the selected room

    public function updateRoom(Request $request, Room $room)
    {
        $validatedData = $request->validate([
            'room_image' => ['nullable', 'image', 'mimes:png,jpg,jpeg'],
            'room_no' => ['required', 'numeric'],
            'room_type' => ['required'],
            'capacity' => ['required'],
            'description' => ['nullable', 'max:255'],
            'price' => ['required', 'numeric'],
            'room_status' => ['required']
        ]);

        // Checks room image if exists, removed or uploaded a new one

        if ($request->has('room_image_removed') && $request->room_image_removed === '1') {
            if ($room->room_image && Storage::disk('public')->exists('img/room/' . $room->room_image)) {
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

        $room->update([
            'room_image' => $validatedData['room_image'] ?? $room->room_image,
            'room_no' => $validatedData['room_no'],
            'room_type_id' => $validatedData['room_type'],
            'capacity' => $validatedData['capacity'],
            'description' => $validatedData['description'],
            'price' => $validatedData['price'],
            'room_status_id' => $validatedData['room_status']
        ]);

        return response()->json([
            'message' => 'Room Successfully Updated.'
        ], 200);
    }

    // Delete room from database

    public function destroyRoom(Room $room)
    {
        $room->delete();

        return response()->json([
            'message' => 'Room Successfully Deleted.'
        ], 200);
    }
}
