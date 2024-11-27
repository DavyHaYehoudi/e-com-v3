import * as profileRepository from "../../repositories/customer/profileRepository.js";
import { addMinutes } from "date-fns";
import * as authRepository from "../../repositories/auth/authRepository.js";
import { generateToken } from "../../utils/jwt.js";
import { ForbiddenError } from "../../exceptions/CustomErrors.js";
import { sendVerificationEmail } from "../../email/subject/session.js";
import { sendNewClientEmailToAdmin } from "../../email/subject/marketing.js";

import * as wishlistRepository from "../../repositories/customer/wishlistRepository.js";
import * as cartRepository from "../../repositories/customer/cartRepository.js";
import { CartGiftcards, CartProducts, WishlistProducts } from "../../controllers/auth/entities/dto/auth.dto.js";

// Enregistrer le code d'authentification
export const storeAuthCodeService = async (email: string, authCode: string) => {
  const expirationTime = addMinutes(new Date(), 5); // Expiration dans 5 minutes
  await authRepository.storeAuthCodeRepository(email, authCode, expirationTime);
  sendVerificationEmail(email, authCode);
};

// Vérifier le code d'authentification
export const verifyAuthCodeService = async (
  email: string,
  otp: string, 
  wishlistProducts:WishlistProducts, cartProducts:CartProducts, cartGiftcards:CartGiftcards
) => {
  const isValid = await authRepository.verifyAuthCodeRepository(email, otp);
  if (!isValid) {
    throw new ForbiddenError("Invalid OTP or email");
  }

//   let customer = await profileRepository.getCustomerByEmailRepository(email);
//   // Si ce n'était pas encore un client enregistré
//   if (!customer) {
//     sendNewClientEmailToAdmin(email);
//     await profileRepository.addProfileRepository(email);
//     const newCustomer = await profileRepository.getCustomerByEmailRepository(
//       email
//     );
//     // Mettre à jour le panier et la liste de favoris contenus dans son localstorage
//     if (wishlist.length > 0) {
//       wishlist.forEach(
//         async (item) =>
//           await wishlistRepository.updateCustomerWishlistRepository(
//             newCustomer.id,
//             { items: [item] }
//           )
//       );
//     }
//     if (cart.items.length > 0 || cart.gift_cards.length > 0) {
//       await cartRepository.updateCustomerCartRepository(newCustomer.id, cart);
//     }
//     customer = await profileRepository.getCustomerByEmailRepository(email);
//   }

  // Générer le token JWT
  const token = generateToken(customer.id, customer.email, customer.role);
  return { token, customer };
};
