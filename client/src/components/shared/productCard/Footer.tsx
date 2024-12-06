import { ProductDBType } from "@/types/product/ProductTypes";
import FavoriteButton from "../FavoriteButton";

interface FooterProps {
  product: ProductDBType;
}

const Footer: React.FC<FooterProps> = ({ product }) => {
  return (
    <div className="m-4 w-full pb-5 relative">
      <FavoriteButton product={product} />
    </div>
  );
};

export default Footer;
