import { Bson } from "../../../../db.ts";
import { fieldType } from "../fieldType.ts";

export interface Base {
  _id: Bson.ObjectID;
  createdAt: Date;
  updatedAt: Date;
}

export interface RBase {
  _id: 0 | 1;
  createdAt: 0 | 1;
  updatedAt: 0 | 1;
}

export const baseSelectable = (depth: number = 4) => {
  const returnObj = {
    _id: fieldType,
    createdAt: fieldType,
    updatedAt: fieldType,
  };
};
