import { useFetch } from "@/service/hooks/useFetch";
import { MarketingCampaignDBType } from "@/types/MarketingTypes";

const useMarketing = (marketingId?: string) => {
  const { triggerFetch: getAllMarketings } = useFetch<
    MarketingCampaignDBType[]
  >(`/admin/marketing/campaigns`, {
    requiredCredentials: true,
  });
  const { triggerFetch: createMarketing } = useFetch<MarketingCampaignDBType>(
    `/admin/marketing/campaigns`,
    {
      method: "POST",
      requiredCredentials: true,
    }
  );
  const { triggerFetch: sentMarketing } = useFetch<MarketingCampaignDBType>(
    `/admin/marketing/campaigns/${marketingId}`,
    {
      method: "PATCH",
      requiredCredentials: true,
    }
  );
  const { triggerFetch: deleteMarketing } = useFetch(
    `/admin/marketing/campaigns/${marketingId}`,
    {
      method: "DELETE",
      requiredCredentials: true,
    }
  );

  return {
    getAllMarketings,
    createMarketing,
    sentMarketing,
    deleteMarketing,
  };
};

export default useMarketing;
