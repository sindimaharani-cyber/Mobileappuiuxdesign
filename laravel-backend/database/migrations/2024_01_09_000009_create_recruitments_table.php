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
        Schema::create('recruitments', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('period');
            $table->enum('status', ['open', 'closed', 'selection'])->default('open');
            $table->integer('quota');
            $table->date('deadline');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('recruitment_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recruitment_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('nim');
            $table->string('angkatan');
            $table->string('email');
            $table->string('phone');
            $table->string('division');
            $table->text('motivation');
            $table->enum('status', ['pending', 'accepted', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recruitment_applications');
        Schema::dropIfExists('recruitments');
    }
};
