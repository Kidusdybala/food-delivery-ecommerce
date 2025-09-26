<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RestaurantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $restaurants = [
            [
                'name' => 'Hilton',
                'cuisine' => 'Various',
                'rating' => 4.5,
                'delivery_time' => '20-30 min',
                'delivery_fee' => 0,
                'image' => '/food and drinks/restorants/hilton.webp',
                'description' => 'Premium restaurant with international cuisine'
            ],
            [
                'name' => 'Simple Bistro',
                'cuisine' => 'Burgers & Pizza',
                'rating' => 4.3,
                'delivery_time' => '15-25 min',
                'delivery_fee' => 0,
                'image' => '/food and drinks/simple bistro.jpg',
                'description' => 'Casual dining with classic burgers and pizzas'
            ],
            [
                'name' => 'Amrogn Chicken',
                'cuisine' => 'Chicken & Sandwiches',
                'rating' => 4.4,
                'delivery_time' => '20-30 min',
                'delivery_fee' => 0,
                'image' => '/food and drinks/restorants/amrogn chiken.png',
                'description' => 'Specializing in chicken dishes and sandwiches'
            ],
            [
                'name' => 'Dereje Kurt bet',
                'cuisine' => 'Gourmet',
                'rating' => 4.8,
                'delivery_time' => '25-35 min',
                'delivery_fee' => 50,
                'image' => '/food and drinks/restorants/dereje kurt.jpg',
                'description' => 'Fine dining with premium ingredients'
            ],
            [
                'name' => 'Fegegta',
                'cuisine' => 'Mexican & American',
                'rating' => 4.2,
                'delivery_time' => '20-30 min',
                'delivery_fee' => 0,
                'image' => '/food and drinks/restorants/fegegta burger.jpg',
                'description' => 'Authentic Mexican food and American classics'
            ],
        ];

        foreach ($restaurants as $restaurant) {
            \App\Models\Restaurant::create($restaurant);
        }
    }
}
