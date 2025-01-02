import express from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { getStatistic } from "../../controllers/chiffres/statisticController.js";
const router = express.Router();
router.get("/statistic", verifyToken, getStatistic);
export default router;
