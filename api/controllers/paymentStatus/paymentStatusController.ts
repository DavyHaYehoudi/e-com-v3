import { Request, Response, NextFunction } from "express";
import { paymentStatusService } from "../../services/paymentStatus/paymentStatusService.js";

// ADMIN
export const paymentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { number, name, color } = req.body;
    await paymentStatusService(number, name, color);
    res.status(201).json({});
  } catch (error) {
    next(error);
  }
};
