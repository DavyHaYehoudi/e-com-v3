import { useEffect, useState } from "react";
import { useFetch } from "@/service/hooks/useFetch";
import { CategoryDBType } from "@/types/category/CategoryTypes";

const useCategory = () => {
  const [categories, setCategories] = useState<CategoryDBType[]>([]);
  const { data, triggerFetch } = useFetch<CategoryDBType[]>("/categories");
  const getCategories = async () => {
    await triggerFetch();
  };
  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);
  return { categories, getCategories };
};
export default useCategory;
