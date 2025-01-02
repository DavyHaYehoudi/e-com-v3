import jwt from "jsonwebtoken";
import { environment } from "../environment.js";
export const verifyToken = (req, res, next) => {
  var _a;
  const token =
    (_a = req.header("Authorization")) === null || _a === void 0
      ? void 0
      : _a.split(" ")[1]; // Extraire le token du header "Authorization: Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided." });
  }
  try {
    const decoded = jwt.verify(token, environment.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};
