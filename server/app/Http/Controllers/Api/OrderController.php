<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FoodCart;
use App\Models\Notification;
use App\Models\Order;
use App\Models\OrderStatus;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function loadOrders() {
        // $user = $request->user();

        $orders = Order::with(['food_carts', 'booking.room', 'booking.user', 'order_status'])
            ->get();

        return response()->json([
            'orders' => $orders
        ], 200);
    }

    public function getOrder(Order $order) {
        $order = Order::with(['food_carts', 'booking.room', 'booking.user', 'order_status'])
            ->where('order_id', $order->order_id)
            ->firstOrFail();

        return response()->json([
            'order' => $order
        ], 200);
    }

    public function storeOrder(Request $request) {
        $validated = $request->validate([
            'additional_information' => ['nullable', 'max:500'],
            'items' => ['array', 'min:1'],
            'items.*.food_id' => ['required', 'exists:tbl_foods,food_id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'items.*.price' => ['required', 'numeric', 'min:0']
        ]);

        $user = $request->user();

        $booking = $user->bookings()
            ->whereHas('booking_status', function($query) {
                $query->where('booking_status', 'Checked In');
            })
            ->latest()
            ->first();

        $orderStatus = OrderStatus::where('order_status', 'Pending')
            ->firstOrFail();

        $order = Order::create([
            'booking_id' => $booking->booking_id,
            'order_status_id' => $orderStatus->order_status_id,
            'additional_information' => $validated['additional_information'] ?? null
        ]);

        foreach($validated['items'] as $item) {
            FoodCart::create([
                'order_id' => $order->order_id,
                'food_id' => $item['food_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'subtotal' => $item['quantity'] * $item['price']
            ]);
        }

        Notification::create([
            'order_id' => $order->order_id,
            'description' => 'Your order has been successfully placed.'
        ]);

        return response()->json([
            'message' => 'Your order has been successfully placed.'
        ], 200);
    }

    public function updateOrderToPreparing(Order $order) {
        $orderStatus = OrderStatus::where('order_status', 'Preparing')
            ->firstOrFail();

        $order->update([
            'order_status_id' => $orderStatus->order_status_id
        ]);

        Notification::create([
            'order_id' => $order->order_id,
            'description' => 'Your order is being preparing.'
        ]);

        return response()->json([
            'message' => 'Order successfully set to preparing.'
        ], 200);
    }

    public function updateOrderToServing(Order $order) {
        $orderStatus = OrderStatus::where('order_status', 'Serving')
            ->firstOrFail();

        $order->update([
            'order_status_id' => $orderStatus->order_status_id
        ]);

        Notification::create([
            'order_id' => $order->order_id,
            'description' => 'Your order is now serving.'
        ]);

        return response()->json([
            'message' => 'Order successfully set to serving.'
        ], 200);
    }

    public function updateOrderToServed(Order $order) {
        $orderStatus = OrderStatus::where('order_status', 'Served')
            ->firstOrFail();

        $order->update([
            'order_status_id' => $orderStatus->order_status_id
        ]);

        Notification::create([
            'order_id' => $order->order_id,
            'description' => 'Your order has beed served.'
        ]);

        return response()->json([
            'message' => 'Order successfully set to served.'
        ], 200);
    }
}
