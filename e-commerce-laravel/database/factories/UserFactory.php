<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition(): array
    {
        return [
            'id' => (string) Str::uuid(),
            'username' => $this->faker->unique()->userName(),
            'password' => Hash::make('password'),
            'role' => $this->faker->randomElement(['USER','MANAGER','SALER']),
        ];
    }
}
