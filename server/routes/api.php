<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\BookingStatusController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\FoodController;
use App\Http\Controllers\Api\GoogleAuthController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\RoomStatusController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

RateLimiter::for('api', function($request) {
    return Limit::perMinute(325)->by(optional($request->user())->id ?: $request->ip());
});

Route::middleware(['throttle:api'])->group(function () {
    Route::middleware('web')->group(function() {
        Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

        Route::controller(GoogleAuthController::class)->prefix('/auth/google')->group(function() {
            Route::get('/redirect', 'redirect');
            Route::get('/callback', 'callback');
        });

        Route::controller(AuthController::class)->prefix('/auth')->group(function() {
            Route::post('/login', 'login');
        });

        Route::middleware('auth:sanctum')->group(function() {
            Route::controller(GoogleAuthController::class)->prefix('/auth/google')->group(function () {
                Route::get('/me', 'me');
                Route::post('/logout', 'logout');
            });

            Route::controller(AuthController::class)->prefix('/auth')->group(function() {
                Route::get('/me', 'me');
                Route::post('/logout', 'logout');
            });
        });
    });

    Route::middleware('auth:sanctum')->group(function() {
        Route::controller(UserController::class)->prefix('/user')->group(function() {
            Route::get('/loadUserReferences', 'loadUserReferences');
            Route::get('/loadUsers', 'loadUsers');
            Route::post('/storeUser', 'storeUser');
            Route::put('/updateUser/{user}', 'updateUser');
            Route::delete('/destroyUser/{user}', 'destroyUser');
        });

        Route::controller(DashboardController::class)->prefix('/dashboard')->group(function() {
            Route::get('/countPendingApprovedCancelledCompleted', 'countPendingApprovedCancelledCompleted');
        });

        Route::controller(BookingController::class)->prefix('/booking')->group(function () {
            Route::get('/loadBookings', 'loadBookings');
            Route::get('/loadBookingsOfCurrentLoggedInUserClient', 'loadBookingsOfCurrentLoggedInUserClient');
            Route::get('/countUnreadNotificationsAndLoadCancelledBookings', 'countUnreadNotificationsAndLoadCancelledBookings');
            Route::get('/loadCancelledBookings', 'loadCancelledBookings');
            Route::post('/storeBooking', 'storeBooking');
            Route::post('/approveBooking/{booking}', 'approveBooking');
            Route::post('/cancelBookingInAdminOrEmployeeSide/{room}/{booking}', 'cancelBookingInAdminOrEmployeeSide');
            Route::delete('/cancelBooking/{room}/{booking}', 'cancelBooking');
            Route::delete('/cancelBookingInClientSide/{room}/{booking}', 'cancelBookingInClientSide');
        });

        Route::controller(NotificationController::class)->prefix('/notification')->group(function () {
            Route::get('/countUnreadNotifications', 'countUnreadNotifications');
            Route::get('/loadNotifications', 'loadNotifications');
            Route::put('/updateNotificationToSeen/{notification}', 'updateNotificationToSeen');
        });

        Route::controller(RoomController::class)->prefix('/room')->group(function () {
            Route::get('/loadRoomReferences', 'loadRoomReferences');
            Route::get('/loadRooms', 'loadRooms');
            Route::post('/storeRoom', 'storeRoom');
            Route::put('/updateRoom/{room}', 'updateRoom');
            Route::delete('/destroyRoom/{room}', 'destroyRoom');
        });

        Route::controller(RoomStatusController::class)->prefix('/room_status')->group(function() {
            Route::get('/loadRoomStatuses', 'loadRoomStatuses');
        });

        Route::controller(BookingStatusController::class)->prefix('/booking_status')->group(function() {
            Route::get('/loadBookingStatuses', 'loadBookingStatuses');
        });

        Route::controller(FoodController::class)->prefix('/food')->group(function() {
            Route::get('/loadFoodReferences', 'loadFoodReferences');
        });
    });

    Route::controller(RoomController::class)->prefix('/room')->group(function() {
        Route::get('/loadAvailableRooms', 'loadAvailableRooms');
    });
});

