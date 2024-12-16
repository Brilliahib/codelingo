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
        Schema::create('questions', function (Blueprint $table) {
            $table->uuid('id')->primary();  
            $table->foreignUuid('quiz_id')->constrained('quizzes')->onDelete('cascade');
            $table->text('question_text');
            $table->string('question_image')->nullable();
            $table->text('explanation_text')->nullable();
            $table->string('explanation_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
