import { ProductDBType } from "@/types/ProductTypes";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

// Transformer les images du produit pour être compatibles avec ImageGallery
const formatImagesForGallery = (images: string[]) => {
  return images.map((url) => ({
    original: url,
    thumbnail: url,
  }));
};
interface CarouselProductProps {
  product: ProductDBType;
}
const CarouselProduct: React.FC<CarouselProductProps> = ({ product }) => {
  const images = formatImagesForGallery(product.variants[0].secondaryImages);

  return <ImageGallery items={images} />;
};

export default CarouselProduct;
