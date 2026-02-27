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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nim')->unique()->nullable();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('role', ['admin', 'bendahara', 'ketua_divisi', 'anggota', 'prodi'])->default('anggota');
            $table->string('division')->nullable();
            $table->string('position')->nullable();
            $table->string('angkatan')->nullable();
            $table->string('phone')->nullable();
            $table->enum('status', ['aktif', 'non_aktif', 'alumni'])->default('aktif');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
