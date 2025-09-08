<?php

namespace Database\Factories;

use App\Models\BlackToken;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class BlackTokenFactory extends Factory
{
    protected $model = BlackToken::class;

    public function definition(): array
    {
        return [
            'token' => Str::random(10),
            'expired_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
