import { Dish } from "./dish.ts";
import { MenuType } from "./menuType.ts";

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
