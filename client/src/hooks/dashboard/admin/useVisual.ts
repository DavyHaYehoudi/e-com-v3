import { useFetch } from "@/service/hooks/useFetch";
import { VisualDBType } from "@/types/VisualTypes";

const useVisual = (page: string) => {
  const { triggerFetch: updateVisual } = useFetch<VisualDBType>(
    `/admin/visuals/${page}`,
    {
      method: "PATCH",
      requiredCredentials: true,
    }
  );

  return {
    updateVisual,
  };
};

export default useVisual;
