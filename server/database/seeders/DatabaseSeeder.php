<?php

namespace Database\Seeders;

use App\Models\BookingStatus;
use App\Models\Role;
use App\Models\Room;
use App\Models\RoomStatus;
use App\Models\RoomType;
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
            ['role' => 'Employee'],
            ['role' => 'Client'],
        ]);

        RoomStatus::factory()->createMany([
            ['room_status' => 'Available'],
            ['room_status' => 'Unavailable'],
            ['room_status' => 'Maintenance'],
            ['room_status' => 'Booked'],
            ['room_status' => 'In Use'],
        ]);

        RoomType::factory()->createMany([
            ['room_type' => 'Standard'],
            ['room_type' => 'Barkada'],
            ['room_type' => 'Deluxe With Veronica'],
            ['room_type' => 'Pyramid'],
            ['room_type' => 'Pyramid with Terrace'],
        ]);

        Room::factory(15)->create();

        BookingStatus::factory()->createMany([
            ['booking_status' => 'Approved'],
            ['booking_status' => 'Pending'],
            ['booking_status' => 'Cancelled'],
            ['booking_status' => 'Completed'],
        ]);
    }
}
