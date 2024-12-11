import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { login, logout } from "@/redux/slice/authSlice";
import { resetPriceAdjustments } from "@/redux/slice/priceAdjustmentsSlice";
import { resetAddresses } from "@/redux/slice/addressesSlice";
import { resetCashback } from "@/redux/slice/cashbackSlice";
import { resetWishlist } from "@/redux/slice/wishlistSlice";
import { clearCart } from "@/redux/slice/cartSlice";
import useWishlist from "./useWishlist";
import useCashback from "./useCashback";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store/store";
import useCart from "./useCart";

interface DecodedToken {
  id: number;
  email: string;
  role: string;
  exp: number;
}

const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const { getCartCustomer } = useCart();
  const { getWishlistCustomer } = useWishlist();
  const { getCashbackOneCustomer } = useCashback();

  // État pour éviter des appels multiples
  const [hasFetchedData, setHasFetchedData] = useState(false);

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

  useEffect(() => {
    if (token && !hasFetchedData) {
      getCartCustomer();
      getWishlistCustomer();
      getCashbackOneCustomer();
      setHasFetchedData(true); // Empêche les appels multiples
    }
  }, [
    token,
    hasFetchedData,
    getCartCustomer,
    getWishlistCustomer,
    getCashbackOneCustomer,
  ]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetPriceAdjustments());
    dispatch(resetAddresses());
    dispatch(resetCashback());
    dispatch(resetWishlist());
    dispatch(clearCart());
    setHasFetchedData(false); // Réinitialiser pour le prochain login
  };

  return { handleAuthentication, handleLogout };
};

export default useAuth;
