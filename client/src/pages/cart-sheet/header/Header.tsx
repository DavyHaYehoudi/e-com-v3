import { RootState } from "@/redux/store/store";
import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const cartCustomer = useSelector((state: RootState) => state.cart);
  const { cart, items, giftCards, totalItemsCount } = cartCustomer;
  const productsInCart = { cart, items, giftCards };
  const isProductsInCart =
    productsInCart &&
    productsInCart.items &&
    (productsInCart.items.length > 0 || productsInCart.giftCards.length > 0);

  return isProductsInCart ? (
    <p className="uppercase">
      votre panier : <br />
      {totalItemsCount} article(s){" "}
    </p>
  ) : (
    <p className="uppercase">Votre panier est vide</p>
  );
};

export default Header;
