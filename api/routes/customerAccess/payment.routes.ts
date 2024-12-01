import { Router } from "express";
import {
  getPaymentAmountCustomer,
  getPaymentIntent,
} from "../../controllers/payment/paymentController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
const router = Router();

// paymentAmount
router.post("/customer/amount", verifyToken, getPaymentAmountCustomer);
router.post("/intent", verifyToken, getPaymentIntent);

export default router;
