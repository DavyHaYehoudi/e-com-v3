import { Router } from "express";
import {
  getAllPaymentStatuses,
  paymentStatus,
} from "../../controllers/paymentStatus/paymentStatusController.js";
const router = Router();
// paymentStatus
router.get("/", getAllPaymentStatuses);
router.post("/", paymentStatus);
export default router;
