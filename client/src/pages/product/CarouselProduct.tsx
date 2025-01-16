import { useIsMobile } from "@/hooks/use-mobile";
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
  selectedVariant: string;
}
const CarouselProduct: React.FC<CarouselProductProps> = ({
  product,
  selectedVariant,
}) => {
  // Trouver l'index du variant sélectionné
  const indexVariant = product.variants.findIndex(
    (pv) => pv.combination === selectedVariant
  );

  // Utiliser le variant correspondant, sinon fallback au premier (éviter erreur si non trouvé)
  const selectedVariantObject =
    indexVariant !== -1 ? product.variants[indexVariant] : product.variants[0];
  const images = formatImagesForGallery([
    selectedVariantObject.mainImage,
    ...selectedVariantObject.secondaryImages,
    ...product.commonImages,
  ]);
  const isMobile = useIsMobile();
  return (
    <div className="custom-gallery">
      <ImageGallery
        items={images}
        showThumbnails={!isMobile}
        showPlayButton={false}
        showFullscreenButton={!isMobile}
        showBullets={true}
      />
    </div>
  );
};

export default CarouselProduct;
