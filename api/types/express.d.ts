import { JwtPayload } from "jsonwebtoken"; // Si utilisation des types pour le payload JWT

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}
