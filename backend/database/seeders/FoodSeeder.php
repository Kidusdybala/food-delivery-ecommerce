<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $foods = [
            // Hilton - All kinds of food
            [
                'name' => 'Margherita Pizza',
                'restaurant' => 'Hilton',
                'price' => 400,
                'image' => '/food and drinks/big pizza.jpg',
                'description' => 'Classic pizza with tomato sauce, mozzarella, and fresh basil.'
            ],
            [
                'name' => 'Cheese Burger',
                'restaurant' => 'Hilton',
                'price' => 350,
                'image' => '/food and drinks/cheese burger.jpg',
                'description' => 'Juicy beef patty with melted cheese.'
            ],
            [
                'name' => 'Carbonara Pasta',
                'restaurant' => 'Hilton',
                'price' => 450,
                'image' => '/food and drinks/carabora pasta.jpg',
                'description' => 'Creamy pasta with bacon, eggs, and parmesan.'
            ],
            [
                'name' => 'Caprese Salad',
                'restaurant' => 'Hilton',
                'price' => 300,
                'image' => '/food and drinks/carprese salad.webp',
                'description' => 'Fresh tomatoes, mozzarella, and basil with balsamic.'
            ],
            [
                'name' => 'Osso Buco',
                'restaurant' => 'Hilton',
                'price' => 600,
                'image' => '/food and drinks/ossco buco.webp',
                'description' => 'Braised veal shanks with vegetables and risotto.'
            ],
            [
                'name' => 'Risotto',
                'restaurant' => 'Hilton',
                'price' => 480,
                'image' => '/food and drinks/rissoto.jpg',
                'description' => 'Creamy Italian rice dish with mushrooms.'
            ],
            [
                'name' => 'Lasagna',
                'restaurant' => 'Hilton',
                'price' => 500,
                'image' => '/food and drinks/lasagna.jpg',
                'description' => 'Layered pasta with meat sauce and cheese.'
            ],
            [
                'name' => 'Gelato',
                'restaurant' => 'Hilton',
                'price' => 200,
                'image' => '/food and drinks/gelato.jpg',
                'description' => 'Italian ice cream in various flavors.'
            ],
            [
                'name' => 'Coca Cola',
                'restaurant' => 'Hilton',
                'price' => 50,
                'image' => '/food and drinks/coca cola.jpg',
                'description' => 'Refreshing cola drink.'
            ],
            [
                'name' => 'Sprite',
                'restaurant' => 'Hilton',
                'price' => 50,
                'image' => '/food and drinks/sprite.jpg',
                'description' => 'Lemon-lime soda.'
            ],
            // Simple Bistro - Burgers & Pizza
            [
                'name' => 'Classic Burger',
                'restaurant' => 'Simple Bistro',
                'price' => 350,
                'image' => '/food and drinks/ultimate double burger.jpg',
                'description' => 'Juicy beef patty with lettuce, tomato, and special sauce.'
            ],
            [
                'name' => 'Cheese Burger',
                'restaurant' => 'Simple Bistro',
                'price' => 380,
                'image' => '/food and drinks/cheese burger.jpg',
                'description' => 'Classic burger with melted cheese.'
            ],
            [
                'name' => 'Margherita Pizza',
                'restaurant' => 'Simple Bistro',
                'price' => 420,
                'image' => '/food and drinks/big pizza.jpg',
                'description' => 'Classic pizza with tomato sauce, mozzarella, and fresh basil.'
            ],
            [
                'name' => 'Pepperoni Pizza',
                'restaurant' => 'Simple Bistro',
                'price' => 450,
                'image' => '/food and drinks/pepperoni pizza.avif',
                'description' => 'Pizza topped with pepperoni, cheese, and Italian herbs.'
            ],
            [
                'name' => 'Chicken Burger',
                'restaurant' => 'Simple Bistro',
                'price' => 360,
                'image' => '/food and drinks/tuna burger.jpg',
                'description' => 'Grilled chicken patty with fresh vegetables.'
            ],
            [
                'name' => 'Veggie Burger',
                'restaurant' => 'Simple Bistro',
                'price' => 320,
                'image' => '/food and drinks/tuna burger.jpg',
                'description' => 'Plant-based patty with fresh vegetables.'
            ],
            [
                'name' => 'Supreme Pizza',
                'restaurant' => 'Simple Bistro',
                'price' => 480,
                'image' => '/food and drinks/stuffed crust pizza.jpg',
                'description' => 'Pizza with pepperoni, sausage, bell peppers, and onions.'
            ],
            [
                'name' => 'Hawaiian Pizza',
                'restaurant' => 'Simple Bistro',
                'price' => 460,
                'image' => '/food and drinks/green pizza.jpg',
                'description' => 'Pizza with ham, pineapple, and cheese.'
            ],
            [
                'name' => 'Double Burger',
                'restaurant' => 'Simple Bistro',
                'price' => 420,
                'image' => '/food and drinks/ultimate double burger.jpg',
                'description' => 'Two flame-grilled beef patties with cheese.'
            ],
            [
                'name' => 'BBQ Chicken Pizza',
                'restaurant' => 'Simple Bistro',
                'price' => 500,
                'image' => '/food and drinks/stuffed crust pizza.jpg',
                'description' => 'Pizza with BBQ chicken, red onions, and cilantro.'
            ],
            // Amrogn Chicken - Burgers, Pizza & Sandwiches
            [
                'name' => 'Chicken Burger',
                'restaurant' => 'Amrogn Chicken',
                'price' => 340,
                'image' => '/food and drinks/tuna burger.jpg',
                'description' => 'Grilled chicken patty with fresh vegetables and mayo.'
            ],
            [
                'name' => 'Beef Burger',
                'restaurant' => 'Amrogn Chicken',
                'price' => 370,
                'image' => '/food and drinks/ultimate double burger.jpg',
                'description' => 'Juicy beef patty with lettuce, tomato, and special sauce.'
            ],
            [
                'name' => 'Cheese Burger',
                'restaurant' => 'Amrogn Chicken',
                'price' => 390,
                'image' => '/food and drinks/cheese burger.jpg',
                'description' => 'Classic burger with melted cheese.'
            ],
            [
                'name' => 'Margherita Pizza',
                'restaurant' => 'Amrogn Chicken',
                'price' => 410,
                'image' => '/food and drinks/big pizza.jpg',
                'description' => 'Classic pizza with tomato sauce, mozzarella, and fresh basil.'
            ],
            [
                'name' => 'Pepperoni Pizza',
                'restaurant' => 'Amrogn Chicken',
                'price' => 440,
                'image' => '/food and drinks/pepperoni pizza.avif',
                'description' => 'Pizza topped with pepperoni, cheese, and Italian herbs.'
            ],
            [
                'name' => 'Chicken Sandwich',
                'restaurant' => 'Amrogn Chicken',
                'price' => 330,
                'image' => '/food and drinks/normal sandwitch.jpg',
                'description' => 'Crispy chicken breast sandwich with lettuce and mayo.'
            ],
            [
                'name' => 'Tuna Sandwich',
                'restaurant' => 'Amrogn Chicken',
                'price' => 310,
                'image' => '/food and drinks/tuna sandwich.jpg',
                'description' => 'Tuna salad sandwich with fresh vegetables.'
            ],
            [
                'name' => 'Club Sandwich',
                'restaurant' => 'Amrogn Chicken',
                'price' => 380,
                'image' => '/food and drinks/normal sandwitch.jpg',
                'description' => 'Triple decker sandwich with chicken, bacon, and veggies.'
            ],
            [
                'name' => 'Supreme Pizza',
                'restaurant' => 'Amrogn Chicken',
                'price' => 470,
                'image' => '/food and drinks/stuffed crust pizza.jpg',
                'description' => 'Pizza with pepperoni, sausage, bell peppers, and onions.'
            ],
            [
                'name' => 'Double Burger',
                'restaurant' => 'Amrogn Chicken',
                'price' => 430,
                'image' => '/food and drinks/ultimate double burger.jpg',
                'description' => 'Two flame-grilled beef patties with cheese.'
            ],
            // Skylight - Fancy Burgers & Pizza
            [
                'name' => 'Truffle Burger',
                'restaurant' => 'Skylight',
                'price' => 550,
                'image' => '/food and drinks/ultimate double burger.jpg',
                'description' => 'Premium beef patty with truffle aioli, gourmet toppings.'
            ],
            [
                'name' => 'Wagyu Burger',
                'restaurant' => 'Skylight',
                'price' => 600,
                'image' => '/food and drinks/cheese burger.jpg',
                'description' => 'Premium wagyu beef patty with special sauce.'
            ],
            [
                'name' => 'Lobster Burger',
                'restaurant' => 'Skylight',
                'price' => 580,
                'image' => '/food and drinks/tuna burger.jpg',
                'description' => 'Fresh lobster patty with premium ingredients.'
            ],
            [
                'name' => 'Gourmet Pizza',
                'restaurant' => 'Skylight',
                'price' => 520,
                'image' => '/food and drinks/big pizza.jpg',
                'description' => 'Artisanal pizza with premium ingredients.'
            ],
            [
                'name' => 'Truffle Pizza',
                'restaurant' => 'Skylight',
                'price' => 560,
                'image' => '/food and drinks/pepperoni pizza.avif',
                'description' => 'Pizza topped with truffle oil and premium cheeses.'
            ],
            [
                'name' => 'Seafood Pizza',
                'restaurant' => 'Skylight',
                'price' => 590,
                'image' => '/food and drinks/stuffed crust pizza.jpg',
                'description' => 'Pizza with fresh seafood and herbs.'
            ],
            [
                'name' => 'Foie Gras Pizza',
                'restaurant' => 'Skylight',
                'price' => 600,
                'image' => '/food and drinks/green pizza.jpg',
                'description' => 'Luxury pizza with foie gras and truffle.'
            ],
            [
                'name' => 'Caviar Pizza',
                'restaurant' => 'Skylight',
                'price' => 600,
                'image' => '/food and drinks/stuffed crust pizza.jpg',
                'description' => 'Premium pizza topped with caviar.'
            ],
            [
                'name' => 'Gold Leaf Burger',
                'restaurant' => 'Skylight',
                'price' => 600,
                'image' => '/food and drinks/ultimate double burger.jpg',
                'description' => 'Luxury burger with edible gold leaf.'
            ],
            [
                'name' => 'Diamond Pizza',
                'restaurant' => 'Skylight',
                'price' => 600,
                'image' => '/food and drinks/green pizza.jpg',
                'description' => 'Exclusive pizza with diamond dust garnish.'
            ],
            // Fegegta - Burgers, Pizza, Burritos & Sandwiches
            [
                'name' => 'Classic Burger',
                'restaurant' => 'Fegegta',
                'price' => 340,
                'image' => '/food and drinks/ultimate double burger.jpg',
                'description' => 'Juicy beef patty with lettuce, tomato, and special sauce.'
            ],
            [
                'name' => 'Cheese Burger',
                'restaurant' => 'Fegegta',
                'price' => 360,
                'image' => '/food and drinks/cheese burger.jpg',
                'description' => 'Classic burger with melted cheese.'
            ],
            [
                'name' => 'Chicken Burger',
                'restaurant' => 'Fegegta',
                'price' => 350,
                'image' => '/food and drinks/tuna burger.jpg',
                'description' => 'Grilled chicken patty with fresh vegetables.'
            ],
            [
                'name' => 'Margherita Pizza',
                'restaurant' => 'Fegegta',
                'price' => 410,
                'image' => '/food and drinks/big pizza.jpg',
                'description' => 'Classic pizza with tomato sauce, mozzarella, and fresh basil.'
            ],
            [
                'name' => 'Pepperoni Pizza',
                'restaurant' => 'Fegegta',
                'price' => 440,
                'image' => '/food and drinks/pepperoni pizza.avif',
                'description' => 'Pizza topped with pepperoni, cheese, and Italian herbs.'
            ],
            [
                'name' => 'Beef Burrito',
                'restaurant' => 'Fegegta',
                'price' => 400,
                'image' => '/food and drinks/big borrito.jpg',
                'description' => 'Large burrito filled with seasoned beef, rice, and beans.'
            ],
            [
                'name' => 'Chicken Burrito',
                'restaurant' => 'Fegegta',
                'price' => 380,
                'image' => '/food and drinks/normal borritto.jpg',
                'description' => 'Burrito with grilled chicken, salsa, and cheese.'
            ],
            [
                'name' => 'Club Sandwich',
                'restaurant' => 'Fegegta',
                'price' => 370,
                'image' => '/food and drinks/normal sandwitch.jpg',
                'description' => 'Triple decker sandwich with chicken, bacon, and veggies.'
            ],
            [
                'name' => 'Tuna Sandwich',
                'restaurant' => 'Fegegta',
                'price' => 320,
                'image' => '/food and drinks/tuna sandwich.jpg',
                'description' => 'Tuna salad sandwich with fresh vegetables.'
            ],
            [
                'name' => 'Supreme Pizza',
                'restaurant' => 'Fegegta',
                'price' => 470,
                'image' => '/food and drinks/stuffed crust pizza.jpg',
                'description' => 'Pizza with pepperoni, sausage, bell peppers, and onions.'
            ],
        ];

        foreach ($foods as $food) {
            \App\Models\Food::create($food);
        }
    }
}
