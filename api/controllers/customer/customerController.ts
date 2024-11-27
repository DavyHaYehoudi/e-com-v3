import { Request, Response, NextFunction } from "express";
import { CustomJwtPayload } from "../../middlewares/authMiddleware";
import { updateCustomerService } from "../../services/customer/customerService";
import { updateCustomerSchema } from "./entities/dto/customer.dto";

export const updateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = updateCustomerSchema.parse(req.body);
    const customerId = (req.user as CustomJwtPayload).id;
    await updateCustomerService(customerId, validatedData);
    res.status(200).json({});
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
