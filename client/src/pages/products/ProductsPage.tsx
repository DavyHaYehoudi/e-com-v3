import ProductCard from "@/components/shared/productCard/ProductCard";
import DataCounter from "@/components/shared/DataCounter";
import FilterBlock from "@/components/shared/filter/FilterBlock";
import { useProductFilter } from "@/hooks/useProductFilter";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const ProductsPage = () => {
  const { allProducts, loading, handleFilterSubmit } = useProductFilter();
  if (loading) {
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner />
        <span> Chargement en cours...</span>
      </div>
    );
  }
  return (
    <main>
      <h1 className="uppercase text-center mt-10">La boutique des produits</h1>

      <section className="flex items-center justify-around">
        <DataCounter items={allProducts || []} itemName="produit" />
        <FilterBlock onFilter={handleFilterSubmit} />
      </section>

      <section className="w-3/4 mx-auto my-20 flex flex-wrap items-center justify-center gap-4">
        {allProducts && allProducts.length > 0
          ? allProducts.map((product) => (
              <ProductCard
                key={`${product._id}-${product?.variants[0]}`}
                product={product}
              />
            ))
          : !loading && <p>Aucun produit trouvé.</p>}
      </section>
    </main>
  );
};

export default ProductsPage;
