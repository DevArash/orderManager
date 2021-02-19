import { MenuType } from "./menuType.ts";

export interface Menu {
  name: string;
  subHeading: string;
  icon: File;
  description: string;
  menuType: MenuType[];
}
