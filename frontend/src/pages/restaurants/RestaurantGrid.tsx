import RestaurantCard from "./RestaurantCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

interface FoodGridProps {
  filter?: string;
}

const FoodGrid = ({ filter = 'all' }: FoodGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/foods');
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };
    fetchFoods();
  }, []);

  // Get unique restaurants
  const restaurants = Array.from(new Set(foods.map(food => food.restaurant))).map(restaurantName => {
    const restaurantFoods = foods.filter(food => food.restaurant === restaurantName);
    let restaurantImage = '/food%20and%20drinks/restorants/simple.jpg'; // default
    if (restaurantName === 'Hilton') restaurantImage = '/food%20and%20drinks/restorants/hilton.webp';
    else if (restaurantName === 'Simple Bistro') restaurantImage = '/food%20and%20drinks/cheese%20burger.jpg';
    else if (restaurantName === 'Amrogn Chicken') restaurantImage = '/food%20and%20drinks/restorants/amrogn%20chiken.png';
    else if (restaurantName === 'Dereje Kurt bet') restaurantImage = '/food%20and%20drinks/restorants/dereje%20kurt.jpg';
    else if (restaurantName === 'Fegegta') restaurantImage = '/food%20and%20drinks/restorants/fegegta%20burger.jpg';
    return {
      name: restaurantName,
      cuisine: 'Various',
      rating: 4.5,
      deliveryTime: '20-30 min',
      deliveryFee: 0,
      image: restaurantImage,
      description: `${restaurantFoods.length} delicious items available`,
      foods: restaurantFoods
    };
  });

  const filteredFoods = foods.filter(food => {
    // Search filter
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          food.restaurant.toLowerCase().includes(searchTerm.toLowerCase());

    // Navbar filter
    let matchesFilter = true;
    if (filter === 'deals') {
      // Show foods under 300 ETB as deals
      matchesFilter = food.price < 300;
    }

    return matchesSearch && matchesFilter;
  });

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isRestaurantView = filter === 'restaurants';

  return (
    <section className="py-20 bg-muted/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {isRestaurantView ? 'Popular Restaurants' : 'Popular Foods'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {isRestaurantView
              ? 'Discover amazing restaurants in Addis Ababa and explore their menus.'
              : 'Discover delicious foods from restaurants in Addis Ababa and get them delivered fresh to your doorstep.'
            }
          </p>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder={`Search for ${isRestaurantView ? 'restaurants' : 'foods or restaurants'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isRestaurantView ? (
            filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.name}
                name={restaurant.name}
                cuisine={restaurant.cuisine}
                rating={restaurant.rating}
                deliveryTime={restaurant.deliveryTime}
                deliveryFee={restaurant.deliveryFee}
                image={restaurant.image}
                description={restaurant.description}
                price={0} // Not applicable for restaurants
                foods={restaurant.foods}
              />
            ))
          ) : (
            filteredFoods.map((food) => (
              <RestaurantCard
                key={food.id}
                name={food.name}
                cuisine={food.restaurant}
                rating={4.5} // Placeholder
                deliveryTime="20-30 min" // Placeholder
                deliveryFee={0} // Placeholder
                image={food.image}
                description={food.description}
                price={food.price}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FoodGrid;