import { Dish } from "./dish.ts";

interface MenuType {
  title: string;
  description: string;
  dishes: Dish[];
}

export interface Menu {
  name: string;
  subHeading: string;
  icon: File;
  description: string;
  menuType: MenuType[];
}
