import { Product } from "@/app/(public)/types/ProductTypes";
import LoaderWrapper from "@/components/shared/LoaderWrapper";
import ProductCard from "@/components/shared/productCard/ProductCard";
import { useFetch } from "@/service/hooks/useFetch";
import  { useEffect } from "react";

const Products = () => {
  const {
    data: productsStar,
    loading,
    error,
    triggerFetch,
  } = useFetch<Product[]>("/products?is_star=true");
  useEffect(() => {
    triggerFetch(); // Fetch des produits star au chargement de la page
  }, []);
  return (
    <LoaderWrapper loading={loading} error={error}>
      {productsStar && productsStar.length > 0 && (
        <section className="mb-10 mx-2">
          <h2 className="text-center mb-6">Decouvrez nos produits</h2>
          <div className="flex items-center justify-around gap-5 flex-wrap">
            {productsStar.map((product) => (
              <ProductCard
                product={product}
                key={`${product.id}-${product?.variant}`}
              />
            ))}
          </div>
        </section>
      )}
    </LoaderWrapper>
  );
};

export default Products;
