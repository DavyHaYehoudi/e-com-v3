import useProduct from "@/hooks/dashboard/admin/useProduct";
import { ProductDBType } from "@/types/product/ProductTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductsList from "./ProductsList";

export interface SelectedProduct {
  productId: string;
  name: string;
}

const ProductsPageAdmin = () => {
  const [products, setProducts] = useState<ProductDBType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct>({
    productId: "",
    name: "",
  });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { getAllProducts, deleteProduct } = useProduct(
    selectedProduct.productId
  );

  // Fonction pour récupérer toutes les produits
  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
      toast.error("Impossible de charger vos informations.");
    }
  };

  // Fonction pour supprimer un produit
  const handleDeleteProduct = async () => {
    try {
      await deleteProduct();

      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product._id !== selectedProduct.productId
        )
      ); // Mettre à jour localement
      toast.success("Produit supprimé avec succès.");
    } catch (error) {
      console.log("error:", error);
      toast.error("Erreur lors de la suppression du produit.");
    }
  };

  // Charger les produits au montage
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-center mb-10">tous les produits</h1>
      <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
        <ProductsList
          data={products}
          handleDeleteProduct={handleDeleteProduct}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      </div>
    </div>
  );
};

export default ProductsPageAdmin;
