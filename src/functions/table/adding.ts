import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Bson } from "../../../db.ts";
import { tables, tableSelectable, Table, RTable } from "../../schemas/table.ts";
import { throwError } from "../../utils/throwError.ts";
import { getTable } from "./funcs/getTable.ts";

const v = new FastestValidator();
const check = v.compile({
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        props: {
          tableCapacity: { type: "number" },
          reservable: { type: "boolean" },
        },
        get: {
          type: "object",
          optional: true,
          props: tableSelectable(1),
        },
      },
    },
  },
});

interface addingTableDetails {
  set: {
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
    set: { tableCapacity, reservable },
    get,
  } = details;
  const createdTable = await tables.insertOne({
    tableCapacity,
    reservable,
  });
  console.log(createdTable);
  const ob = new Bson.ObjectID(createdTable);
  return get ? getTable({ _id: ob, get }) : { _id: ob };
};
