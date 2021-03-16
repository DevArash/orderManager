import db from "../../db.ts";
import { Dish, dishSelectable, RDish } from "./dish.ts";
import { Rating } from "./rating.ts";
import { Base, RType, fieldType } from "./mod.ts";

export enum OrderStatus {
  InPreparation = "INPREPARATION",
  Delivered = "DELIVERED",
  Canceled = "CANCELED",
}

export enum OrderType {
  Table = "TABLE",
  Takeout = "TAKEOUT",
}
export interface PuOrder extends Base {
  orderRating: Rating;
  orderStatus: OrderStatus;
  totalPrice: number;
  orderType: OrderType;
  preprationTime?: Date;
  customerPhoneNumber: number;
}

export interface EmOrder {
  dishes: Dish[];
}

export interface InRelOrder {
  dishes: Dish[];
}

export interface OutRelOrder {}

export interface Order extends PuOrder, EmOrder {}

export interface ROrder {
  _id: RType;
  orderRating: RType;
  orderStatus: RType;
  totalPrice: RType;
  orderType: RType;
  preprationTime: RType;
  customerPhoneNumber: RType;
  dish: RDish;
}

export const orderSelectable = (depth: number = 4) => {
  depth--;
  const returnObj = {
    _id: fieldType,
    orderRating: fieldType,
    orderStatus: fieldType,
    totalPrice: fieldType,
    orderType: fieldType,
    preprationTime: fieldType,
    customerPhoneNumber: fieldType,
  };
  return depth > 0
    ? {
        ...returnObj,
        dish: {
          type: "object",
          optional: true,
          props: dishSelectable(depth),
        },
      }
    : returnObj;
};

export const orders = db.collection<Order>("Orders");
