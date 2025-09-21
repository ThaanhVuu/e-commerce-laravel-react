<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = ['PENDING', 'CONFIRMED', 'SHIPPED', 'COMPLETED', 'CANCELLED'];

        for ($i = 0; $i < 30; $i++) {
            DB::table('orders')->insert([
                'id' => (string) Str::uuid(),
                'user_id' => User::inRandomOrder()->value('id'), // giả định random user_id
                'total_price' => fake()->randomFloat(2, 100000, 5000000), // từ 100k đến 5tr
                'status' => $statuses[array_rand($statuses)],
                'created_at' => Carbon::now()->subDays(rand(0, 30)),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
