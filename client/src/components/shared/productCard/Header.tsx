import PromotionBadge from "../badge/PromotionBadge";
import NewBadge from "../badge/NewBadge";
import CashbackBadge from "../badge/CashbackBadge";
import { Link } from "react-router-dom";
import { isProductNew, isProductOnSale } from "@/utils/productUtils";
import { ProductDBType } from "@/types/ProductTypes";
import { useState } from "react";

interface HeaderProps {
  product: ProductDBType;
}

const Header: React.FC<HeaderProps> = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.heroImage);

  // Fonction pour gérer le survol de l'image
  const handleMouseEnter = () => {
    if (product.commonImages.length > 0) {
      const randomImage =
        product.commonImages[
          Math.floor(Math.random() * product.commonImages.length)
        ];
      setCurrentImage(randomImage);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImage(product.heroImage);
  };

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

      {/* Image du produit avec gestion du survol */}
      <Link to={`/produits/${product._id}`}>
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover rounded-t-2xl transition-all duration-400 ease-in-out"
          width="450"
          height="520"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>
    </div>
  );
};

export default Header;
