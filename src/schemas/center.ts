import db from "../../db.ts";
import { Menu } from "./menu.ts";
import { Order } from "./order.ts";
import { Table, tableSelectable } from "./table.ts";
import { Base } from "../schemas/utils/bases/base.ts";
import { fieldType } from "../schemas/utils/fieldType.ts";

interface Certificate {
  title: string;
  issuedAt: string;
  expiryDate: string;
  issuedBy: string;
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
  activeHours: { open: string; close: string };
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
    state: 0 | 1;
    city: 0 | 1;
    mainStreet: 0 | 1;
    houseNumber: 0 | 1;
    postalCode: 0 | 1;
  };
  phone: 0 | 1;
  certificate: 0 | 1;
  activeHours: {
    open: 0 | 1;
    close: 0 | 1;
  };
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
      state: fieldType,
      city: fieldType,
      mainStreet: fieldType,
      houseNumber: fieldType,
      postalCode: fieldType,
    },
    phone: fieldType,
    certificate: fieldType,
    acticveHours: {
      open: fieldType,
      close: fieldType,
    },
  };
  return depth > 0
    ? {
        ...returnObj,
        city: {
          type: "object",
          optional: true,
          props: menuSelectable(depth),
        },
        state: {
          type: "object",
          optional: true,
          props: tableSelectable(depth),
        },
      }
    : returnObj;
};

export const centers = db.collection<Center>("Centers");
