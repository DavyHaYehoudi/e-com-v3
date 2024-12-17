import { useFetch } from "@/service/hooks/useFetch";
import { CategoryDBType } from "@/types/category/CategoryTypes";

const useCategory = (categoryId?: string) => {
  const { triggerFetch: getCategories } = useFetch<CategoryDBType[]>(
    `/categories`,
    {
      requiredCredentials: false,
    }
  );
  const { triggerFetch: createCategory } = useFetch<CategoryDBType>(
    `/admin/categories`,
    {
      method: "POST",
      requiredCredentials: true,
    }
  );
  const { triggerFetch: updateCategory } = useFetch<CategoryDBType>(
    `/admin/categories/${categoryId}`,
    {
      method: "PATCH",
      requiredCredentials: true,
    }
  );
  const { triggerFetch: deleteCategory } = useFetch(
    `/admin/categories/${categoryId}`,
    {
      method: "DELETE",
      requiredCredentials: true,
    }
  );

  return {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};

export default useCategory;
