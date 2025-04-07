import ProductCard from "@/components/shared/productCard/ProductCard";
import DataCounter from "@/components/shared/DataCounter";
import { ProductDBType } from "@/types/ProductTypes";
import { Filter } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import FullscreenLoader from "@/components/shared/FullscreenLoader";

interface ProductsPageProps {
  allProducts: ProductDBType[] | null;
  loading: boolean;
  handleOpenSidebar: () => void;
}
const ProductsPage: React.FC<ProductsPageProps> = ({
  allProducts,
  loading,
  handleOpenSidebar,
}) => {
  const isMobile = useIsMobile();
  if (loading) {
    return <FullscreenLoader />;
  }
  return (
    <main>
      <h1 className="uppercase text-center mt-10">La boutique des produits</h1>
      <section className="flex items-center justify-around">
        <div className="flex items-center gap-2">
          {isMobile ? (
            <SidebarTrigger className="px-4 py-4 text-white bg-orange-600" />
          ) : (
            <button
              onClick={handleOpenSidebar}
              className="px-4 py-2 text-white bg-[#ca99b7] rounded-full shadow-lg hover:bg-[#b684a3] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#e0bdd3] focus:ring-offset-2 flex items-center gap-2"
            >
              <Filter className="mr-2" size={20} />{" "}
              <span className="font-semibold">Filtrer</span>
            </button>
          )}
        </div>

        <DataCounter items={allProducts || []} itemName="produit" />
      </section>

      <section className="my-20 flex justify-center flex-wrap items-center gap-32 lg:p-4">
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
