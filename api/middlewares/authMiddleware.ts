import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { environment } from "../environment.js";
import { JwtPayload } from "jsonwebtoken";
export interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extraire le token du header "Authorization: Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided." });
  }

  try {
    const decoded = jwt.verify(
      token,
      environment.JWT_SECRET
    ) as CustomJwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};
