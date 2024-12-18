import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { createReview } from "../../controllers/review/reviewController.js";

const router = Router();

// review
router.post("/", verifyToken, createReview);

export default router;
