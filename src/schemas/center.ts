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
  PuUser,
  RUser,
  userSelectable,
  PuCountry,
  PuCity,
  PuParish,
  PuState,
  RCity,
  RCountry,
  RParish,
  RState,
} from "./mod.ts";

export interface Certificate {
  title: string;
  issuedAt: any;
  expiryDate: any;
  issuedBy: string;
}

export interface PuCenter extends Base {
  name: string;
  phone?: number;
  certificate: Certificate[];
  //activeHours:[open, close, title (like mornning or breakfast)]
  activeHours: [number, number, string?][];
}

export interface EmCenter {
  menus: PuMenu[];
  user: PuUser[];
  tables: PuTable[];
  address: {
    country: PuCountry;
    state: PuState;
    City: PuCity;
    Parish: PuParish;
  };
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

export interface RAddress {
  country: RCountry;
  state: RState;
  City: RCity;
  Parish: RParish;
}

export const addressSelectable: any = (depth: number = 4) => {
  depth--;
  const returnObj = {
    country: fieldType,
    state: fieldType,
    city: fieldType,
    parish: fieldType,
  };
  return returnObj;
};

export interface RCenter {
  _id: RType;
  name: RType;
  phone: RType;
  certificate: RType;
  activeHours: RType;
  menus: RMenu;
  tables: RTable;
  user: RType;
  address: RAddress;
}

export const centerSelectable = (depth: number = 4): any => {
  depth--;
  const returnObj = {
    _id: fieldType,
    name: fieldType,
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
        user: {
          type: "object",
          optional: true,
          props: userSelectable(depth),
        },
        address: {
          type: "object",
          optional: true,
          props: addressSelectable(depth),
        },
      }
    : returnObj;
};

export const centers = db.collection<Center>("Centers");
