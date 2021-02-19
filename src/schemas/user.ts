import db, { Bson } from "../../db.ts";
import { fieldType } from "./mod.ts";

export interface User {
  _id: Bson.ObjectId;
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
}

export interface RUser {
  _id: 0 | 1;
  firstname: 0 | 1;
  lastname: 0 | 1;
  phone: 0 | 1;
  email: 0 | 1;
}

export const userSelectable = (depth: number = 4) => {
  depth--;
  const returnObj = {
    _id: fieldType,
    firstname: fieldType,
    lastname: fieldType,
    phone: fieldType,
    email: fieldType,
  };
  return depth > 0
    ? {
        ...returnObj,
      }
    : returnObj;
};
