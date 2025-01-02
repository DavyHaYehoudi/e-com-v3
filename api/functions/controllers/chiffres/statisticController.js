import { getStatisticService } from "../../services/chiffres/statisticService.js";
import { getStatisticSchema } from "./entities/dto/chiffre.dto.js";
export const getStatistic = async (
  req, // Accepte `string` pour `req.query.year`
  res,
  next
) => {
  try {
    // Validation et conversion
    const year = req.query.year
      ? getStatisticSchema.parse(req.query.year)
      : undefined;
    const statistics = await getStatisticService(year); // Passe l'année validée au service
    res.status(200).json(statistics);
  } catch (error) {
    console.error(error);
    if (error.name === "ZodError") {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};
