import { SidebarProvider } from "@/components/ui/sidebar";
import ProductsSidebar from "./ProductsSidebar";
import ProductsPage from "./ProductsPage";
import { useProductFilter } from "@/hooks/useProductFilter";
import { useState } from "react";

const ProductsLayout = () => {
  const { allProducts, loading, handleFilterSubmit } = useProductFilter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <SidebarProvider
      // defaultOpen={false}
      open={isSidebarOpen}
      onOpenChange={() => setIsSidebarOpen(!isSidebarOpen)}
      style={{
        ["--sidebar-width" as any]: "20rem",
      }}
    >
      <ProductsSidebar
        onFilter={handleFilterSubmit}
        handleOpenSidebar={handleOpenSidebar}
      />
      <main className="mx-auto w-full ">
        <ProductsPage
          allProducts={allProducts}
          loading={loading}
          handleOpenSidebar={handleOpenSidebar}
        />
      </main>
    </SidebarProvider>
  );
};
export default ProductsLayout;
