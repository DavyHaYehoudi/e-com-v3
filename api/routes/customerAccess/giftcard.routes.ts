import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { getCustomerGiftcards } from "../../controllers/giftcard/giftcardController.js";

const router = Router();

// giftcard
router.get("/", verifyToken, getCustomerGiftcards);

export default router;
