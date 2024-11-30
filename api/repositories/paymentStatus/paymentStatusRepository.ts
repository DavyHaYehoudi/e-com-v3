import { PaymentStatusModel } from "../../models/paymentStatus/paymentStatusSchema.js";

export const paymentStatusRespository = async (
  number: number,
  name: string,
  color: string
) => {
  return await PaymentStatusModel.create({ number, name, color });
};
