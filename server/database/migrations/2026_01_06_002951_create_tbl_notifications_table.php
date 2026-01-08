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
        Schema::create('tbl_notifications', function (Blueprint $table) {
            $table->id('notification_id');
            $table->unsignedBigInteger('booking_id')->nullable();
            $table->unsignedBigInteger('order_id')->nullable();
            $table->text('description', 255);
            $table->timestamp('is_seen')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('booking_id')
                ->references('booking_id')
                ->on('tbl_bookings')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('order_id')
                ->references('order_id')
                ->on('tbl_orders')
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
        Schema::dropIfExists('tbl_notifications');
        Schema::enableForeignKeyConstraints();
    }
};
