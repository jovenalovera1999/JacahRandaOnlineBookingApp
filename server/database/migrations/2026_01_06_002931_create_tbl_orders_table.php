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
            $table->unsignedBigInteger('food_id');
            $table->integer('quantity')->default(0);
            $table->text('additional_information')->nullable();
            $table->double('sub_total')->default(0);
            $table->unsignedBigInteger('order_status_id');
            $table->timestamps();

            $table->foreign('booking_id')
                ->references('booking_id')
                ->on('tbl_bookings')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('food_id')
                ->references('food_id')
                ->on('tbl_foods')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('order_status_id')
                ->references('order_status_id')
                ->on('tbl_order_statuses')
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
        Schema::dropIfExists('tbl_orders');
        Schema::enableForeignKeyConstraints();
    }
};
