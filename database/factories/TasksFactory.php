<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tasks>
 */
class TasksFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->sentence(),
            'description'=>fake()->realText(),
            'due_date'=> fake()->dateTimeBetween('now','+1 year'),
            'status'=> fake()->realStatus(['completed','pending','in_progress']),
            'priority'=> fake()->randomElement(['low','medium','high']),
            'image_path'=> fake()->imageurl(),
            'assigned_user_id'=> 1,
            'created_by'=>1,
            'updated_by'=> 1,
            'created_at'=>time(),
            'updated_at'=>time(),
        ];
    }
}
