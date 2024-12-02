import {
  getPaymentStatusRespository,
  paymentStatusRespository,
} from "../../repositories/paymentStatus/paymentStatusRepository.js";

export const paymentStatusService = async (
  number: number,
  label: string,
  color: string
) => {
  await paymentStatusRespository(number, label, color);
};

export const getPaymentStatusService = async () => {
  return getPaymentStatusRespository();
};
