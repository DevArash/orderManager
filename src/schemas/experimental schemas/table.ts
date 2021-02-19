import { fieldType } from "../../schemas/utils/fieldType.ts";
import { Base } from "../../schemas/utils/bases/base.ts";
import { Center, PuCenter } from "./center.ts";

export interface PuTable {
  tableCapacity: number;
  reservable: boolean;
  section?: Section;
}

export interface EmTable {
  center: PuCenter;
  reservations: Reservation[];
}

export interface InRelTable {
  center: Center;
  reservations: Reservation[];
}

export interface OutRelTable {}

export interface RTable extends RBase {
  name: RType;
  brand: RType;
}

export interface Table extends PuTable, EmTable, Base {}

enum Section {
  Family = "Family",
  Normal = "Normal",
}

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
        reservation: {
          type: "object",
          optional: true,
          props: reservationSelectable(depth),
        },
      }
    : returnObj;
};

export const tables = db.collection<Table>("tables");
