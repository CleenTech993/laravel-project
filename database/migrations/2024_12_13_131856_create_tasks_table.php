<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::create('tasks', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->longText('description');
        $table->string('image_path');
        $table->string('status');
        $table->string('priority');
        $table->string('due_date')->nullable();
        
        // Corrected foreign keys with 'users' table (plural)
        $table->foreignId('assigned_user_id')->constrained('users'); // Corrected to 'users'
        $table->foreignId('created_by')->constrained('users');     // Corrected to 'users'
        $table->foreignId('updated_by')->constrained('users');     // Corrected to 'users'
        $table->foreignId('project_id')->constrained('projects');
        
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
};
