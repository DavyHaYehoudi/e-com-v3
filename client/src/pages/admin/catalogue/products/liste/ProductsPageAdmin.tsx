import useProduct from "@/hooks/dashboard/admin/useProduct";
import { ProductDBType } from "@/types/ProductTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductsList from "./ProductsList";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { deleteImageFromFirebase } from "@/utils/imageManage";

export interface SelectedProduct {
  productId: string;
  name: string;
}

const ProductsPageAdmin = () => {
  const [products, setProducts] = useState<ProductDBType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const data = await getAllProducts();
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
      toast.error("Impossible de charger vos informations.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour supprimer un produit
  const handleDeleteProduct = async () => {
    try {
      const isProductAlreadySelled = products.find(
        (product) =>
          product._id === selectedProduct.productId && product.numberOfSales > 0
      );
      if (isProductAlreadySelled) {
        toast.error("Impossible de supprimer ce produit car il a été vendu.");
        return;
      }

      // Trouver le produit sélectionné
      const product = products.find((p) => p._id === selectedProduct.productId);
      if (!product) {
        toast.error("Produit non trouvé.");
        return;
      }

      // Rassembler toutes les URLs à supprimer (heroImage, mainImage, secondaryImages)
      const urlsToDelete: string[] = [
        product.heroImage, // Image principale
        ...product.variants.flatMap((variant) => [
          variant.mainImage, // Image principale du variant
          ...variant.secondaryImages, // Images secondaires du variant
        ]),
      ].filter(Boolean); // Filtrer les valeurs nulles ou undefined

      // Supprimer chaque image dans Firebase Storage
      await Promise.all(
        urlsToDelete.map((url) => deleteImageFromFirebase(url))
      );

      // Supprimer le produit dans la base de données
      await deleteProduct();

      // Mettre à jour localement la liste des produits
      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product._id !== selectedProduct.productId
        )
      );

      toast.success("Produit supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
      toast.error("Erreur lors de la suppression du produit.");
    }
  };

  // Charger les produits au montage
  useEffect(() => {
    fetchProducts();
  }, []);
  if (isLoading) {
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner />
        <span> Chargement en cours...</span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center mb-10">tous les produits</h1>
      <div className="container-responsive">
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
