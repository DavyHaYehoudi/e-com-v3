import { paymentStatusRespository } from "../../repositories/paymentStatus/paymentStatusRepository.js";

export const paymentStatusService = async (
  number: number,
  name: string,
  color: string
) => {
  await paymentStatusRespository(number, name, color);
};
