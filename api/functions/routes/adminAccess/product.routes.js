import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProductsFromAdmin,
  updateProduct,
} from "../../controllers/product/productController.js";
const router = Router();
// product
router.get("/", getAllProductsFromAdmin);
router.post("/", createProduct);
router.patch("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);
export default router;
