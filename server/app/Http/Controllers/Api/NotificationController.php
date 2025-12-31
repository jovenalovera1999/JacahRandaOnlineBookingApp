<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    // Count the unread notifications and load cancelled bookings with reason for client
    public function countUnreadNotifications(Request $request)
    {
        $user = $request->user();

        $totalUnreadNotifications = Notification::with(['booking.user'])
            ->whereHas('booking.user', function ($query) use ($user) {
                $query->where('user_id', $user->user_id);
            })
            ->where('is_seen', null)
            ->count();

        return response()
            ->json([
                'totalUnreadNotifications' => $totalUnreadNotifications,
            ], 200);
    }

    public function loadNotifications(Request $request)
    {
        $user = $request->user();

        $notifications = Notification::with([
            'booking.room',
            'booking.booking_status',
            'booking.room.room_type',
            'booking.room.room_status',
        ])
            ->whereHas('booking', function ($query) use ($user) {
                $query->where('user_id', $user->user_id);
            })
            ->orderBy('notification_id', 'asc')
            ->get();

        return response()
            ->json([
                'notifications' => $notifications,
            ], 200);
    }

    public function updateNotificationToSeen(Notification $notification)
    {
        $notification->update([
            'is_seen' => now(),
        ]);

        return response()
            ->json([], 200);
    }
}
