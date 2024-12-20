import { Request, Response, NextFunction } from "express";
import { orderStatusService } from "../../services/orderStatus/orderStatusService.js";

// ADMIN
export const orderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { number, label, color } = req.body;
    await orderStatusService(number, label, color);
    res.status(201).json({});
  } catch (error) {
    next(error);
  }
};
