import { useFetch } from "@/service/hooks/useFetch";
import { StatsResponse } from "@/types/chiffres/StatisticTypes";

const useStatistic = (year?: string) => {
  const query = `?year=${year}`;
  const { triggerFetch: getStatistic } = useFetch<StatsResponse>(
    `/admin/chiffres/statistic${query}`,
    {
      requiredCredentials: true,
    }
  );

  return {
    getStatistic,
  };
};

export default useStatistic;
