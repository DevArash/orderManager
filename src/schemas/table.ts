import db from "../../db.ts";
import { Base } from "../schemas/utils/bases/base.ts";
import { fieldType } from "../schemas/utils/fieldType.ts";
import { Center, PuCenter, centerSelectable } from "./center.ts";

export interface PuTable {
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

export interface Table extends PuTable, EmTable, Base {}

export const tableSelectable = (depth: number = 4): any => {
  depth--;
  const returnObj = {
    ...baseSelectableFields(),
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

export const tables = db.collection<Table>("tables");
