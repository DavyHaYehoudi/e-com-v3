import {
  getVisualsByPageService,
  updateVisualsByPageService,
} from "../../../services/visual/visualService.js";
import {
  createrPageVisualZodSchema,
  giftcardVisualZodSchema,
  homePageVisualZodSchema,
} from "./dto/visual.dto.js";

// Récupérer les visuels d'une page (homePage ou createrPage)
export const getVisualsController = async (req, res, next) => {
  const page = req.params.page;

  try {
    const visuals = await getVisualsByPageService(page);
    if (!visuals) {
      return res.status(404).json({ message: "Aucun visuel pour cette page." });
    }
    res.json(visuals);
  } catch (error) {
    next(error);
  }
};

// ADMIN - Mettre à jour les visuels d'une page
const schemaMap = {
  homePage: homePageVisualZodSchema,
  createrPage: createrPageVisualZodSchema,
  giftcard: giftcardVisualZodSchema,
  // Ajouter ici d'autres pages visuelles dans le futur
};

export const updateVisualsController = async (req, res, next) => {
  const page = req.params.page;

  const schema = schemaMap[page];
  if (!schema) {
    return res.status(400).json({ message: `Page inconnue : ${page}` });
  }

  const pageData = req.body[page];
  if (!pageData) {
    return res.status(400).json({ message: `Données manquantes pour ${page}` });
  }

  const parsed = schema.safeParse(pageData);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Données invalides", errors: parsed.error.errors });
  }

  try {
    const updated = await updateVisualsByPageService(page, parsed.data);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};
