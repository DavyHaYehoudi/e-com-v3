import { OrderModel } from "../../models/order/order.schema.js";
import { orderDataCreateType } from "../../models/types/orderType.js";

export const createOrderRepository = async (orderData: orderDataCreateType) => {
  return await OrderModel.create(orderData);
};
