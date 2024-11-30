import { OrderStatusModel } from "../../models/orderStatus/orderStatusSchema.js";

export const orderStatusRespository = async (
  number: number,
  name: string,
  color: string
) => {
  return await OrderStatusModel.create({ number, name, color });
};
