import ProductCard from "@/components/shared/productCard/ProductCard";
import DataCounter from "@/components/shared/DataCounter";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { ProductDBType } from "@/types/ProductTypes";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface ProductsPageProps {
  allProducts: ProductDBType[] | null;
  loading: boolean;
}
const ProductsPage: React.FC<ProductsPageProps> = ({
  allProducts,
  loading,
}) => {
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
        <SidebarTrigger />
        <DataCounter items={allProducts || []} itemName="produit" />
      </section>

      <section className="my-20 flex justify-center flex-wrap items-center gap-4">
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
