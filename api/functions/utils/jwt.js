import jwt from "jsonwebtoken";
import { environment } from "../environment.js";
export const generateToken = (customerId, email, role) => {
  const token = jwt.sign(
    { id: customerId, email, role },
    environment.JWT_SECRET,
    { expiresIn: "15d" }
  );
  return token;
};
