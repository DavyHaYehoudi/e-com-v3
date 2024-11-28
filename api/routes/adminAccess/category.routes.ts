import express from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { createCategory, deleteCategory } from "../../controllers/category/categoryController.js";

const router = express.Router();

router.post("/", verifyToken, createCategory);
router.delete("/:categoryId", verifyToken, deleteCategory);
export default router;
