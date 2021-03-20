import { getOrder } from "../mod.ts";
import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/mod.ts";
import { Context } from "../utils/context.ts";
import { orders, dishes } from "./../../schemas/mod.ts";
import { checkDeleteOrder, DeleteOrderDetails } from "./deleteOrder.type.ts";

const deleteOrder = async (_id: string) => {
  const deletedOrder = await orders.findOne({
    _id: new Bson.ObjectID(_id),
  });
  // step1: delete the Dishes of this Order,
  const a = await dishes.deleteMany({
    "order._id": deletedOrder!._id,
  });
  //step 2: delete the Order itself
  await orders.deleteOne({ _id: new Bson.ObjectID(_id) });
  return deletedOrder;
};

type DeleteOrder = (details: DeleteOrderDetails, context?: Context) => any;

/**
 * @function
 * Represent delete blogTag(delete the desired blogTag from DB)
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
  return details.get
    ? getOrder({ _id: objId, get: details.get })
    : deleteOrder(_id);
};
