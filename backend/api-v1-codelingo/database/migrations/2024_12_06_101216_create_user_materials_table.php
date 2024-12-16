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
        Schema::create('user_materials', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_learning_path_id')->constrained('user_learning_paths')->cascadeOnDelete();
            $table->uuid('material_id');
            $table->boolean('is_completed')->default(false);
            $table->boolean('is_unlocked')->default(false);
            $table->timestamps();

            $table->foreign('material_id')->references('id')->on('materials')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_materials');
    }
};
