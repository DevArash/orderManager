import { getTable } from "../mod.ts";
import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/mod.ts";
import { Context } from "../utils/context.ts";
import { tables, centers } from "./../../schemas/mod.ts";
import { checkDeleteTable, DeleteTableDetails } from "./deleteTable.type.ts";

const deleteTable = async (_id: string) => {
  const deletedTable = await tables.findOne({
    _id: new Bson.ObjectID(_id),
  });
  // step1: delete the Center of this Table,
  const a = await centers.deleteMany({
    "table._id": deletedTable!._id,
  });

  //step 2: delete the Table itself
  await tables.deleteOne({ _id: new Bson.ObjectID(_id) });
  return deletedTable;
};

type DeleteTable = (details: DeleteTableDetails, context?: Context) => any;

/**
 * @function
 * Represent delete blogTag(delete the desired blogTag from DB)
 * @param details
 * @param context
 */
export const deleteTableFn: DeleteTable = async (details, context) => {
  const detailsIsRight = checkDeleteTable({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id },
    get: {},
  } = details;
  const objId = new Bson.ObjectID(_id);
  return details.get
    ? getTable({ _id: objId, get: details.get })
    : deleteTable(_id);
};
