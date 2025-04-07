import express from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { updateVisualsController } from "../../controllers/visual/entities/visualController.js";
const router = express.Router();
router.patch("/:page", verifyToken, updateVisualsController);
export default router;
