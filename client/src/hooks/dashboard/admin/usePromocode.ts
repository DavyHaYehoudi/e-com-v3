import { useFetch } from "@/service/hooks/useFetch";
import { PromocodeDBType } from "@/types/PromocodeTypes";

const usePromocode = (promocodeId?: string) => {
  const { triggerFetch: getPromocodes } = useFetch<PromocodeDBType[]>(
    `/admin/promocodes`,
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: createPromocode } = useFetch<PromocodeDBType>(
    `/admin/promocodes`,
    {
      method: "POST",
      requiredCredentials: true,
    }
  );

  const { triggerFetch: deletePromocode } = useFetch(
    `/admin/promocodes/${promocodeId}`,
    {
      method: "DELETE",
      requiredCredentials: true,
    }
  );

  return {
    getPromocodes,
    createPromocode,
    deletePromocode,
  };
};

export default usePromocode;
