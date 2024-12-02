import { OrderStatusModel } from "../../models/orderStatus/orderStatusSchema.js";

export const orderStatusRespository = async (
  number: number,
  label: string,
  color: string
) => {
  return await OrderStatusModel.create({ number, label, color });
};
export const getOrderStatusRespository = async () => {
  return await OrderStatusModel.find();
};
