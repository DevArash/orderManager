import { fieldType } from "../../schemas/utils/fieldType.ts";
import { Base } from "../../schemas/utils/bases/base.ts";
import { Order } from "./order.ts";
import { Table, tableSelectable } from "./table.ts";
import { Menu } from "./menu.ts";

enum ServeStyle {
  Traditional = "Traditional",
  Modern = "Modern",
}

interface Certificate {
  title: string;
  issuedAt: string;
  expiryDate: string;
  issuedBy: string;
}

enum ReservationOption {
  Takeout,
  FullReservation,
  SemiReservation,
}

export interface PuCenter {
  name: string;
  owner: {
    name: string;
    phone: number;
  };
  address: {
    state: string;
    city: string;
    mainStreet: string;
    houseNumber: number;
    postalCode: number;
  };
  phone: number;
  certificate: Certificate[];
  //activeHours: {open: string; close: string}
  reservationOption: ReservationOption[];
  servingStyle: ServeStyle;
}

export interface EmCenter {
  menus: Menu[];
  tables: Table[];
}

export interface InRelCenter {
  menus: Menu[];
  tables: Table[];
}

export interface OutRelCenter {
  orders: Order[];
}

/**@interface
 * this is the main interface and the collection in mongoDB is based on this collection
 */
export interface Center extends EmCenter, PuCenter, Base {}

export interface RCenter {
  _id: 0 | 1;
  name: 0 | 1;
  owner: {
    name: 0 | 1;
    phone: 0 | 1;
  };
  address: {
    city: 0 | 1;
    mainStreet: 0 | 1;
    houseNumber: 0 | 1;
    postalCode: 0 | 1;
  };
  phone: 0 | 1;
  certificate: {
    issuedAt: 0 | 1;
    expiryDate: 0 | 1;
    issuedBy: 0 | 1;
  };
  reservationOption: 0 | 1;
  servingStyle: 0 | 1;
}

export const centerSelectable = (depth: number = 4) => {
  depth--;
  const returnObj = {
    _id: fieldType,
    name: fieldType,
    owner: {
      name: fieldType,
      phone: fieldType,
    },
    address: {
      city: fieldType,
      mainStreet: fieldType,
      houseNumber: fieldType,
      postalCode: fieldType,
    },
    phone: fieldType,
    certificate: {
      issuedAt: fieldType,
      expiryDate: fieldType,
      issuedBy: fieldType,
    },
    reservationOption: fieldType,
    servingStyle: fieldType,
  };
  return depth > 0
    ? {
        ...returnObj,
        state: {
          type: "object",
          optional: true,
          props: menuSelectable(depth),
        },
        country: {
          type: "object",
          optional: true,
          props: tableSelectable(depth),
        },
      }
    : returnObj;
};

export const centers = db.collection<Center>("Centers");
