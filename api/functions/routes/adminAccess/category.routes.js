import express from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../controllers/category/categoryController.js";
const router = express.Router();
router.post("/", verifyToken, createCategory);
router.patch("/:categoryId", verifyToken, updateCategory);
router.delete("/:categoryId", verifyToken, deleteCategory);
export default router;
