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
import fantaImg from "/food and drinks/fanta.jpg";
import spriteImg from "/food and drinks/sprite.jpg";

const FoodGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const foods = [
    {
      id: 1,
      name: "Margherita Pizza",
      restaurant: "Mario's Pizzeria",
      price: 12.99,
      image: pizzaImg,
      description: "Classic pizza with tomato sauce, mozzarella, and fresh basil."
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      restaurant: "Mario's Pizzeria",
      price: 14.99,
      image: pizzaImg,
      description: "Pizza topped with pepperoni, cheese, and Italian herbs."
    },
    {
      id: 3,
      name: "Classic Burger",
      restaurant: "Burger Palace",
      price: 9.99,
      image: burgerImg,
      description: "Juicy beef patty with lettuce, tomato, and special sauce."
    },
    {
      id: 4,
      name: "Cheese Burger",
      restaurant: "Burger Palace",
      price: 10.99,
      image: burgerImg,
      description: "Classic burger with melted cheese and all the fixings."
    },
    {
      id: 5,
      name: "Chicken Burger",
      restaurant: "Burger Hub",
      price: 11.49,
      image: burgerImg,
      description: "Grilled chicken patty with fresh vegetables and mayo."
    },
    {
      id: 6,
      name: "Veggie Burger",
      restaurant: "Burger Hub",
      price: 10.49,
      image: burgerImg,
      description: "Plant-based patty with avocado, lettuce, and tomato."
    },
    {
      id: 7,
      name: "Beef Burrito",
      restaurant: "Taco Fiesta",
      price: 8.99,
      image: burgerImg,
      description: "Large burrito filled with seasoned beef, rice, and beans."
    },
    {
      id: 8,
      name: "Chicken Burrito",
      restaurant: "Burrito Barn",
      price: 9.49,
      image: burgerImg,
      description: "Burrito with grilled chicken, salsa, and cheese."
    },
    {
      id: 9,
      name: "Doro Wat",
      restaurant: "Habesha Kitchen",
      price: 16.99,
      image: doroImg,
      description: "Spicy Ethiopian chicken stew with berbere spice and injera."
    },
    {
      id: 10,
      name: "Kitfo",
      restaurant: "Habesha Kitchen",
      price: 18.99,
      image: kitfoImg,
      description: "Minced beef tartare seasoned with mitmita and served with injera."
    },
    {
      id: 11,
      name: "Agelgil Tibs",
      restaurant: "Habesha Kitchen",
      price: 15.99,
      image: agelgilImg,
      description: "Lamb cubes sautéed with onions, garlic, and rosemary."
    },
    {
      id: 12,
      name: "Atakilt Wat",
      restaurant: "Habesha Kitchen",
      price: 14.99,
      image: atakiltImg,
      description: "Mixed vegetable stew with cabbage, carrots, and potatoes."
    },
    {
      id: 13,
      name: "Aynet Tibs",
      restaurant: "Habesha Kitchen",
      price: 17.99,
      image: aynetImg,
      description: "Beef cubes cooked with onions, tomatoes, and green peppers."
    },
    {
      id: 14,
      name: "Nigus Wat",
      restaurant: "Habesha Kitchen",
      price: 16.49,
      image: nigusImg,
      description: "Lentil stew with berbere spice and served with injera."
    },
    {
      id: 15,
      name: "Shiro Wat",
      restaurant: "Habesha Kitchen",
      price: 13.99,
      image: shiroImg,
      description: "Chickpea flour stew with onions and berbere spice."
    },
    {
      id: 16,
      name: "Coca Cola",
      restaurant: "Various",
      price: 2.49,
      image: cocaImg,
      description: "Classic Coca Cola soft drink."
    },
    {
      id: 17,
      name: "Fanta",
      restaurant: "Various",
      price: 2.49,
      image: fantaImg,
      description: "Orange flavored soft drink."
    },
    {
      id: 18,
      name: "Sprite",
      restaurant: "Various",
      price: 2.49,
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
              description={`${food.description} - $${food.price}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodGrid;