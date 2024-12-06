import { MasterProductsType, Product } from "@/app/(public)/types/ProductTypes";
import ProductCard from "@/components/shared/productCard/ProductCard";
import { useFetch } from "@/service/hooks/useFetch";
import React, { useEffect, useState } from "react";

interface ProductsSuggestedProps {
  product: MasterProductsType;
}
const ProductsSuggested: React.FC<ProductsSuggestedProps> = ({ product }) => {
  const [productsSuggested, setProductSuggested] = useState<Product[]>([]);
  const formatUrlFromTags = (tags: number[]): string => {
    if (tags.length > 0) {
      const queryParams = new URLSearchParams();
      tags.forEach((tag) => {
        queryParams.append("tag_ids", tag.toString());
      });
      return `/products?${queryParams.toString()}`;
    }
    return ""; // Si pas de tags, retourne une chaîne vide
  };
  const queryUrl = formatUrlFromTags(product.tags);

  const { data,triggerFetch } = useFetch<Product[]>(queryUrl);
  useEffect(() => {
    if (product) {
       triggerFetch();
    }
  }, [product]);

  useEffect(() => {
    if (data) {
      setProductSuggested(data);
    }
  }, [data]);

  const filteredProducts = productsSuggested
    ? productsSuggested.filter((psugg) => psugg.id !== product.id)
    : [];

  return (
    <section className="py-8">
      <h3 className="uppercase text-center text-2xl mb-6">
        Produits suggeres{" "}
        {filteredProducts.length > 0 ? (
          <span className="lowercase">{`: ${filteredProducts.length} proposé(s)`}</span>
        ) : (
          <span className="lowercase">: aucune proposition</span>
        )}
      </h3>

      <div className="lg:w-3/4 mx-auto  overflow-x-auto custom-scrollbar">
        <div className="flex gap-4 min-w-max">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <p className="m-2">Aucun produit trouvé.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsSuggested;
