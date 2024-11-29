import { Router } from "express";
import { createProduct, deleteProduct, updateProduct } from "../../controllers/product/productController.js";

const router = Router();

// product
router.post("/", createProduct);
router.patch("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

export default router;
