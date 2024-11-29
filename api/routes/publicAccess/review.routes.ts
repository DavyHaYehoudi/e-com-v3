import { Router } from "express";
import { getReviewsOfOneProduct } from "../../controllers/review/reviewController.js";

const router = Router();

// review
router.get("/:productId", getReviewsOfOneProduct);

export default router;
