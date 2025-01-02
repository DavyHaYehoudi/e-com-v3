import {
  getOrderStatusRespository,
  orderStatusRespository,
} from "../../repositories/orderStatus/orderStatusRepository.js";
export const orderStatusService = async (number, label, color) => {
  await orderStatusRespository(number, label, color);
};
export const getOrderStatusService = async () => {
  return getOrderStatusRespository();
};
