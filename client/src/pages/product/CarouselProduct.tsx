"use client";
import { MasterProductsType } from "@/app/(public)/types/ProductTypes";
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

// Transformer les images du produit pour être compatibles avec ImageGallery
const formatImagesForGallery = (images: { url: string }[]) => {
  return images.map((image) => ({
    original: `/images/${image.url}`,
    thumbnail: `/images/${image.url}`,
  }));
};
interface CarouselProductProps {
  product: MasterProductsType;
}
const CarouselProduct: React.FC<CarouselProductProps> = ({ product }) => {
  const images = formatImagesForGallery(product.images);

  return <ImageGallery items={images} />;
};

export default CarouselProduct;
