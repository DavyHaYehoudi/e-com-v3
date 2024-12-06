import ProductCard from "@/components/shared/productCard/ProductCard";
import DataCounter from "@/components/shared/DataCounter";
import FilterBlock from "@/components/shared/filter/FilterBlock";
import { useProductFilter } from "@/hooks/useProductFilter";
import LoaderWrapper from "@/components/shared/LoaderWrapper";

const ProductsPage = () => {
  const { allProducts, loading, error, handleFilterSubmit } =
    useProductFilter();

  return (
    <LoaderWrapper loading={loading} error={error}>
      <main>
        <h1 className="uppercase text-center mt-5">Tous les produits</h1>

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
    </LoaderWrapper>
  );
};

export default ProductsPage;
