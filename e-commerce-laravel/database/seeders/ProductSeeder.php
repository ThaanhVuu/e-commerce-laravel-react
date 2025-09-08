<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Factories\Product;
use Database\Factories\Category;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();

        if ($categories->isEmpty()) {
            $this->command->warn("⚠️ Không có category nào, hãy seed CategorySeeder trước!");
            return;
        }

        $sampleProducts = [
            'Classic', 'Premium', 'Casual', 'Sport', 'Formal',
            'Slim Fit', 'Regular Fit', 'Cotton', 'Polyester', 'Luxury'
        ];

        $count = 0;
        foreach ($categories as $category) {
            // mỗi category sẽ có 2–4 sản phẩm ngẫu nhiên
            $numProducts = rand(2, 4);

            for ($i = 0; $i < $numProducts; $i++) {
                Product::create([
                    'id'          => Str::uuid(),
                    'category_id' => $category->id,
                    'name'        => $sampleProducts[array_rand($sampleProducts)] . " " . $category->name,
                    'description' => "Sample product in category " . $category->name,
                    'price'       => rand(10, 100) * 1000, // 10k - 100k
                    'stock'       => rand(0, 50),
                    'status'      => 'ACTIVE',
                ]);

                $count++;
                if ($count >= 30) {
                    return; // tạo đủ 30 sản phẩm thì dừng
                }
            }
        }
    }
}
