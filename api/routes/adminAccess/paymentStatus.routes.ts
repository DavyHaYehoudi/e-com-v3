import { Router } from "express";
import { paymentStatus } from "../../controllers/paymentStatus/paymentStatusController.js";

const router = Router();

// paymentStatus
router.post("/", paymentStatus);

export default router;
