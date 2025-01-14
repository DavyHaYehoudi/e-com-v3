// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

interface ProtectedRouteProps {
  role: "admin" | "customer";
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const { user, isAuthenticated, isTokenExpired } = useSelector(
    (state: RootState) => state.auth
  );

  // Vérifie si l'utilisateur est un customer et que le token est valide
  if (!isAuthenticated || isTokenExpired || user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
