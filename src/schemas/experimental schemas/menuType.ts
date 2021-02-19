import { Dish } from "./dish.ts";

export interface MenuType {
  title: string;
  description: string;
  dishes: Dish[];
}
