import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { ProductDBType } from "@/types/ProductTypes";

interface ProductCardProps {
  product: ProductDBType;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="productCard flex flex-col items-center justify-between transform transition-transform duration-300 hover:scale-[1.005] rounded-t-3xl rounded-b-sm">
      <Header product={product} />
      <Body product={product} />
      <Footer product={product} />
    </div>
  );
};

export default ProductCard;
