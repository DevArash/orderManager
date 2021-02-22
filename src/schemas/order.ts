import { Dish } from "./dish.ts";
import { Rating } from "./rating.ts";
import db, { Bson } from "../../db.ts";
import { Base } from "../schemas/utils/bases/base.ts";

export interface PuOrder extends Base {
  orderID: Bson.ObjectId;
  orderRating: Rating;
  orderStatus: OrderStatus;
  totalPrice: number;
  orderType: OrderType;
  preprationTime?: Date;
  customerPhoneNumber: number;
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

export interface Order extends PuOrder, EmOrder {}

export const centers = db.collection<Order>("Orders");
