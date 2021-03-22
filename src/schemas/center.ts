import db from "../../db.ts";
import {
  Base,
  RType,
  fieldType,
  PuOrder,
  PuMenu,
  RMenu,
  menuSelectable,
  PuTable,
  RTable,
  tableSelectable,
} from "./mod.ts";

export interface Certificate {
  title: string;
  issuedAt: Date;
  expiryDate: Date;
  issuedBy: string;
}

export interface Owner {
  name: string;
  phone: number;
}

export interface Address {
  state: string;
  city: string;
  mainStreet: string;
  houseNumber: number;
  postalCode: number;
}

export interface PuCenter extends Base {
  name: string;
  owner: Owner;
  address: Address;
  phone?: number;
  certificate: Certificate[];
  //activeHours:[open, close, title (like mornning or breakfast)]
  activeHours: [number, number, string?][];
}

export interface EmCenter {
  menus: PuMenu[];
  tables: PuTable[];
}

export interface InRelCenter {
  menus: PuMenu[];
  tables: PuTable[];
}

export interface OutRelCenter {
  orders: PuOrder[];
}

/**@interface
 * this is the main interface and the collection in mongoDB is based on this collection
 */

export interface Center extends EmCenter, PuCenter {}

export interface RCenter {
  _id: RType;
  name: RType;
  owner: RType;
  address: RType;
  phone: RType;
  certificate: RType;
  activeHours: RType;
  menus: RMenu;
  tables: RTable;
}

export const centerSelectable = (depth: number = 4): any => {
  depth--;
  const returnObj = {
    _id: fieldType,
    name: fieldType,
    owner: fieldType,
    address: fieldType,
    phone: fieldType,
    certificate: fieldType,
    acticveHours: fieldType,
  };
  return depth > 0
    ? {
        ...returnObj,
        menu: {
          type: "object",
          optional: true,
          props: menuSelectable(depth),
        },
        table: {
          type: "object",
          optional: true,
          props: tableSelectable(depth),
        },
      }
    : returnObj;
};

export const centers = db.collection<Center>("Centers");
