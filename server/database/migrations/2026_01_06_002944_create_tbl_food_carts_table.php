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
        Schema::create('tbl_food_carts', function (Blueprint $table) {
            $table->id('food_cart_id');
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('food_id');
            $table->integer('quantity');
            $table->double('price');
            $table->double('subtotal');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('order_id')
                ->references('order_id')
                ->on('tbl_orders')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('food_id')
                ->references('food_id')
                ->on('tbl_foods')
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
        Schema::dropIfExists('tbl_food_carts');
        Schema::enableForeignKeyConstraints();
    }
};
