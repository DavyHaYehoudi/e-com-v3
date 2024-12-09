import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

const Header = () => {
  const cartCustomer = useSelector((state: RootState) => state.cart);
  const { cartProducts, cartGiftcards, totalItemsCount } = cartCustomer;
  const isProductsInCart = cartProducts.length > 0 || cartGiftcards.length > 0;

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
