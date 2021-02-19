import { Base } from "../../schemas/utils/bases/base.ts";
import { Dish } from "./dish.ts";

interface PuOrder {
  orderID: Bson.ObjectId;
  //servedAt: string => why?
  noOfCustomers: number;
  orderRating: Rating;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  totalPrice: number;
  orderType: OrderType;
  preprationTime?: Date;
  // customerPhoneNumber: number;
}

interface Rating {
  rateNumber: number;
  rateDescribtion: string;
}

enum PaymentStatus {
  Paid = "PAID",
  NotPaid = "NOTPAID",
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
