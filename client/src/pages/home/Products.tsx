import { ProductDBType } from "@/types/ProductTypes";
import ProductCard from "@/components/shared/productCard/ProductCard";
import { useFetch } from "@/service/hooks/useFetch";
import { useEffect } from "react";
import FullscreenLoader from "@/components/shared/FullscreenLoader";

const Products = () => {
  const {
    data: productsStar,
    loading,
    triggerFetch,
  } = useFetch<ProductDBType[]>("/products?isStar=true");
  useEffect(() => {
    triggerFetch(); // Fetch des produits star au chargement de la page
  }, []);
  if (loading) {
    return <FullscreenLoader />;
  }
  return (
    productsStar &&
    productsStar.length > 0 && (
      <section className="mb-10 mx-2">
        <h2 className="text-center mb-6">Decouvrez nos produits</h2>
        <div className="flex items-center justify-around gap-5 flex-wrap">
          {productsStar.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </section>
    )
  );
};

export default Products;
