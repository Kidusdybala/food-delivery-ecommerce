<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create or update test user for MongoDB
        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
            ]
        );

        // Create demo users
        User::updateOrCreate(
            ['email' => 'admin@foodieexpress.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('admin123'),
                'role' => 'admin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'client@foodieexpress.com'],
            [
                'name' => 'Client User',
                'password' => bcrypt('client123'),
                'role' => 'client',
            ]
        );

        User::updateOrCreate(
            ['email' => 'delivery@foodieexpress.com'],
            [
                'name' => 'Delivery User',
                'password' => bcrypt('delivery123'),
                'role' => 'delivery',
            ]
        );

        $this->call([
            FoodSeeder::class,
            RestaurantSeeder::class,
        ]);
    }
}
