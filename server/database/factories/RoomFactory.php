<?php

namespace Database\Factories;

use App\Models\RoomStatus;
use App\Models\RoomType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'room_no' => fake()->numberBetween(101, 510),
            'room_type_id' => RoomType::inRandomOrder()->first()->room_type_id,
            'capacity' => fake()->numberBetween(1, 12),
            'description' => fake()->text(30),
            'price' => fake()->randomElement([3500, 3000, 1500, 1000, 2000]),
            'room_status_id' => RoomStatus::inRandomOrder()->first()->room_status_id
        ];
    }
}
