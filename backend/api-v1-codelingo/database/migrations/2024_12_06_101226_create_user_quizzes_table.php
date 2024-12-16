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
        Schema::create('user_quizzes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_learning_path_id')->constrained('user_learning_paths')->cascadeOnDelete();
            $table->uuid('quiz_id'); 
            $table->foreign('quiz_id')->references('id')->on('quizzes')->cascadeOnDelete();
            $table->boolean('is_completed')->default(false);
            $table->boolean('is_unlocked')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_quizzes');
    }
};
