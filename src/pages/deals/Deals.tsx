import { useState } from "react";
import FoodHeader from "../home/FoodHeader";
import FoodGrid from "../restaurants/RestaurantGrid";

const Deals = () => {
  const [filter, setFilter] = useState<string>('deals');

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

export default Deals;