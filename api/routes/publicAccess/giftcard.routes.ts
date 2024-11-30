import { Router } from "express";
import { giftcardCheck } from "../../controllers/giftcard/giftcardController.js";
const router = Router();

// giftcard check-in
router.post("/check-in", giftcardCheck);

export default router;
