import db from "../../db.ts";
import {
  Base,
  RBase,
  RType,
  fieldType,
  PuCenter,
  centerSelectable,
  RCenter,
} from "./mod.ts";

export interface Reserve {
  reservable: boolean;
  reservedBy: string;
}

export enum Situation {
  Active = "Active",
  DeActive = "DeActive",
  Reserved = "Reserved",
  Empty = "Empty",
  Using = "Using",
}

export interface PuTable extends Base {
  tableNo: number;
  tableCapacity: number;
  reserve: Reserve;
  situation: Situation;
}

export interface EmTable {
  center: PuCenter;
}

// export interface InRelTable {}

// export interface OutRelTable {}

export interface RTable extends RBase {
  _id: RType;
  tableNo: RType;
  tableCapacity: RType;
  reserve: RType;
  situation: RType;
  centers: RCenter;
}

export interface Table extends PuTable, EmTable {}

export const tableSelectable = (depth: number = 4): any => {
  depth--;
  const returnObj = {
    _id: fieldType,
    tableNo: fieldType,
    tableCapacity: fieldType,
    reserve: fieldType,
    situation: fieldType,
  };
  return depth > 0
    ? {
        ...returnObj,

        center: {
          type: "object",
          optional: true,
          props: centerSelectable(depth),
        },
      }
    : returnObj;
};

export const tables = db.collection<Table>("Tables");
