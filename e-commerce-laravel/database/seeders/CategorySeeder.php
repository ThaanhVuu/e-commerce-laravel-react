<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Factories\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Shirts', 'description' => 'All types of shirts'],
            ['name' => 'Skirts', 'description' => 'Various kinds of skirts'],
            ['name' => 'Frocks', 'description' => 'Frocks and dresses'],
            ['name' => 'P.T. T-shirts', 'description' => 'Physical Training T-shirts'],
            ['name' => 'P.T. Shorts', 'description' => 'Physical Training shorts'],
            ['name' => 'Track pants', 'description' => 'Sports and casual track pants'],
            ['name' => 'Belts', 'description' => 'Belts and waist accessories'],
            ['name' => 'Ties', 'description' => 'Neckties and school ties'],
            ['name' => 'Logos', 'description' => 'Logos and embroidery patches'],
            ['name' => 'Socks', 'description' => 'All types of socks'],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }
    }
}
