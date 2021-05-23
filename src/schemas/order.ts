import db from "../../db.ts";
import { Base, RType, fieldType, Dish, dishSelectable, RDish } from "./mod.ts";

export enum OrderLable {
  InPreparation = "INPREPARATION",
  Delivered = "DELIVERED",
  Canceled = "CANCELED",
  SeenByOperator = "SEENBYOPETOR",
  SeenByChef = "SEENBYCHEF",
}

export interface OrderStatus {
  orderLable: OrderLable;
  time: Date;
}

export interface PuOrder extends Base {
  id: string;
  orderStatus: OrderStatus;
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
  id: RType;
  orderStatus: RType;
  dish: RDish;
}

export const orderSelectable = (depth: number = 4) => {
  depth--;
  const returnObj = {
    id: fieldType,
    orderStatus: fieldType,
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
