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
import bigBorritoImg from "/food and drinks/big borrito.jpg";
import bigPizzaImg from "/food and drinks/big pizza.jpg";
import carbonaraPastaImg from "/food and drinks/carabora pasta.jpg";
import capreseSaladImg from "/food and drinks/carprese salad.webp";
import cheeseBurgerImg from "/food and drinks/cheese burger.jpg";
import gelatoImg from "/food and drinks/gelato.jpg";
import greenPizzaImg from "/food and drinks/green pizza.jpg";
import lasagnaImg from "/food and drinks/lasagna.jpg";
import normalBorritoImg from "/food and drinks/normal borritto.jpg";
import normalSandwichImg from "/food and drinks/normal sandwitch.jpg";
import ossoBucoImg from "/food and drinks/ossco buco.webp";
import pepperoniPizzaImg from "/food and drinks/pepperoni pizza.avif";
import risottoImg from "/food and drinks/rissoto.jpg";
import simpleBistroImg from "/food and drinks/simple bistro.jpg";
import specialSimpleBistroImg from "/food and drinks/special simple bistro.jpg";
import stuffedCrustPizzaImg from "/food and drinks/stuffed crust pizza.jpg";
import tunaBurgerImg from "/food and drinks/tuna burger.jpg";
import tunaSandwichImg from "/food and drinks/tuna sandwich.jpg";
import ultimateDoubleBurgerImg from "/food and drinks/ultimate double burger.jpg";

const FoodGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const foods = [
    // Dereje Kurt Bet - Ethiopian Meat & Injera Restaurant
    {
      id: 1,
      name: "Doro Wat",
      restaurant: "Dereje Kurt Bet",
      price: 500,
      image: doroImg,
      description: "Spicy Ethiopian chicken stew with berbere spice and injera."
    },
    {
      id: 2,
      name: "Kitfo",
      restaurant: "Dereje Kurt Bet",
      price: 600,
      image: kitfoImg,
      description: "Minced beef tartare seasoned with mitmita and served with injera."
    },
    {
      id: 3,
      name: "Agelgil Tibs",
      restaurant: "Dereje Kurt Bet",
      price: 450,
      image: agelgilImg,
      description: "Lamb cubes sautéed with onions, garlic, and rosemary."
    },
    {
      id: 4,
      name: "Aynet Tibs",
      restaurant: "Dereje Kurt Bet",
      price: 480,
      image: aynetImg,
      description: "Beef cubes cooked with onions, tomatoes, and green peppers."
    },
    {
      id: 5,
      name: "Tibs Firfir",
      restaurant: "Dereje Kurt Bet",
      price: 420,
      image: agelgilImg,
      description: "Shredded beef with injera pieces in spicy sauce."
    },
    {
      id: 6,
      name: "Dullet",
      restaurant: "Dereje Kurt Bet",
      price: 380,
      image: atakiltImg,
      description: "Tripe stew with onions and berbere spice."
    },
    {
      id: 7,
      name: "Beyainatu",
      restaurant: "Dereje Kurt Bet",
      price: 550,
      image: doroImg,
      description: "Mixed platter of Ethiopian delicacies."
    },
    {
      id: 8,
      name: "Injera",
      restaurant: "Dereje Kurt Bet",
      price: 50,
      image: atakiltImg,
      description: "Traditional Ethiopian flatbread."
    },
    {
      id: 9,
      name: "Tegelese Tibs",
      restaurant: "Dereje Kurt Bet",
      price: 460,
      image: nigusImg,
      description: "Lean beef sautéed with onions and spices."
    },
    {
      id: 10,
      name: "Kurt",
      restaurant: "Dereje Kurt Bet",
      price: 520,
      image: shiroImg,
      description: "Spiced ground meat stew."
    },
    // Simple Bistro - Burgers & Pizza
    {
      id: 11,
      name: "Classic Burger",
      restaurant: "Simple Bistro",
      price: 300,
      image: ultimateDoubleBurgerImg,
      description: "Juicy beef patty with lettuce, tomato, and special sauce."
    },
    {
      id: 12,
      name: "Cheese Burger",
      restaurant: "Simple Bistro",
      price: 350,
      image: cheeseBurgerImg,
      description: "Classic burger with melted cheese."
    },
    {
      id: 13,
      name: "Margherita Pizza",
      restaurant: "Simple Bistro",
      price: 400,
      image: bigPizzaImg,
      description: "Classic pizza with tomato sauce, mozzarella, and fresh basil."
    },
    {
      id: 14,
      name: "Pepperoni Pizza",
      restaurant: "Simple Bistro",
      price: 450,
      image: pepperoniPizzaImg,
      description: "Pizza topped with pepperoni, cheese, and Italian herbs."
    },
    {
      id: 15,
      name: "Chicken Burger",
      restaurant: "Simple Bistro",
      price: 320,
      image: tunaBurgerImg,
      description: "Grilled chicken patty with fresh vegetables."
    },
    {
      id: 16,
      name: "Veggie Burger",
      restaurant: "Simple Bistro",
      price: 280,
      image: tunaBurgerImg,
      description: "Plant-based patty with fresh vegetables."
    },
    {
      id: 17,
      name: "Supreme Pizza",
      restaurant: "Simple Bistro",
      price: 480,
      image: stuffedCrustPizzaImg,
      description: "Pizza with pepperoni, sausage, bell peppers, and onions."
    },
    {
      id: 18,
      name: "Hawaiian Pizza",
      restaurant: "Simple Bistro",
      price: 460,
      image: greenPizzaImg,
      description: "Pizza with ham, pineapple, and cheese."
    },
    {
      id: 19,
      name: "Double Burger",
      restaurant: "Simple Bistro",
      price: 420,
      image: ultimateDoubleBurgerImg,
      description: "Two flame-grilled beef patties with cheese."
    },
    {
      id: 20,
      name: "BBQ Chicken Pizza",
      restaurant: "Simple Bistro",
      price: 500,
      image: stuffedCrustPizzaImg,
      description: "Pizza with BBQ chicken, red onions, and cilantro."
    },
    // Amrogn Chicken - Burgers, Pizza & Sandwiches
    {
      id: 21,
      name: "Chicken Burger",
      restaurant: "Amrogn Chicken",
      price: 320,
      image: tunaBurgerImg,
      description: "Grilled chicken patty with fresh vegetables and mayo."
    },
    {
      id: 22,
      name: "Beef Burger",
      restaurant: "Amrogn Chicken",
      price: 350,
      image: ultimateDoubleBurgerImg,
      description: "Juicy beef patty with lettuce, tomato, and special sauce."
    },
    {
      id: 23,
      name: "Cheese Burger",
      restaurant: "Amrogn Chicken",
      price: 380,
      image: cheeseBurgerImg,
      description: "Classic burger with melted cheese."
    },
    {
      id: 24,
      name: "Margherita Pizza",
      restaurant: "Amrogn Chicken",
      price: 400,
      image: bigPizzaImg,
      description: "Classic pizza with tomato sauce, mozzarella, and fresh basil."
    },
    {
      id: 25,
      name: "Pepperoni Pizza",
      restaurant: "Amrogn Chicken",
      price: 450,
      image: pepperoniPizzaImg,
      description: "Pizza topped with pepperoni, cheese, and Italian herbs."
    },
    {
      id: 26,
      name: "Chicken Sandwich",
      restaurant: "Amrogn Chicken",
      price: 300,
      image: normalSandwichImg,
      description: "Crispy chicken breast sandwich with lettuce and mayo."
    },
    {
      id: 27,
      name: "Tuna Sandwich",
      restaurant: "Amrogn Chicken",
      price: 280,
      image: tunaSandwichImg,
      description: "Tuna salad sandwich with fresh vegetables."
    },
    {
      id: 28,
      name: "Club Sandwich",
      restaurant: "Amrogn Chicken",
      price: 350,
      image: normalSandwichImg,
      description: "Triple decker sandwich with chicken, bacon, and veggies."
    },
    {
      id: 29,
      name: "Supreme Pizza",
      restaurant: "Amrogn Chicken",
      price: 480,
      image: stuffedCrustPizzaImg,
      description: "Pizza with pepperoni, sausage, bell peppers, and onions."
    },
    {
      id: 30,
      name: "Double Burger",
      restaurant: "Amrogn Chicken",
      price: 420,
      image: ultimateDoubleBurgerImg,
      description: "Two flame-grilled beef patties with cheese."
    },
    // Skylight Hotel - Fancy Burgers & Pizza
    {
      id: 31,
      name: "Truffle Burger",
      restaurant: "Skylight Hotel",
      price: 550,
      image: ultimateDoubleBurgerImg,
      description: "Premium beef patty with truffle aioli, gourmet toppings."
    },
    {
      id: 32,
      name: "Wagyu Burger",
      restaurant: "Skylight Hotel",
      price: 650,
      image: cheeseBurgerImg,
      description: "Premium wagyu beef patty with special sauce."
    },
    {
      id: 33,
      name: "Lobster Burger",
      restaurant: "Skylight Hotel",
      price: 600,
      image: tunaBurgerImg,
      description: "Fresh lobster patty with premium ingredients."
    },
    {
      id: 34,
      name: "Gourmet Pizza",
      restaurant: "Skylight Hotel",
      price: 520,
      image: bigPizzaImg,
      description: "Artisanal pizza with premium ingredients."
    },
    {
      id: 35,
      name: "Truffle Pizza",
      restaurant: "Skylight Hotel",
      price: 580,
      image: pepperoniPizzaImg,
      description: "Pizza topped with truffle oil and premium cheeses."
    },
    {
      id: 36,
      name: "Seafood Pizza",
      restaurant: "Skylight Hotel",
      price: 600,
      image: stuffedCrustPizzaImg,
      description: "Pizza with fresh seafood and herbs."
    },
    {
      id: 37,
      name: "Foie Gras Pizza",
      restaurant: "Skylight Hotel",
      price: 650,
      image: greenPizzaImg,
      description: "Luxury pizza with foie gras and truffle."
    },
    {
      id: 38,
      name: "Caviar Pizza",
      restaurant: "Skylight Hotel",
      price: 700,
      image: stuffedCrustPizzaImg,
      description: "Premium pizza topped with caviar."
    },
    {
      id: 39,
      name: "Gold Leaf Burger",
      restaurant: "Skylight Hotel",
      price: 750,
      image: ultimateDoubleBurgerImg,
      description: "Luxury burger with edible gold leaf."
    },
    {
      id: 40,
      name: "Diamond Pizza",
      restaurant: "Skylight Hotel",
      price: 800,
      image: greenPizzaImg,
      description: "Exclusive pizza with diamond dust garnish."
    },
    // Fegegta Burger - Burgers, Pizza, Burritos & Sandwiches
    {
      id: 41,
      name: "Classic Burger",
      restaurant: "Fegegta Burger",
      price: 300,
      image: ultimateDoubleBurgerImg,
      description: "Juicy beef patty with lettuce, tomato, and special sauce."
    },
    {
      id: 42,
      name: "Cheese Burger",
      restaurant: "Fegegta Burger",
      price: 350,
      image: cheeseBurgerImg,
      description: "Classic burger with melted cheese."
    },
    {
      id: 43,
      name: "Chicken Burger",
      restaurant: "Fegegta Burger",
      price: 320,
      image: tunaBurgerImg,
      description: "Grilled chicken patty with fresh vegetables."
    },
    {
      id: 44,
      name: "Margherita Pizza",
      restaurant: "Fegegta Burger",
      price: 400,
      image: bigPizzaImg,
      description: "Classic pizza with tomato sauce, mozzarella, and fresh basil."
    },
    {
      id: 45,
      name: "Pepperoni Pizza",
      restaurant: "Fegegta Burger",
      price: 450,
      image: pepperoniPizzaImg,
      description: "Pizza topped with pepperoni, cheese, and Italian herbs."
    },
    {
      id: 46,
      name: "Beef Burrito",
      restaurant: "Fegegta Burger",
      price: 400,
      image: bigBorritoImg,
      description: "Large burrito filled with seasoned beef, rice, and beans."
    },
    {
      id: 47,
      name: "Chicken Burrito",
      restaurant: "Fegegta Burger",
      price: 380,
      image: normalBorritoImg,
      description: "Burrito with grilled chicken, salsa, and cheese."
    },
    {
      id: 48,
      name: "Club Sandwich",
      restaurant: "Fegegta Burger",
      price: 350,
      image: normalSandwichImg,
      description: "Triple decker sandwich with chicken, bacon, and veggies."
    },
    {
      id: 49,
      name: "Tuna Sandwich",
      restaurant: "Fegegta Burger",
      price: 280,
      image: tunaSandwichImg,
      description: "Tuna salad sandwich with fresh vegetables."
    },
    {
      id: 50,
      name: "Supreme Pizza",
      restaurant: "Fegegta Burger",
      price: 480,
      image: stuffedCrustPizzaImg,
      description: "Pizza with pepperoni, sausage, bell peppers, and onions."
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