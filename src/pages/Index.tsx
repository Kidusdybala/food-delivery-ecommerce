import { useState } from "react";
import FoodHeader from "@/components/FoodHeader";
import FoodHero from "@/components/FoodHero";
import FoodGrid from "@/components/RestaurantGrid";
import MapComponent from "@/components/MapComponent";
import OrderTracking from "@/components/OrderTracking";

const Index = () => {
  const [filter, setFilter] = useState<string>('all');

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <div className="min-h-screen">
      <FoodHeader onFilterChange={handleFilterChange} />
      <FoodHero />
      <FoodGrid filter={filter} />
      <MapComponent />
      <OrderTracking />
    </div>
  );
};

export default Index;
