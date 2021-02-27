import db from "../../db.ts";
import { PuOrder } from "./order.ts";
import { RType } from "./utils/rType.ts";
import { menuSelectable, PuMenu, RMenu } from "./menu.ts";
import { PuTable, RTable, tableSelectable } from "./table.ts";
import { Base } from "../schemas/utils/bases/base.ts";
import { fieldType } from "../schemas/utils/fieldType.ts";

export interface Certificate {
  title: string;
  issuedAt: string;
  expiryDate: string;
  issuedBy: string;
}

export interface ActiveHours {
  title?: string;
  open: number;
  close: number;
}

export interface PuCenter extends Base {
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
  activeHours: ActiveHours[];
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
  owner: {
    name: RType;
    phone: RType;
  };
  address: {
    state: RType;
    city: RType;
    mainStreet: RType;
    houseNumber: RType;
    postalCode: RType;
  };
  phone: RType;
  certificate: RType;
  activeHours: RType;
  menus: RMenu;
  tables: RTable;
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
