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
        Schema::create('tbl_orders', function (Blueprint $table) {
            $table->id('order_id');
            $table->unsignedBigInteger('booking_id');
            $table->unsignedBigInteger('order_status_id');
            $table->text('additional_information', 500);
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('booking_id')
                ->references('booking_id')
                ->on('tbl_bookings')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('order_status_id')
                ->references('order_status_id')
                ->on('tbl_order_statuses')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('tbl_orders');
        Schema::enableForeignKeyConstraints();
    }
};
