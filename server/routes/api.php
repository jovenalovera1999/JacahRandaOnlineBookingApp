<?php

use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\RoomTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::controller(RoomController::class)->prefix('/room')->group(function () {
    Route::get('/loadRoomReferences', 'loadRoomReferences');
});

// Route::controller(RoomTypeController::class)->prefix('/room_type')->group(function () {
//     Route::get('/loadRoomTypes', 'loadRoomTypes');
// });
