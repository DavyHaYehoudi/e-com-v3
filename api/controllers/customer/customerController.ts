import { Request, Response, NextFunction } from "express";
import { CustomJwtPayload } from "../../middlewares/authMiddleware";
import {
    getCashbackHistoryCustomerService,
  getCustomerService,
  getCustomersService,
  updateCashbackCustomerService,
  updateCustomerService,
} from "../../services/customer/customerService.js";
import { cashbackSchema, updateCustomerSchema } from "./entities/dto/customer.dto.js";

// customer access
export const getCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = (req.user as CustomJwtPayload).id;
    const customer = await getCustomerService(customerId);
    res.status(200).json(customer);
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
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
export const getCashbackHistoryCustomer=async( req: Request,
    res: Response,
    next: NextFunction)=>{
        try {
            const customerId = (req.user as CustomJwtPayload).id;
            const cashbackHistory = await getCashbackHistoryCustomerService(customerId);
            res.status(200).json(cashbackHistory);
          } catch (error: any) {
            console.error(error);
            next(error);
          }
}
// admin access
export const getCustomerFromAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = req.params.customerId;
    const customer = await getCustomerService(customerId);
    res.status(200).json(customer);
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
export const getCustomersFromAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customers = await getCustomersService();
    res.status(200).json(customers);
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
export const updateCustomerFromAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = updateCustomerSchema.parse(req.body);
    const customerId = req.params.customerId;
    await updateCustomerService(customerId, validatedData);
    res.status(200).json({});
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
export const getCashbackHistoryCustomerFromAdmin=async( req: Request,
    res: Response,
    next: NextFunction)=>{
        try {
            const customerId = req.params.customerId;
            const cashbackHistory = await getCashbackHistoryCustomerService(customerId);
            res.status(200).json(cashbackHistory);
          } catch (error: any) {
            console.error(error);
            next(error);
          }
}
export const updateCashbackCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validatedData = cashbackSchema.parse(req.body);
      const customerId = req.params.customerId;
      await updateCashbackCustomerService(customerId, validatedData);
      res.status(200).json({});
    } catch (error: any) {
      console.error(error);
      next(error);
    }
  };