import { useFetch } from "@/service/hooks/useFetch";
import { CollectionDBType } from "@/types/collectionTypes";

const useCollection = (collectionId?: string) => {
  const { triggerFetch: getCollections } = useFetch<CollectionDBType[]>(
    `/collections`,
    {
      requiredCredentials: false,
    }
  );
  const { triggerFetch: createCollection } = useFetch<CollectionDBType>(
    `/admin/collections`,
    {
      method: "POST",
      requiredCredentials: true,
    }
  );
  const { triggerFetch: updateCollection } = useFetch<CollectionDBType>(
    `/admin/collections/${collectionId}`,
    {
      method: "PATCH",
      requiredCredentials: true,
    }
  );
  const { triggerFetch: deleteCollection } = useFetch(
    `/admin/collections/${collectionId}`,
    {
      method: "DELETE",
      requiredCredentials: true,
    }
  );

  return {
    getCollections,
    createCollection,
    updateCollection,
    deleteCollection,
  };
};

export default useCollection;
