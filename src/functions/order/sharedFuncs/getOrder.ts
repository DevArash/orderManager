import { Bson } from "../../../../db.ts";
import { orders, Order, ROrder } from "../../../schemas/order.ts";
import { throwError } from "../../../utils/mod.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";

type GetOrderInput = { _id: Bson.ObjectID; get: ROrder };
type GetOrderFn = ({ _id, get }: GetOrderInput) => Promise<Order>;
export const getOrder: GetOrderFn = async ({ _id, get }) => {
  const projection = makeProjections(get, [], ["dish"]);
  console.log("                      ");
  console.log("++++++++++++++++++++++");
  console.log("                      ");
  console.group("projection => : ");
  console.log("                      ");
  console.log(projection);
  console.log("                      ");
  console.groupEnd();
  console.log("                      ");
  console.log("----------------------");
  console.log("                      ");
  const foundedOrder = await orders.findOne({ _id }, { projection });
  const doRelation = async (order: Order, get: ROrder) => {
    return order;
  };
  return foundedOrder
    ? await doRelation(foundedOrder, get)
    : throwError("can not find order");
};
