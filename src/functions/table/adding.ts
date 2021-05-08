import { getTable } from "../mod.ts";
import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/mod.ts";
import FastestValidator from "https://esm.sh/fastest-validator@1";
import { tables, Table, RTable, Reserve } from "../../schemas/mod.ts";

const v = new FastestValidator();
const check = v.compile({
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        props: {
          tableNo: { type: "number" },
          tableCapacity: { type: "number" },
          reserve: {
            type: "object",
            props: {
              reservable: "boolean",
              reservedBy: "string",
            },
          },
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
    reserve: Reserve;
  };
  get: RTable;
}

type AddingTable = (details: addingTableDetails) => Promise<Partial<Table>>;

export const addingTable: AddingTable = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { tableNo, tableCapacity, reserve },
    get,
  } = details;
  const createdTable = await tables.insertOne({
    tableNo,
    tableCapacity,
    reserve,
  });
  console.log(createdTable);
  const ob = new Bson.ObjectID(createdTable);
  return get ? getTable({ _id: ob, get }) : { _id: ob };
};
