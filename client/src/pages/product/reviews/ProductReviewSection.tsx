import ProductReviews from "./ProductReviews";

interface ProductReviewSectionProps {
  productId: string;
}

const ProductReviewSection: React.FC<ProductReviewSectionProps> = ({
  productId,
}) => {
  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold">📝 Avis :</h2>
      <ProductReviews productId={productId} />
    </div>
  );
};

export default ProductReviewSection;
