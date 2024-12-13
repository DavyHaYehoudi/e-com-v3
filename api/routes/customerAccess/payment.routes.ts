import { Router } from "express";
import {
  confirmationOrder,
  getPaymentAmountCustomer,
  getPaymentIntent,
} from "../../controllers/payment/paymentController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { updatePaymentStatusFromCustomer } from "../../controllers/paymentStatus/paymentStatusController.js";
const router = Router();

// paymentAmount
router.post("/customer/amount", verifyToken, getPaymentAmountCustomer);
router.post("/intent", verifyToken, getPaymentIntent);
router.post("/confirm", verifyToken, confirmationOrder);
router.patch("/status", verifyToken, updatePaymentStatusFromCustomer);

export default router;
