<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FoodCart;
use Illuminate\Http\Request;

class FoodCartController extends Controller
{
    public function loadFoodCarts(Request $request) {
        $orderId = $request->input('order_id');

        $foodCarts = FoodCart::with(['order', 'food'])
            ->where('order_id', $orderId)
            ->get();

        return response()->json([
            'foodCarts' => $foodCarts
        ], 200);
    }
}
