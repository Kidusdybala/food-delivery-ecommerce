import { useState } from "react";
import FoodHeader from "../home/FoodHeader";
import FoodHero from "../home/FoodHero";
import FoodGrid from "../restaurants/RestaurantGrid";

const Foods = () => {
  const [filter, setFilter] = useState<string>('all');

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <div className="min-h-screen">
      <FoodHeader />
      <FoodHero />
      <FoodGrid filter={filter} />
    </div>
  );
};

export default Foods;