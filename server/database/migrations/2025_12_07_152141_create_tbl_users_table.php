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
        Schema::create('tbl_users', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('google_id', 255)->nullable()->unique();
            $table->string('email', 255)->nullable()->unique();
            $table->string('username', 55)->nullable()->unique();
            $table->string('password', 255)->nullable();
            $table->unsignedBigInteger('role_id');
            $table->timestamp('last_login_at')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('role_id')
                ->references('role_id')
                ->on('tbl_roles')
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
        Schema::dropIfExists('tbl_users');
        Schema::enableForeignKeyConstraints();
    }
};
