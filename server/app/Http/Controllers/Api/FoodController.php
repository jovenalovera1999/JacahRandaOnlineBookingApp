<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FoodCategory;
use App\Models\FoodStatus;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    public function loadFoodReferences() {
        $foodCategories = FoodCategory::all();
        $foodStatuses = FoodStatus::all();

        return response()->json([
            'foodCategories' => $foodCategories,
            'foodStatuses' => $foodStatuses
        ], 200);
    }
}
