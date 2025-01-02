import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { updatePaymentStatusFromCustomer } from "../../controllers/paymentStatus/paymentStatusController.js";
import {
  confirmationOrder,
  getPaymentAmountCustomer,
  getPaymentIntent,
} from "../../controllers/paymentStatus/payment/paymentController.js";
const router = Router();
// paymentAmount
router.post("/customer/amount", verifyToken, getPaymentAmountCustomer);
router.post("/intent", verifyToken, getPaymentIntent);
router.post("/confirm", verifyToken, confirmationOrder);
router.patch("/status", verifyToken, updatePaymentStatusFromCustomer);
export default router;
