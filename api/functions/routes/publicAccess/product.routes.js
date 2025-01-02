import { Router } from "express";
import {
  getAllProducts,
  getProductById,
} from "../../controllers/product/productController.js";
const router = Router();
// product
router.get("/", getAllProducts);
router.get("/:productId", getProductById);
export default router;
