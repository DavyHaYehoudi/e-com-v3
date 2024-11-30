import { orderStatusRespository } from "../../repositories/orderStatus/orderStatusRepository.js";

export const orderStatusService = async (
  number: number,
  name: string,
  color: string
) => {
  await orderStatusRespository(number, name, color);
};
