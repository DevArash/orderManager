import { getOrder } from "../mod.ts";
import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/mod.ts";
import { Context } from "../utils/context.ts";
import { orders, dishes } from "./../../schemas/mod.ts";
import { checkDeleteOrder, DeleteOrderDetails } from "./deleteOrder.type.ts";

type DeleteOrder = (details: DeleteOrderDetails, context?: Context) => any;

const deleteOrder = async (_id: Bson.ObjectID) => {
  const deletedOrder = await orders.findOne({
    _id,
  });
  // step1: delete the Dishes of this Order,
  const a = await dishes.deleteMany({
    "order._id": deletedOrder!._id,
  });
  //step 2: delete the Order itself
  await orders.deleteOne({ _id });
  return deletedOrder;
};

/**
 * @function
 * @param details
 * @param context
 */
export const deleteOrderFn: DeleteOrder = async (details, context) => {
  const detailsIsRight = checkDeleteOrder({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id },
    get: {},
  } = details;
  const objId = new Bson.ObjectID(_id);
  return deleteOrder(objId);
};
