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
        Schema::create('letters', function (Blueprint $table) {
            $table->id();
            $table->string('number')->unique();
            $table->string('subject');
            $table->enum('type', ['incoming', 'outgoing']);
            $table->string('from')->nullable();
            $table->string('to')->nullable();
            $table->date('date');
            $table->enum('status', ['pending', 'approved', 'sent'])->default('pending');
            $table->string('category');
            $table->text('content')->nullable();
            $table->string('file_path')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
        });

        Schema::create('letter_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('category');
            $table->text('content');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('letter_templates');
        Schema::dropIfExists('letters');
    }
};
