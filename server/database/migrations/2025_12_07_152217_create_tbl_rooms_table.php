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
        Schema::create('tbl_rooms', function (Blueprint $table) {
            $table->id('room_id');
            $table->string('room_image', 255)->nullable();
            $table->string('title', 55)->nullable();
            $table->string('description', 255)->nullable();
            $table->unsignedBigInteger('room_type_id');
            $table->double('price');
            $table->unsignedBigInteger('room_status_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('room_type_id')
                ->references('room_type_id')
                ->on('tbl_room_types')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('room_status_id')
                ->references('room_status_id')
                ->on('tbl_room_statuses')
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
        Schema::dropIfExists('tbl_rooms');
        Schema::enableForeignKeyConstraints();
    }
};
