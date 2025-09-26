import { hiltonFoods } from "./hiltonFoods";
import { simpleBistroFoods } from "./simpleBistroFoods";
import { amrognChickenFoods } from "./amrognChickenFoods";
import { Dereje Kurt betFoods } from "./Dereje Kurt betFoods";
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
  ...Dereje Kurt betFoods,
  ...fegegtaFoods
];