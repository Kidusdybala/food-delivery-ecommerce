import RestaurantCard from "./RestaurantCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import pizzaImg from "@/assets/pizza-restaurant.jpg";
import asianImg from "@/assets/asian-restaurant.jpg";
import burgerImg from "@/assets/burger-restaurant.jpg";
import doroImg from "/food and drinks/doro.jpg";
import kitfoImg from "/food and drinks/kitfo.jpg";
import agelgilImg from "/food and drinks/agelgil.jpg";
import atakiltImg from "/food and drinks/atakilt.jpg";
import aynetImg from "/food and drinks/aynet.jpg";
import nigusImg from "/food and drinks/nigus.jpg";
import shiroImg from "/food and drinks/shiro.jpg";
import cocaImg from "/food and drinks/coca cola.jpg";
import spriteImg from "/food and drinks/sprite.jpg";

const FoodGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const foods = [
    // Habesha 2000 - Ethiopian Restaurant
    {
      id: 1,
      name: "Doro Wat",
      restaurant: "Habesha 2000",
      price: 500,
      image: doroImg,
      description: "Spicy Ethiopian chicken stew with berbere spice and injera."
    },
    {
      id: 2,
      name: "Kitfo",
      restaurant: "Habesha 2000",
      price: 600,
      image: kitfoImg,
      description: "Minced beef tartare seasoned with mitmita and served with injera."
    },
    {
      id: 3,
      name: "Agelgil Tibs",
      restaurant: "Habesha 2000",
      price: 450,
      image: agelgilImg,
      description: "Lamb cubes sautéed with onions, garlic, and rosemary."
    },
    {
      id: 4,
      name: "Atakilt Wat",
      restaurant: "Habesha 2000",
      price: 350,
      image: atakiltImg,
      description: "Mixed vegetable stew with cabbage, carrots, and potatoes."
    },
    {
      id: 5,
      name: "Aynet Tibs",
      restaurant: "Habesha 2000",
      price: 480,
      image: aynetImg,
      description: "Beef cubes cooked with onions, tomatoes, and green peppers."
    },
    {
      id: 6,
      name: "Nigus Wat",
      restaurant: "Habesha 2000",
      price: 400,
      image: nigusImg,
      description: "Lentil stew with berbere spice and served with injera."
    },
    {
      id: 7,
      name: "Shiro Wat",
      restaurant: "Habesha 2000",
      price: 320,
      image: shiroImg,
      description: "Chickpea flour stew with onions and berbere spice."
    },
    {
      id: 8,
      name: "Tibs Firfir",
      restaurant: "Habesha 2000",
      price: 420,
      image: agelgilImg,
      description: "Shredded beef with injera pieces in spicy sauce."
    },
    {
      id: 9,
      name: "Dullet",
      restaurant: "Habesha 2000",
      price: 380,
      image: atakiltImg,
      description: "Tripe stew with onions and berbere spice."
    },
    {
      id: 10,
      name: "Beyainatu",
      restaurant: "Habesha 2000",
      price: 550,
      image: doroImg,
      description: "Mixed platter of Ethiopian delicacies."
    },
    // Mama's Kitchen - Italian Restaurant
    {
      id: 11,
      name: "Margherita Pizza",
      restaurant: "Mama's Kitchen",
      price: 400,
      image: pizzaImg,
      description: "Classic pizza with tomato sauce, mozzarella, and fresh basil."
    },
    {
      id: 12,
      name: "Pepperoni Pizza",
      restaurant: "Mama's Kitchen",
      price: 450,
      image: pizzaImg,
      description: "Pizza topped with pepperoni, cheese, and Italian herbs."
    },
    {
      id: 13,
      name: "Carbonara Pasta",
      restaurant: "Mama's Kitchen",
      price: 380,
      image: pizzaImg,
      description: "Creamy pasta with pancetta, eggs, and parmesan."
    },
    {
      id: 14,
      name: "Lasagna",
      restaurant: "Mama's Kitchen",
      price: 420,
      image: pizzaImg,
      description: "Layered pasta with meat sauce and cheese."
    },
    {
      id: 15,
      name: "Risotto",
      restaurant: "Mama's Kitchen",
      price: 360,
      image: pizzaImg,
      description: "Creamy rice dish with mushrooms and parmesan."
    },
    {
      id: 16,
      name: "Tiramisu",
      restaurant: "Mama's Kitchen",
      price: 250,
      image: pizzaImg,
      description: "Classic Italian dessert with coffee and mascarpone."
    },
    {
      id: 17,
      name: "Gelato",
      restaurant: "Mama's Kitchen",
      price: 150,
      image: pizzaImg,
      description: "Italian ice cream in various flavors."
    },
    {
      id: 18,
      name: "Caprese Salad",
      restaurant: "Mama's Kitchen",
      price: 280,
      image: pizzaImg,
      description: "Tomato, mozzarella, and basil salad."
    },
    {
      id: 19,
      name: "Osso Buco",
      restaurant: "Mama's Kitchen",
      price: 550,
      image: pizzaImg,
      description: "Braised veal shanks with vegetables."
    },
    {
      id: 20,
      name: "Panna Cotta",
      restaurant: "Mama's Kitchen",
      price: 220,
      image: pizzaImg,
      description: "Creamy custard dessert with berry sauce."
    },
    // Burger King Addis - Burger Restaurant
    {
      id: 21,
      name: "Whopper",
      restaurant: "Burger King Addis",
      price: 350,
      image: burgerImg,
      description: "Flame-grilled beef patty with lettuce, tomato, and mayo."
    },
    {
      id: 22,
      name: "Cheeseburger",
      restaurant: "Burger King Addis",
      price: 380,
      image: burgerImg,
      description: "Whopper with American cheese."
    },
    {
      id: 23,
      name: "Chicken Royale",
      restaurant: "Burger King Addis",
      price: 340,
      image: burgerImg,
      description: "Crispy chicken breast with lettuce and mayo."
    },
    {
      id: 24,
      name: "Veggie Burger",
      restaurant: "Burger King Addis",
      price: 320,
      image: burgerImg,
      description: "Plant-based patty with fresh vegetables."
    },
    {
      id: 25,
      name: "Big King",
      restaurant: "Burger King Addis",
      price: 420,
      image: burgerImg,
      description: "Two flame-grilled beef patties with cheese."
    },
    {
      id: 26,
      name: "Onion Rings",
      restaurant: "Burger King Addis",
      price: 180,
      image: burgerImg,
      description: "Crispy battered onion rings."
    },
    {
      id: 27,
      name: "Fries",
      restaurant: "Burger King Addis",
      price: 120,
      image: burgerImg,
      description: "Golden crispy french fries."
    },
    {
      id: 28,
      name: "Chicken Nuggets",
      restaurant: "Burger King Addis",
      price: 250,
      image: burgerImg,
      description: "Crispy chicken nuggets with dipping sauce."
    },
    {
      id: 29,
      name: "Milkshake",
      restaurant: "Burger King Addis",
      price: 150,
      image: burgerImg,
      description: "Thick and creamy milkshake."
    },
    {
      id: 30,
      name: "Apple Pie",
      restaurant: "Burger King Addis",
      price: 100,
      image: burgerImg,
      description: "Warm apple pie with cinnamon."
    },
    // KFC Addis Ababa - Fried Chicken
    {
      id: 31,
      name: "Original Recipe Chicken",
      restaurant: "KFC Addis Ababa",
      price: 280,
      image: burgerImg,
      description: "Colonel's secret recipe fried chicken."
    },
    {
      id: 32,
      name: "Hot Wings",
      restaurant: "KFC Addis Ababa",
      price: 320,
      image: burgerImg,
      description: "Spicy chicken wings with hot sauce."
    },
    {
      id: 33,
      name: "Chicken Bucket",
      restaurant: "KFC Addis Ababa",
      price: 450,
      image: burgerImg,
      description: "Bucket of 8 pieces fried chicken."
    },
    {
      id: 34,
      name: "Zinger Burger",
      restaurant: "KFC Addis Ababa",
      price: 300,
      image: burgerImg,
      description: "Spicy chicken burger with lettuce and mayo."
    },
    {
      id: 35,
      name: "Popcorn Chicken",
      restaurant: "KFC Addis Ababa",
      price: 220,
      image: burgerImg,
      description: "Bite-sized crispy chicken pieces."
    },
    {
      id: 36,
      name: "Mashed Potatoes",
      restaurant: "KFC Addis Ababa",
      price: 100,
      image: burgerImg,
      description: "Creamy mashed potatoes with gravy."
    },
    {
      id: 37,
      name: "Coleslaw",
      restaurant: "KFC Addis Ababa",
      price: 80,
      image: burgerImg,
      description: "Creamy cabbage and carrot salad."
    },
    {
      id: 38,
      name: "Biscuits",
      restaurant: "KFC Addis Ababa",
      price: 60,
      image: burgerImg,
      description: "Fluffy buttermilk biscuits."
    },
    {
      id: 39,
      name: "Mac & Cheese",
      restaurant: "KFC Addis Ababa",
      price: 150,
      image: burgerImg,
      description: "Creamy macaroni and cheese."
    },
    {
      id: 40,
      name: "Chocolate Chip Cookie",
      restaurant: "KFC Addis Ababa",
      price: 50,
      image: burgerImg,
      description: "Soft chocolate chip cookie."
    },
    // Pizza Hut Addis - Pizza Restaurant
    {
      id: 41,
      name: "Supreme Pizza",
      restaurant: "Pizza Hut Addis",
      price: 480,
      image: pizzaImg,
      description: "Pizza with pepperoni, sausage, bell peppers, and onions."
    },
    {
      id: 42,
      name: "Hawaiian Pizza",
      restaurant: "Pizza Hut Addis",
      price: 460,
      image: pizzaImg,
      description: "Pizza with ham, pineapple, and cheese."
    },
    {
      id: 43,
      name: "BBQ Chicken Pizza",
      restaurant: "Pizza Hut Addis",
      price: 500,
      image: pizzaImg,
      description: "Pizza with BBQ chicken, red onions, and cilantro."
    },
    {
      id: 44,
      name: "Veggie Lover's Pizza",
      restaurant: "Pizza Hut Addis",
      price: 420,
      image: pizzaImg,
      description: "Pizza loaded with fresh vegetables."
    },
    {
      id: 45,
      name: "Meat Lover's Pizza",
      restaurant: "Pizza Hut Addis",
      price: 520,
      image: pizzaImg,
      description: "Pizza with multiple meats: pepperoni, sausage, ham, and bacon."
    },
    {
      id: 46,
      name: "Garlic Bread",
      restaurant: "Pizza Hut Addis",
      price: 120,
      image: pizzaImg,
      description: "Toasted bread with garlic butter and herbs."
    },
    {
      id: 47,
      name: "Chicken Wings",
      restaurant: "Pizza Hut Addis",
      price: 280,
      image: pizzaImg,
      description: "Buffalo style chicken wings."
    },
    {
      id: 48,
      name: "Pasta",
      restaurant: "Pizza Hut Addis",
      price: 350,
      image: pizzaImg,
      description: "Creamy pasta with choice of sauce."
    },
    {
      id: 49,
      name: "Breadsticks",
      restaurant: "Pizza Hut Addis",
      price: 100,
      image: pizzaImg,
      description: "Soft breadsticks with marinara sauce."
    },
    {
      id: 50,
      name: "Chocolate Lava Cake",
      restaurant: "Pizza Hut Addis",
      price: 150,
      image: pizzaImg,
      description: "Warm chocolate cake with molten center."
    },
    // Drinks from various restaurants
    {
      id: 51,
      name: "Coca Cola",
      restaurant: "Various",
      price: 50,
      image: cocaImg,
      description: "Classic Coca Cola soft drink."
    },
    {
      id: 52,
      name: "Sprite",
      restaurant: "Various",
      price: 50,
      image: spriteImg,
      description: "Lemon-lime flavored soda."
    }
  ];

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-20 bg-muted/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Popular Foods
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover delicious foods from restaurants in Addis Ababa and get them
            delivered fresh to your doorstep.
          </p>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for foods or restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFoods.map((food) => (
            <RestaurantCard
              key={food.id}
              name={food.name}
              cuisine={food.restaurant}
              rating={4.5} // Placeholder
              deliveryTime="20-30 min" // Placeholder
              deliveryFee={0} // Placeholder
              image={food.image}
              description={`${food.description} - ${food.price} ETB`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodGrid;