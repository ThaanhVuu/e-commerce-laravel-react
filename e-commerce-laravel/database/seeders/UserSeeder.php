<?php

namespace Database\Seeders;

use Database\Factories\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if(!User::where('username','=' ,'admin')->exists()){
            User::create([
                'username' => "admin",
                'password' => Hash::make('admin'),
                'role' => 'ADMIN'
            ]);
        }

//        User::factory()
//            ->count(30)
//            ->state(fn(array $attributes) => [
//                'role' => fake()->randomElement(['USER','MANAGER','SALER'])
//            ])
//            ->create();
        if(!User::where('username', '=', 'user')->exists()){
            User::create([
                'username' => 'user',
                'password' => Hash::make('user'),
                'role' => 'USER'
            ]);
        }
    }
}
