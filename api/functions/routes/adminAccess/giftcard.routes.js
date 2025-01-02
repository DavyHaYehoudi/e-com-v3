import { Router } from "express";
import {
  createAdminGiftcard,
  deleteGiftcard,
  getAllGiftcards,
  getGiftcardById,
} from "../../controllers/giftcard/giftcardController.js";
const router = Router();
// giftCard
router.get("/", getAllGiftcards);
router.get("/:giftcardId", getGiftcardById);
router.post("/", createAdminGiftcard);
router.delete("/:giftcardId", deleteGiftcard);
export default router;
