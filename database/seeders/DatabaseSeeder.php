<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Database\Factories\ProjectFactory;
use Illuminate\Database\Seeder;
use App\Models\project;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory->count(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password'=> bcrypt('123456789'),
            'email_verified_at'=>time()
        ]);

        project::factory()->count(30)
        ->hasTsk(30)
        ->create();
    }
}
