import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../exceptions/CustomErrors.js";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Gestion des erreurs de validation Zod
  if (err instanceof ZodError) {
    const errors = err.errors.map((error) => ({
      path: error.path.join("."),
      message: error.message,
    }));
    return res
      .status(400)
      .json({ status: 400, message: "Validation error", errors });
  }

  // Gestion des erreurs personnalisées
  if (err instanceof AppError) {
    return res
      .status(err.status)
      .json({ status: err.status, error: err.message });
  }

  // Erreurs génériques
  const status = 500;
  const message = "Internal Server Error";
  res.status(status).json({ status, message });
};

export default errorHandler;
