import PromotionBadge from "../badge/PromotionBadge";
import NewBadge from "../badge/NewBadge";
import CashbackBadge from "../badge/CashbackBadge";
import { Link } from "react-router-dom";
import { isProductNew, isProductOnSale } from "@/utils/productUtils";
import { ProductDBType } from "@/types/ProductTypes";
import { useState, useEffect } from "react";

interface HeaderProps {
  product: ProductDBType;
}

const Header: React.FC<HeaderProps> = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.heroImage);
  const [nextImage, setNextImage] = useState(product.heroImage);
  const [isHovered, setIsHovered] = useState(false);
  const [fade, setFade] = useState(false);
  let intervalId: NodeJS.Timeout | null = null;

  const startImageRotation = () => {
    let currentIndex = 0;

    // ✅ Démarre immédiatement sans délai
    setNextImage(product.commonImages[currentIndex]);
    setFade(false);

    setTimeout(() => {
      setCurrentImage(product.commonImages[currentIndex]);
      setFade(true);
    }, 700);

    // ✅ Puis continue toutes les 3000ms
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % product.commonImages.length;
      setNextImage(product.commonImages[currentIndex]);
      setFade(false);

      setTimeout(() => {
        setCurrentImage(product.commonImages[currentIndex]);
        setFade(true);
      }, 700);
    }, 3000);
  };

  const stopImageRotation = () => {
    if (intervalId) clearInterval(intervalId);
    setNextImage(product.heroImage);
    setCurrentImage(product.heroImage);
    setFade(true);
  };

  useEffect(() => {
    if (isHovered) {
      startImageRotation();
    } else {
      stopImageRotation();
    }
    return () => stopImageRotation();
  }, [isHovered]);

  return (
    <div
      className="relative w-full h-[65%]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isProductOnSale(
        product.promotionPercentage,
        product.promotionEndDate
      ) && (
        <PromotionBadge
          promotionPercentage={product.promotionPercentage}
          additionalClasses="absolute top-4 right-4 z-10"
          promotionEndDate={product.promotionEndDate}
        />
      )}

      {isProductNew(product.newUntil) && (
        <NewBadge additionalClasses="absolute top-4 left-4 z-10" />
      )}

      {product.cashback ? (
        <CashbackBadge
          cashbackAmount={product.cashback}
          additionalClasses="absolute top-4 left-1/2 transform -translate-x-1/2 z-10"
        />
      ) : (
        ""
      )}
      <Link to={`/produits/${product._id}`}>
        {/* Image principale */}
        <img
          src={currentImage}
          alt={product.name}
          className={`absolute top-0 left-0 w-full h-full object-cover rounded-t-3xl transition-opacity duration-700 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          width="450"
          height="520"
        />
        {/* Image suivante (préchargée) */}
        <img
          src={nextImage}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-t-3xl opacity-0 pointer-events-none"
          width="450"
          height="520"
        />
      </Link>
    </div>
  );
};

export default Header;
