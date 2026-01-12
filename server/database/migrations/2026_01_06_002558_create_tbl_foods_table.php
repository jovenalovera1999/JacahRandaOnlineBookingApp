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
        Schema::create('tbl_foods', function (Blueprint $table) {
            $table->id('food_id');
            $table->string('food_image', 255)->nullable();
            $table->string('food_name', 55);
            $table->text('description', 255)->nullable();
            $table->double('price')->default(0);
            $table->unsignedBigInteger('food_category_id');
            $table->unsignedBigInteger('food_status_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('food_category_id')
                ->references('food_category_id')
                ->on('tbl_food_categories')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('food_status_id')
                ->references('food_status_id')
                ->on('tbl_food_statuses')
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
        Schema::dropIfExists('tbl_foods');
        Schema::enableForeignKeyConstraints();
    }
};
