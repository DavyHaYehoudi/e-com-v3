import express from "express";
import {
  createPromocode,
  deletePromocode,
  getAllPromocodes,
} from "../../controllers/promocode/promocodeController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
const router = express.Router();
router.get("/", verifyToken, getAllPromocodes);
router.post("/", verifyToken, createPromocode);
router.delete("/:promocodeId", verifyToken, deletePromocode);
export default router;
