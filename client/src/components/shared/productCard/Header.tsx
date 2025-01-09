import PromotionBadge from "../badge/PromotionBadge";
import NewBadge from "../badge/NewBadge";
import CashbackBadge from "../badge/CashbackBadge";
import { Link } from "react-router-dom";
import { isProductNew, isProductOnSale } from "@/utils/productUtils";
import { ProductDBType } from "@/types/ProductTypes";

interface HeaderProps {
  product: ProductDBType;
}
const Header: React.FC<HeaderProps> = ({ product }) => {
  console.log("product:", product);
  return (
    <div className="relative p-1" style={{ width: "100%", height: "65%" }}>
      {isProductOnSale(
        product.promotionPercentage,
        product.promotionEndDate
      ) && (
        <PromotionBadge
          promotionPercentage={product.promotionPercentage}
          additionalClasses="absolute top-2 right-2"
          promotionEndDate={product.promotionEndDate}
        />
      )}

      {isProductNew(product.newUntil) && (
        <NewBadge additionalClasses="absolute top-2 left-2 " />
      )}

      {product.cashback ? (
        <CashbackBadge
          cashbackAmount={product.cashback}
          additionalClasses="absolute top-2 left-1/2 transform -translate-x-1/2 "
        />
      ) : (
        ""
      )}

      {/* Image du produit */}
      <Link to={`/produits/${product._id}`}>
        <img
          src={product.heroImage}
          alt={product.name}
          className="w-full h-full object-cover rounded-t-2xl"
          width="450"
          height="520"
        />
      </Link>
    </div>
  );
};

export default Header;
