import FoodHero from "@/components/FoodHero";
import RestaurantGrid from "@/components/RestaurantGrid";
import MapComponent from "@/components/MapComponent";
import OrderTracking from "@/components/OrderTracking";

const Index = () => {
  return (
    <div className="min-h-screen">
      <FoodHero />
      <RestaurantGrid />
      <MapComponent />
      <OrderTracking />
    </div>
  );
};

export default Index;
