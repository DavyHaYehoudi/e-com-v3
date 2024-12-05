import Image from "next/image";
import React from "react";
import PromotionBadge from "../badge/PromotionBadge";
import NewBadge from "../badge/NewBadge";
import CashbackBadge from "../badge/CashbackBadge";
import { Product } from "@/app/(public)/types/ProductTypes";
import Link from "next/link";
import { isProductNew, isProductOnSale } from "@/app/(public)/utils/productUtils";

interface HeaderProps {
  product: Product;
}
const Header: React.FC<HeaderProps> = ({ product }) => {
  return (
    <div className="relative p-1" style={{ width: "100%", height: "65%" }}>
      {isProductOnSale(product.discount_percentage) && (
        <PromotionBadge
          discountPercentage={product.discount_percentage}
          additionalClasses="absolute top-2 right-2"
          discount_end_date={product.discount_end_date}
        />
      )}

      {isProductNew(product.new_until) && (
        <NewBadge additionalClasses="absolute top-2 left-2 " />
      )}

      {product.cash_back && (
        <CashbackBadge
          cashbackAmount={product.cash_back}
          additionalClasses="absolute top-2 left-1/2 transform -translate-x-1/2 "
        />
      )}

      {/* Image du produit */}
      <Link href={`/produits/${product.id}`}>
        <Image
          src={`/images/${product.main_image}`}
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
