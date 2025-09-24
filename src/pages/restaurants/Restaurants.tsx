import { useState } from "react";
import FoodHeader from "../home/FoodHeader";
import FoodGrid from "./RestaurantGrid";

const Restaurants = () => {
  const [filter, setFilter] = useState<string>('restaurants');

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <div className="min-h-screen">
      <FoodHeader />
      <FoodGrid filter={filter} />
    </div>
  );
};

export default Restaurants;