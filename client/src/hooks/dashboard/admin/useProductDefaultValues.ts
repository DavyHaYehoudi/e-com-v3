import {
  initValues,
  ProductInputDTO,
} from "@/pages/admin/catalogue/products/sheetProduct/productSchema";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProduct from "./useProduct";
import { ProductDBType } from "@/types/ProductTypes";

const mapProductDBToInputDTO = (product: ProductDBType): ProductInputDTO => {
  return {
    name: product.name,
    description: product.description,
    heroImage: product.heroImage || "",
    promotionPercentage: product.promotionPercentage || 0,
    promotionEndDate: product.promotionEndDate
      ? new Date(product.promotionEndDate)
      : null,
    continueSelling: product.continueSelling || false,
    quantityInStock: product.quantityInStock,
    price: product.price,
    newUntil: product.newUntil ? new Date(product.newUntil) : null,
    isPublished: product.isPublished || false,
    cashback: product.cashback || 0,
    collections: product.collections.map((collection) => collection._id),
    categories: product.categories.map((category) => category._id),
    tags: product.tags.map((tag) => tag._id),
    variants: product.variants.map((variant) => ({
      combination: variant.combination,
      mainImage: variant.mainImage,
      secondaryImages: variant.secondaryImages || [],
    })),
    isStar: product.isStar || false,
    isArchived: product.isArchived || false,
  };
};

const useProductDefaultValues = () => {
  const [defaultValues, setDefaultValues] =
    useState<ProductInputDTO>(initValues);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { productId } = useParams();
  const { getProductById } = useProduct(productId || "");

  useEffect(() => {
    const fetchProductData = async () => {
      // Mode édition : récupération des données du produit
      if (productId) {
        try {
          setLoading(true);
          const productData = await getProductById();
          if (productData) {
            setDefaultValues(mapProductDBToInputDTO(productData));
          }
        } catch (err) {
          setError(
            (err as Error).message || "Erreur lors du chargement des données."
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProductData();
  }, [productId, getProductById]);

  return { defaultValues, loading, error, productId };
};

export default useProductDefaultValues;
