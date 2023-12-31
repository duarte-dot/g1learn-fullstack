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
      Schema::create('posts', function (Blueprint $table) {
          $table->id();
          $table->unsignedBigInteger('user_id'); // Foreign key column
          $table->unsignedBigInteger('category_id'); // Foreign key column
          $table->string('title', 255);
          $table->text('content');
          $table->timestamps();

          $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade'); // Define the foreign key constraint
          $table->foreign('category_id')->references('id')->on('categories')->onUpdate('cascade')->onDelete('cascade'); // Define the foreign key constraint
      });
  }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
