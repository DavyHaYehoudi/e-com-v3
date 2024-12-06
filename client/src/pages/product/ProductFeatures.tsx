import { MasterProductsType } from "@/app/(public)/types/ProductTypes";
import { formatWeight } from "@/app/(public)/utils/weightFormat";
import React from "react";

interface ProductFeaturesProps {
  product: MasterProductsType;
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ product }) => {
  return (
    <article className="my-8">
      <h2 className="text-xl font-semibold">🧑🏻‍🔬 Caractéristiques :</h2>
      <ul className="list-disc ml-5 mt-2 space-y-1">
        <li className="text-gray-700 dark:text-[var(--whiteSmoke)]">Référence : {product?.SKU}</li>
          <li className="text-gray-700 dark:text-[var(--whiteSmoke)]">
            Poids : {product.weight?formatWeight(product.weight):"N.C."}
          </li>
      </ul>
    </article>
  );
};

export default ProductFeatures;
