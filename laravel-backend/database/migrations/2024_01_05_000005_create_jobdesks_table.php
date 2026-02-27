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
        Schema::create('jobdesks', function (Blueprint $table) {
            $table->id();
            $table->string('division');
            $table->string('title');
            $table->text('description');
            $table->enum('status', ['belum_dikerjakan', 'dalam_proses', 'selesai'])->default('belum_dikerjakan');
            $table->date('due_date');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });

        // Pivot table for assigned users
        Schema::create('jobdesk_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jobdesk_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobdesk_user');
        Schema::dropIfExists('jobdesks');
    }
};
