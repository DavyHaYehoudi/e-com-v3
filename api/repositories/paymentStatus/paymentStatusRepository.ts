import { PaymentStatusModel } from "../../models/paymentStatus/paymentStatusSchema.js";

export const paymentStatusRespository = async (
  number: number,
  label: string,
  color: string
) => {
  return await PaymentStatusModel.create({ number, label, color });
};

export const getPaymentStatusRespository = async () => {
  return await PaymentStatusModel.find();
};
