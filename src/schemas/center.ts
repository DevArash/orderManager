import db, { Bson } from "../../db.ts";
import { fieldType } from "./utils/fieldType.ts";
import { User, RUser, userSelectable } from "./user.ts";

export interface Center {
  _id: Bson.ObjectID;
  name: string;
  owner: User;
  address: Address;
  phone: number;
  servingStyle: ServeStyle;
}

interface Address {
  city: string;
  mainStreet: string;
  houseNumber: number;
  postalCode: number;
}

enum ServeStyle {
  Traditional = "Traditional",
  Modern = "Modern",
}

export interface RCenter {
  _id: 0 | 1;
  name: 0 | 1;
  owner: RUser;
  address: 0 | 1;
  phone: 0 | 1;
  servingStyle: 0 | 1;
}

export const centerSelectable = (depth: number = 4) => {
  depth--;
  const returnObj = {
    _id: fieldType,
    name: fieldType,
    address: fieldType,
    phone: fieldType,
    servingStyle: fieldType,
  };
  return depth > 0
    ? {
        ...returnObj,
        owner: {
          type: "object",
          optional: true,
          props: userSelectable(depth),
        },
      }
    : returnObj;
};

export const centerCollection = db.collection<Center>("Center");
