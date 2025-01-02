import { useFetch } from "@/service/hooks/useFetch";
import { TagDBType } from "@/types/TagTypes";

const useTag = (tagId?: string) => {
  const { triggerFetch: getTags } = useFetch<TagDBType[]>(`/tags`, {
    requiredCredentials: false,
  });
  const { triggerFetch: createTag } = useFetch<TagDBType>(`/admin/tags`, {
    method: "POST",
    requiredCredentials: true,
  });
  const { triggerFetch: updateTag } = useFetch<TagDBType>(
    `/admin/tags/${tagId}`,
    {
      method: "PATCH",
      requiredCredentials: true,
    }
  );
  const { triggerFetch: deleteTag } = useFetch(`/admin/tags/${tagId}`, {
    method: "DELETE",
    requiredCredentials: true,
  });

  return {
    getTags,
    createTag,
    updateTag,
    deleteTag,
  };
};

export default useTag;
