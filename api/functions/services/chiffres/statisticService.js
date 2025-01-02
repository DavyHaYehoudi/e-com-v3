import { getStatisticsRepository } from "../../repositories/chiffres/statisticRepository.js";
export const getStatisticService = (year) => {
  return getStatisticsRepository(year);
};
