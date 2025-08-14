<?php

namespace Database\Seeders;

use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InitAdminUser extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('username', 'admin')->first();
        if (!$admin) {
            User::create([
                'username' => 'admin',
                'password' => Hash::make('admin'),
                'role' => 'ADMIN',
            ]);
        }
    }
}
