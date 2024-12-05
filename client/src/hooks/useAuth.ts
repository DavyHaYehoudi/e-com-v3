import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { login, logout } from "@/redux/slice/authSlice";
import { reset } from "@/redux/slice/priceAdjustmentsSlice";
import { resetAddresses } from "@/redux/slice/addressesSlice";
import { resetCashback } from "@/redux/slice/cashbackSlice";
import { resetWishlist } from "@/redux/slice/wishlistSlice";
import { clearCart } from "@/redux/slice/cartSlice";

interface DecodedToken {
  id: number;
  email: string;
  role: string;
  exp: number;
}

const useAuth = () => {
  const dispatch = useDispatch();

  const handleAuthentication = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
      dispatch(login({ token, user }));
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  };
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetAddresses());
    dispatch(resetCashback());
    dispatch(resetWishlist());
    dispatch(clearCart());
  };
  return { handleAuthentication, handleLogout };
};

export default useAuth;
