import NavBackDashboard from "@/components/shared/NavBackDashboard";

const EditProduct = () => {
  return (
    <div>
      <NavBackDashboard
        role="admin"
        path="catalogue/produits/liste"
        text="Revenir à la liste des produits"
      />
      <h1 className="text-center mb-10">Modifier le produit</h1>
    </div>
  );
};

export default EditProduct;
