import { ProductDBType } from "@/types/product/ProductTypes";
import { formatPrice } from "@/utils/pricesFormat";

interface ProductCardProps {
  product: ProductDBType;
}
const Body: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="text-center mt-2 text-gray-500">
      <h4 className="text-lg line-clamp-2 ">{product.name}</h4>
      <div className="text-sm  uppercase" style={{ color: "var(--golden-1)" }}>
        atelier noralya
      </div>
      <p className="text-lg">{`${formatPrice(product.price)}`}</p>
    </div>
  );
};

export default Body;
