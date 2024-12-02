import {
  getOrderStatusRespository,
  orderStatusRespository,
} from "../../repositories/orderStatus/orderStatusRepository.js";

export const orderStatusService = async (
  number: number,
  label: string,
  color: string
) => {
  await orderStatusRespository(number, label, color);
};
export const getOrderStatusService = async () => {
  return getOrderStatusRespository();
};
