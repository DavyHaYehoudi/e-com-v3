import { Product } from "@/app/(public)/types/ProductTypes";
import React from "react";

interface ProductCardProps {
  product: Product;
}
const Body: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="text-center mt-2 text-gray-500">
      <h4 className="text-lg line-clamp-2 ">{product.name}</h4>
      <div className="text-sm  uppercase" style={{ color: "var(--golden-1)" }}>
        atelier noralya
      </div>
      <p className="text-lg">{`${product.price} €`}</p>
    </div>
  );
};

export default Body;
