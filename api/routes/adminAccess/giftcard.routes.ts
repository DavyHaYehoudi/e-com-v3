import { Router } from "express";
import {
  createAdminGiftcard,
  deleteGiftcard,
  getAllGiftcards,
} from "../../controllers/giftcard/giftcardController.js";

const router = Router();

// giftCard
router.get("/", getAllGiftcards);
router.post("/", createAdminGiftcard);
router.delete("/:giftcardId", deleteGiftcard);

export default router;
