import { generateToken } from "../../utils/jwt.js";
import { ForbiddenError } from "../../exceptions/CustomErrors.js";
import { sendVerificationEmail } from "../../email/subject/session.js";
import {
  storeAuthCodeRepository,
  verifyAuthCodeRepository,
} from "../../repositories/auth/authRepository.js";
import {
  createCustomerRepository,
  getCustomerByEmailRepository,
  updateCustomerRepository,
} from "../../repositories/customer/customerRepository.js";
import { sendNewClientEmailToAdmin } from "../../email/subject/marketing.js";
// Enregistrer le code d'authentification
export const storeAuthCodeService = async (email, authCode) => {
  await storeAuthCodeRepository(email, authCode);
  sendVerificationEmail(email, authCode);
};
// Vérifier le code d'authentification
export const verifyAuthCodeService = async (
  email,
  otp,
  wishlistProducts,
  cartProducts,
  cartGiftcards
) => {
  const isValid = await verifyAuthCodeRepository(email, otp);
  if (!isValid) {
    throw new ForbiddenError("Invalid OTP or email");
  }
  let customer;
  try {
    customer = await getCustomerByEmailRepository(email);
  } catch (error) {
    // Le customer n'existe pas encore
    sendNewClientEmailToAdmin(email);
    await createCustomerRepository(email);
    const newCustomer = await getCustomerByEmailRepository(email);
    const updateFields = {
      wishlistProducts,
      cartProducts,
      cartGiftcards,
    };
    // Mettre la liste de favoris et son panier contenus dans son localstorage (redux persist)
    await updateCustomerRepository(newCustomer._id.toString(), updateFields);
    customer = await getCustomerByEmailRepository(email);
  }
  // Générer le token JWT
  const token = generateToken(
    customer._id.toString(),
    customer.email,
    customer.role
  );
  return { token, customer };
};
