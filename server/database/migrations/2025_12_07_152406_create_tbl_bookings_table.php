<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_bookings', function (Blueprint $table) {
            $table->id('booking_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('room_id');
            $table->date('check_in_date');
            $table->date('check_out_date');
            $table->text('additional_information', 255);
            $table->unsignedBigInteger('booking_status_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('user_id')
                ->references('user_id')
                ->on('tbl_users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('room_id')
                ->references('room_id')
                ->on('tbl_rooms')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('booking_status_id')
                ->references('booking_status_id')
                ->on('tbl_booking_statuses')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('tbl_bookings');
        Schema::enableForeignKeyConstraints();
    }
};
