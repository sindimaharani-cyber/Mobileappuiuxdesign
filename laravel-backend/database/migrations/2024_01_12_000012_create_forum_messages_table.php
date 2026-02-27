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
        Schema::create('forum_channels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['all', 'division']);
            $table->string('division')->nullable();
            $table->timestamps();
        });

        Schema::create('forum_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('channel_id')->constrained('forum_channels')->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('content');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forum_messages');
        Schema::dropIfExists('forum_channels');
    }
};
