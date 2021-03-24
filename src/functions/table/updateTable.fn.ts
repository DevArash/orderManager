import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/throwError.ts";
import { Context } from "../utils/context.ts";
import { tables, centers } from "./../../schemas/mod.ts";
import { getTable } from "./sharedFuncs/mod.ts";
import { checkUpdateTable, UpdateTableDetails } from "./updateTable.type.ts";

type UpdateTable = (details: UpdateTableDetails, context?: Context) => any;

/**
 * Represent updateTable (update Table on db)
 * @function
 * @param details
 * @param context
 */
export const updateTable: UpdateTable = async (details, context) => {
  // TODO:authentication should be done

  const detailsIsRight = checkUpdateTable({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id, tableNo, tableCapacity, reservable },
    get,
  } = details;

  await tables.updateOne(
    { _id: new Bson.ObjectID(_id) },
    { $set: { tableNo, tableCapacity, reservable } }
  );

  const foundNewTable = await tables.findOne({
    _id: new Bson.ObjectID(_id),
  });

  //2 update Table in Center collection
  await centers.updateMany(
    { "table._id": new Bson.ObjectID(_id) },
    { $set: { table: foundNewTable } }
  );

  return get ? getTable({ _id: foundNewTable!._id, get }) : foundNewTable;
};
