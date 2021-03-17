import { Bson } from "../../../../db.ts";
import { orders, Order, ROrder } from "../../../schemas/order.ts";
import { makeLookUp } from "../../../utils/makeLookUp.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";
import { getDishes } from "../../dish/sharedFuncs/getDishes.ts";

type GetOrdersInput = { filter: Bson.Document; getObj: ROrder };
type GetOrdersFn = ({ filter, getObj }: GetOrdersInput) => Promise<Order[]>;
export const getOrders: GetOrdersFn = async ({ filter, getObj }) => {
  const projection = makeProjections(getObj, [], ["dishes"]);
  const foundedOrders = await orders.find(filter, { projection });
  let returnOrders = await foundedOrders.toArray();
  if (getObj.dish)
    returnOrders = await makeLookUp(
      returnOrders,
      getDishes,
      "dishes",
      getObj.dish
    );
  return returnOrders;
};
