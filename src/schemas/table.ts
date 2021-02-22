import db from "../../db.ts";
import { RType } from "../schemas/utils/rType.ts";
import { Base, RBase } from "../schemas/utils/bases/base.ts";
import { fieldType } from "../schemas/utils/fieldType.ts";
import { Center, PuCenter, centerSelectable } from "./center.ts";

export interface PuTable extends Base {
  tableCapacity: number;
  reservable: boolean;
}

export interface EmTable {
  center: PuCenter;
}

export interface InRelTable {
  center: Center;
}

export interface OutRelTable {}

export interface RTable extends RBase {
  name: RType;
  brand: RType;
}

export interface Table extends PuTable, EmTable {}

export const tableSelectable = (depth: number = 4): any => {
  depth--;
  const returnObj = {
    ...tableSelectable(),
    tableCapacity: fieldType,
    reservable: fieldType,
    section: fieldType,
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
