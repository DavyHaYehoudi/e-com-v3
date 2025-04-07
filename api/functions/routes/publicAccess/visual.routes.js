import express from "express";
import { getVisualsController } from "../../controllers/visual/entities/visualController.js";
const router = express.Router();
router.get("/:page", getVisualsController);
export default router;
