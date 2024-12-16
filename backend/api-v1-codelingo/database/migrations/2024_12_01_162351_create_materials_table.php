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
        Schema::create('materials', function (Blueprint $table) {
            $table->uuid('id')->primary(); 
            $table->uuid('learning_path_id');  
            $table->string('title'); 
            $table->string('material_image')->nullable(); 
            $table->text('material_text')->nullable();
            $table->string('type')->default('material');
            $table->timestamps();

            $table->foreign('learning_path_id')->references('id')->on('learning_paths')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materials');
    }
};