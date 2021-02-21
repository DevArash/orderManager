import { Dish } from "./dish.ts";
import { Base } from "../schemas/utils/bases/base.ts";
import { Bson } from "../../db.ts";

interface PuOrder {
  orderID: Bson.ObjectId;
  orderRating: Rating;
  orderStatus: OrderStatus;
  totalPrice: number;
  orderType: OrderType;
  preprationTime?: Date;
  customerPhoneNumber: number;
}

interface Rating {
  rateNumber: number;
  rateDescribtion: string;
}

enum OrderStatus {
  InPreparation = "INPREPARATION",
  Delivered = "DELIVERED",
  Canceled = "CANCELED",
}

enum OrderType {
  Table = "TABLE",
  Takeout = "TAKEOUT",
}

export interface EmOrder {
  dishes: Dish[];
}

export interface InRelOrder {
  dishes: Dish[];
}

export interface OutRelOrder {}

export interface Order extends PuOrder, EmOrder, Base {}
