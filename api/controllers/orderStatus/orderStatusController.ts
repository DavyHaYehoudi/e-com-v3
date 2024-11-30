import { Request, Response, NextFunction } from "express";
import { orderStatusService } from "../../services/orderStatus/orderStatusService.js";

// ADMIN
export const orderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { number, name, color } = req.body;
    await orderStatusService(number, name, color);
    res.status(201).json({});
  } catch (error) {
    next(error);
  }
};
