<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use App\Models\FoodCategory;
use App\Models\FoodStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

    public function loadFoods() {
        $foods = Food::with(['food_category', 'food_status'])
            ->orderBy('food_name', 'asc')
            ->orderBy('price', 'desc')
            ->get();

        return response()->json([
            'foods' => $foods
        ], 200);
    }

    public function storeFood(Request $request) {
        $validatedData = $request->validate([
            'food_image' => ['nullable', 'image', 'mimes:png,jpg,jpeg'],
            'food_name' => ['required', 'max:55'],
            'description' => ['nullable', 'max:255'],
            'price' => ['required', 'numeric'],
            'category' => ['required', 'exists:tbl_food_categories,food_category_id'],
            'status' => ['required', 'exists:tbl_food_statuses,food_status_id']
        ]);

        // Upload food image
        if($request->hasFile('food_image')) {
            $file = $request->file('food_image');
            $extension = $file->getClientOriginalExtension();
            $filenameToStore = uniqid() . '.' . $extension;
            $file->storeAs('img/food', $filenameToStore, 'public');
            $validatedData['food_image'] = $filenameToStore;
        }

        Food::create([
            'food_image' => $validatedData['food_image'],
            'food_name' => $validatedData['food_name'],
            'description' => $validatedData['description'],
            'price' => $validatedData['price'],
            'food_category_id' => $validatedData['category'],
            'food_status_id' => $validatedData['status']
        ]);

        return response()->json([
            'message' => 'Food Successfully Saved.'
        ], 200);
    }

    public function updateFood(Request $request, Food $food) {
        $validatedData = $request->validate([
            'food_image' => ['nullable', 'image', 'mimes:png,jpg,jpeg'],
            'food_name' => ['required', 'max:55'],
            'description' => ['nullable', 'max:255'],
            'price' => ['required', 'numeric'],
            'category' => ['required', 'exists:tbl_food_categories,food_category_id'],
            'status' => ['required', 'exists:tbl_food_statuses,food_status_id']
        ]);

        // Check food image if exists, removed or uploaded a new one
        if($request->has('food_image_removed') && $request->food_image_removed === '1') {
            if($food->food_image && Storage::disk('public')->exists('img/food/' . $food->food_image)) {
                Storage::disk('public')->delete('img/food/' . $food->food_image);
            }

            $food->food_image = null;
        } else if($request->hasFile('food_image')){
            if($food->food_image && Storage::disk('public')->exists('img/food/' . $food->food_image)) {
                Storage::disk('public')->delete('img/food/' . $food->food_image);
            }

            $file = $request->file('food_image');
            $extension = $file->getClientOriginalExtension();
            $filenameToStore = uniqid() . '.' . $extension;
            $file->storeAs('img/food', $filenameToStore, 'public');
            $validatedData['food_image'] = $filenameToStore;
        }

        $food->update([
            'food_image' => $validatedData['food_image'] ?? $food->food_image,
            'food_name' => $validatedData['food_name'],
            'description' => $validatedData['description'],
            'price' => $validatedData['price'],
            'food_category_id' => $validatedData['category'],
            'food_status_id' => $validatedData['status']
        ]);

        return response()->json([
            'message' => 'Food Successfully Updated.'
        ], 200);
    }
}
