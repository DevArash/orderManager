import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/throwError.ts";
import { Context } from "../utils/context.ts";
import { orders, dishes } from "./../../schemas/mod.ts";
import { getOrder } from "./sharedFuncs/mod.ts";
import { checkUpdateOrder, UpdateOrderDetails } from "./updateOrder.type.ts";

type UpdateOrder = (details: UpdateOrderDetails, context?: Context) => any;

/**
 * Represent updateOrder (update Order on db)
 * @function
 * @param details
 * @param context
 */
export const updateOrder: UpdateOrder = async (details, context) => {
  // TODO:authentication should be done

  const detailsIsRight = checkUpdateOrder({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { id, orderStatus },
    get,
  } = details;

  await orders.updateOne(
    { _id: new Bson.ObjectID(id) },
    {
      $set: {
        id,
        orderStatus,
      },
    }
  );

  const foundNewOrder = await orders.findOne({
    _id: new Bson.ObjectID(id),
  });

  await dishes.updateMany(
    { "order._id": new Bson.ObjectID(id) },
    { $set: { order: foundNewOrder } }
  );

  return get ? getOrder({ _id: foundNewOrder!._id, get }) : foundNewOrder;
};
