// src/hooks/useCart.ts
import { useState, useEffect } from "react";
import { useFetch } from "@/service/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { setCart } from "@/redux/slice/cartSlice";
import { CartProductsToBuyFrontType } from "@/types/cart/CartTypes";
import { CartGiftcardsToBuyFrontType } from "@/types/giftcard/GiftcardTypes";
import { CustomerDBType } from "@/types/customer/CustomerTypes";

const useCart = () => {
  const [productsInCart, setProductsInCart] = useState<
    CartProductsToBuyFrontType[] | null
  >(null);
  const [giftcardsInCart, setGiftcardsInCart] = useState<
    CartGiftcardsToBuyFrontType[] | null
  >(null);
  const dispatch = useDispatch();
  const { isAuthenticated, isVisitor } = useSelector(
    (state: RootState) => state.auth
  );
  const cartCustomer = useSelector((state: RootState) => state.cart);
  const { data, triggerFetch } = useFetch<CustomerDBType>("/customer", {
    requiredCredentials: true,
  });

  const getCartCustomer = async () => {
    await triggerFetch();
  };

  useEffect(() => {
    if (isAuthenticated && data) {
      const cartProductsFormattedData = data.cartProducts.map(
        (cartProduct) => ({
          productId: cartProduct._id,
          quantity: cartProduct.quantity,
          variant: cartProduct.variant,
          name: cartProduct.name,
          heroImage: cartProduct.heroImage,
          newUntil: cartProduct.newUntil,
          price: cartProduct.price,
          promotionPercentage: cartProduct.promotionPercentage,
          promotionEndDate: cartProduct.promotionEndDate,
          cashback: cartProduct.cashback,
        })
      );
      const giftcardsFormattedData = data.cartGiftcards.map((giftcard) => ({
        idTemp: giftcard.idTemp,
        amount: giftcard.amount,
        quantity: giftcard.quantity,
      }));
      setProductsInCart(cartProductsFormattedData);
      setGiftcardsInCart(giftcardsFormattedData);
      dispatch(
        setCart({
          cartProducts: cartProductsFormattedData,
          cartGiftcards: giftcardsFormattedData,
        })
      );
    }
  }, [data, isAuthenticated, dispatch]);

  useEffect(() => {
    if (isVisitor && cartCustomer) {
      setProductsInCart(cartCustomer.cartProducts);
      setGiftcardsInCart(cartCustomer.cartGiftcards);
    }
  }, [isVisitor, cartCustomer]);

  return {
    productsInCart,
    setProductsInCart,
    giftcardsInCart,
    setGiftcardsInCart,
    getCartCustomer,
  };
};

export default useCart;
