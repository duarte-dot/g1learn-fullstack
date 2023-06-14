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
        Schema::create('comments', function (Blueprint $table) {
          $table->id();
          $table->unsignedBigInteger('user_id'); // Foreign key column
          $table->unsignedBigInteger('post_id'); // Foreign key column
          $table->text('content');
          $table->timestamps();

          $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade'); // Define the foreign key constraint
          $table->foreign('post_id')->references('id')->on('posts')->onUpdate('cascade')->onDelete('cascade'); // Define the foreign key constraint
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
