import RestaurantCard from "./RestaurantCard";
import pizzaImg from "@/assets/pizza-restaurant.jpg";
import asianImg from "@/assets/asian-restaurant.jpg";
import burgerImg from "@/assets/burger-restaurant.jpg";

const RestaurantGrid = () => {
  const restaurants = [
    {
      id: 1,
      name: "Mario's Pizzeria",
      cuisine: "Italian",
      rating: 4.8,
      deliveryTime: "25-35 min",
      deliveryFee: 0,
      image: pizzaImg,
      description: "Authentic wood-fired pizzas made with fresh ingredients and traditional recipes."
    },
    {
      id: 2,
      name: "Tokyo Sushi Bar",
      cuisine: "Japanese",
      rating: 4.9,
      deliveryTime: "30-40 min",
      deliveryFee: 2.99,
      image: asianImg,
      description: "Fresh sushi, ramen, and Asian fusion dishes prepared by expert chefs."
    },
    {
      id: 3,
      name: "Burger Palace",
      cuisine: "American",
      rating: 4.7,
      deliveryTime: "20-30 min",
      deliveryFee: 0,
      image: burgerImg,
      description: "Gourmet burgers made with premium beef and fresh toppings."
    },
    {
      id: 4,
      name: "Spice Garden",
      cuisine: "Indian",
      rating: 4.6,
      deliveryTime: "35-45 min",
      deliveryFee: 1.99,
      image: pizzaImg, // Reusing for now
      description: "Authentic Indian curries, biryanis, and tandoor specialties."
    },
    {
      id: 5,
      name: "Taco Fiesta",
      cuisine: "Mexican",
      rating: 4.5,
      deliveryTime: "25-35 min",
      deliveryFee: 0,
      image: burgerImg, // Reusing for now
      description: "Fresh tacos, burritos, and Mexican street food favorites."
    },
    {
      id: 6,
      name: "Green Bowl",
      cuisine: "Healthy",
      rating: 4.8,
      deliveryTime: "20-30 min",
      deliveryFee: 2.49,
      image: asianImg, // Reusing for now
      description: "Fresh salads, smoothie bowls, and healthy meal options."
    }
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Popular Restaurants
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing restaurants near you and get your favorite meals 
            delivered fresh to your doorstep.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              name={restaurant.name}
              cuisine={restaurant.cuisine}
              rating={restaurant.rating}
              deliveryTime={restaurant.deliveryTime}
              deliveryFee={restaurant.deliveryFee}
              image={restaurant.image}
              description={restaurant.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantGrid;