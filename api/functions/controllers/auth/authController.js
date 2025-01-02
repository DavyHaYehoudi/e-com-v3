import { authRequestSchema } from "./entities/dto/auth.dto.js";
import {
  storeAuthCodeService,
  verifyAuthCodeService,
} from "../../services/auth/authService.js";
import { generateSixDigitCode } from "../../utils/digit_code.js";
// Ouvrir une session d'authentification (envoyer un OTP)
export const authOpenSessionController = async (req, res, next) => {
  try {
    authRequestSchema.pick({ email: true }).parse(req.body);
    const { email } = req.body;
    const authCode = generateSixDigitCode();
    console.log("Generated 6-digit code:", authCode);
    await storeAuthCodeService(email, authCode);
    res.status(201).json({
      message: "Authentication code sent",
    });
  } catch (error) {
    next(error);
  }
};
// Vérifier le code OTP
export const authVerifyOTPController = async (req, res, next) => {
  try {
    const authData = authRequestSchema.parse(req.body);
    const { email, otp, wishlistProducts, cartProducts, cartGiftcards } =
      authData;
    const result = await verifyAuthCodeService(
      email,
      otp,
      wishlistProducts,
      cartProducts,
      cartGiftcards
    );
    res.status(201).json({ token: result.token });
  } catch (error) {
    next(error);
  }
};
