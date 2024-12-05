import { jwtDecode, JwtPayload } from "jwt-decode";
export const isTokenExpired = (token: string | null): boolean => {
  try {
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const exp = decodedToken.exp ? decodedToken.exp * 1000 : 0;
      return Date.now() > exp;
    }
    return false;
  } catch {
    return true; // Considère le token comme expiré si non décodable
  }
};
