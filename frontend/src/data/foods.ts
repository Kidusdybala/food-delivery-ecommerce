import { hiltonFoods } from "./hiltonFoods";
import { simpleBistroFoods } from "./simpleBistroFoods";
import { amrognChickenFoods } from "./amrognChickenFoods";
import { skylightFoods } from "./skylightFoods";
import { fegegtaFoods } from "./fegegtaFoods";

export interface Food {
  id: number;
  name: string;
  restaurant: string;
  price: number;
  image: string;
  description: string;
}

export const foods: Food[] = [
  ...hiltonFoods,
  ...simpleBistroFoods,
  ...amrognChickenFoods,
  ...skylightFoods,
  ...fegegtaFoods
];