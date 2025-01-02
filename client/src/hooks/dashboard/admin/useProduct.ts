import { useFetch } from "@/service/hooks/useFetch";
import { ProductDBType } from "@/types/ProductTypes";

const useProduct = (productId?: string) => {
  const { triggerFetch: getAllProducts } = useFetch<ProductDBType[]>(
    `/products`,
    {
      requiredCredentials: false,
    }
  );
  const { triggerFetch: getProductById } = useFetch<ProductDBType>(
    `/products/${productId}`,
    {
      requiredCredentials: false,
    }
  );
  const { triggerFetch: createProduct } = useFetch<ProductDBType>(
    `/admin/products`,
    {
      method: "POST",
      requiredCredentials: true,
    }
  );
  const { triggerFetch: udpateProduct } = useFetch(
    `/admin/products/${productId}`,
    {
      method: "PATCH",
      requiredCredentials: true,
    }
  );
  const { triggerFetch: deleteProduct } = useFetch(
    `/admin/products/${productId}`,
    {
      method: "DELETE",
      requiredCredentials: true,
    }
  );

  return {
    getAllProducts,
    getProductById,
    createProduct,
    udpateProduct,
    deleteProduct,
  };
};

export default useProduct;
