<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\GoogleAuthController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Middleware\CorsMiddleware;
use Illuminate\Support\Facades\Route;

Route::controller(GoogleAuthController::class)
    ->prefix('/auth/google')
    ->group(function () {
        Route::get('/redirect', 'redirect');
        Route::get('/callback', 'callback');
    });

Route::middleware([CorsMiddleware::class])
    ->group(function () {
        Route::controller(AuthController::class)
            ->prefix('/auth')
            ->group(function () {
                Route::get('/me', 'me');
                Route::post('/refresh', 'refresh');
                Route::post('/logout', 'logout');
            });

        Route::controller(RoomController::class)
            ->prefix('/room')
            ->group(function () {
                Route::get('/loadAvailableRooms', 'loadAvailableRooms');
                Route::get('/loadRoomReferences', 'loadRoomReferences');
                Route::get('/loadRooms', 'loadRooms');
                Route::post('/storeRoom', 'storeRoom');
                Route::put('/updateRoom/{room}', 'updateRoom');
                Route::delete('/destroyRoom/{room}', 'destroyRoom');
            });

        Route::controller(BookingController::class)
            ->prefix('/booking')
            ->group(function () {
                Route::get('/loadPendingBookingsOfCurrentClientUserLoggedIn', 'loadPendingBookingsOfCurrentClientUserLoggedIn');
                Route::get('/loadPendingBookings', 'loadPendingBookings');
                Route::post('/storeBooking', 'storeBooking');
                Route::delete('/cancelBooking/{room}/{booking}', 'cancelBooking');
            });
    });

Route::controller(BookingController::class)
    ->prefix('/booking')
    ->group(function () {
        Route::get('/loadPendingBookings', 'loadPendingBookings');
        Route::put('/approveBooking/{room}/{booking}', 'approveBooking');
        Route::delete('/cancelBooking/{room}/{booking}', 'cancelBooking');
    });
