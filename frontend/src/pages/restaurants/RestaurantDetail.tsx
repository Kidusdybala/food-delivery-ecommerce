import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FoodHeader from "../home/FoodHeader";
import axios from "axios";
import { Plus, Minus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

const RestaurantDetail = () => {
  const { name } = useParams<{ name: string }>();
  const [foods, setFoods] = useState([]);
  const [restaurant, setRestaurant] = useState<any>(null);
  const { addToCart, items } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodsResponse = await axios.get('http://localhost:8000/api/foods');
        const allFoods = foodsResponse.data;
        const filteredFoods = allFoods.filter((food: any) => food.restaurant === name);

        setFoods(filteredFoods);

        // Set restaurant info
        if (filteredFoods.length > 0) {
          let restaurantImage = '/food%20and%20drinks/restorants/simple.jpg'; // default
          if (name === 'Hilton') restaurantImage = '/food%20and%20drinks/restorants/hilton.webp';
          else if (name === 'Simple Bistro') restaurantImage = '/food%20and%20drinks/cheese%20burger.jpg';
          else if (name === 'Amrogn Chicken') restaurantImage = '/food%20and%20drinks/restorants/amrogn%20chiken.png';
          else if (name === 'Dereje Kurt bet') restaurantImage = '/food%20and%20drinks/restorants/dereje%20kurt.jpg';
          else if (name === 'Fegegta') restaurantImage = '/food%20and%20drinks/restorants/fegegta%20burger.jpg';

          setRestaurant({
            name: name,
            image: restaurantImage,
            description: `${filteredFoods.length} delicious items available`,
            rating: 4.5,
            deliveryTime: '20-30 min',
            deliveryFee: 0
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [name]);


  if (!restaurant) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading restaurant menu...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <FoodHeader />
      <div className="container mx-auto px-4 py-8">
        {/* Restaurant Header */}
        <div className="relative overflow-hidden rounded-lg mb-8">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-foreground">
            <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">{restaurant.name}</h1>
            <p className="text-lg opacity-90 drop-shadow-md">{restaurant.description}</p>
            <div className="flex items-center gap-4 mt-4">
              <span className="flex items-center gap-1 drop-shadow-md">
                ⭐ {restaurant.rating}
              </span>
              <span className="flex items-center gap-1 drop-shadow-md">
                🕒 {restaurant.deliveryTime}
              </span>
              <span className="flex items-center gap-1 drop-shadow-md">
                🚚 {restaurant.deliveryFee === 0 ? 'Free delivery' : `${restaurant.deliveryFee} ETB`}
              </span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {foods.map((food: any) => {
              const cartItem = items.find(item => item.id === food.id);
              const quantity = cartItem?.quantity || 0;
              return (
                <div key={food.id} className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 border">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-card-foreground">{food.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{food.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-primary">{food.price} ETB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToCart({ id: food.id, name: food.name, price: food.price, image: food.image, quantity: -1 })}
                          disabled={quantity === 0}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium min-w-[20px] text-center text-foreground">{quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToCart({ id: food.id, name: food.name, price: food.price, image: food.image, quantity: 1 })}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        disabled={quantity === 0}
                        className="text-xs"
                        onClick={() => toast.success(`${food.name} (${quantity}) added to cart!`)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RestaurantDetail;