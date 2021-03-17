import FastestValidator from "https://esm.sh/fastest-validator@1";
import { Bson } from "../../../db.ts";
import { getTable } from "../mod.ts";
import { throwError } from "../../utils/mod.ts";
import { tables, tableSelectable, Table, RTable } from "../../schemas/mod.ts";

const v = new FastestValidator();
const check = v.compile({
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        props: {
          tableNo: { type: "number", optional: true },
          tableCapacity: { type: "number" },
          reservable: { type: "boolean" },
        },
        /*         get: {
          //When Comment Work
          type: "object",
          optional: true,
          props: tableSelectable(1),
        }, */
      },
    },
  },
});

interface addingTableDetails {
  set: {
    tableNo?: number;
    tableCapacity: number;
    reservable: boolean;
  };
  get: RTable;
}

type AddingTable = (details: addingTableDetails) => Promise<Partial<Table>>;

export const addingTable: AddingTable = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { tableNo, tableCapacity, reservable },
    get,
  } = details;
  const createdTable = await tables.insertOne({
    tableNo,
    tableCapacity,
    reservable,
  });
  console.log(createdTable);
  const ob = new Bson.ObjectID(createdTable);
  return get ? getTable({ _id: ob, get }) : { _id: ob };
};
