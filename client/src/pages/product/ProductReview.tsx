import React from "react";
import ProductReviewSheet from "./ProductReviewSheet";

interface ProductReviewProps {
  productId: number;
}

const ProductReview: React.FC<ProductReviewProps> = ({ productId }) => {
  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold">📝 Avis :</h2>
      <ProductReviewSheet productId={productId} />
    </div>
  );
};

export default ProductReview;
