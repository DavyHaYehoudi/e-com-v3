import { SidebarProvider } from "@/components/ui/sidebar";
import ProductsSidebar from "./ProductsSidebar";
import ProductsPage from "./ProductsPage";
import { useProductFilter } from "@/hooks/useProductFilter";

const ProductsLayout = () => {
  const { allProducts, loading, handleFilterSubmit } = useProductFilter();
  return (
    <SidebarProvider
      defaultOpen={false}
      style={{
        "--sidebar-width": "20rem",
      }}
    >
      <ProductsSidebar onFilter={handleFilterSubmit} />
      <main className="mx-auto w-full ">
        <ProductsPage allProducts={allProducts} loading={loading} />
      </main>
    </SidebarProvider>
  );
};
export default ProductsLayout;
