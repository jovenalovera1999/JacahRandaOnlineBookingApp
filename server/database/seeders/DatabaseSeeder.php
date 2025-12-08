<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\RoomStatus;
use App\Models\RoomType;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Role::factory()->createMany([

            ['role' => 'Admin'],
            ['role' => 'Employee']
        ]);

        RoomStatus::factory()->createMany([
            ['room_status' => 'Available'],
            ['room_status' => 'Unavailable'],
            ['room_status' => 'Maintenance'],
            ['room_status' => 'Booked'],
        ]);

        RoomType::factory()->createMany([
            [
                'room_type' => 'Standard',
                'price' => 3000.00
            ],
            [
                'room_type' => 'Barkada',
                'price' => 2000.00
            ],
            [
                'room_type' => 'Deluxe With Veronica',
                'price' => 3500.00
            ],
            [
                'room_type' => 'Pyramid',
                'price' => 1000.00
            ],
            [
                'room_type' => 'Pyramid with Terrace',
                'price' => 1500.00
            ]
        ]);
    }
}
