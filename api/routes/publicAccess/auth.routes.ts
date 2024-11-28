import express from "express";
import {
  authOpenSessionController,
  authVerifyOTPController,
} from "../../controllers/auth/authController.js";
const router = express.Router();

router.post("/open-session", authOpenSessionController);
router.post("/send-verify-otp", authVerifyOTPController);
export default router;
