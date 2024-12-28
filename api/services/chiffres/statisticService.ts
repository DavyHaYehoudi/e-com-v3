import { StatisticTypeDTO } from "../../controllers/chiffres/entities/dto/chiffre.dto.js";
import { getStatisticsRepository } from "../../repositories/chiffres/statisticRepository.js";

export const getStatisticService = (year:StatisticTypeDTO) => {
  return getStatisticsRepository(year);
};
