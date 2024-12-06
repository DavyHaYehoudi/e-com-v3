import { getCustomer } from "../../controllers/customer/customerController.js";
import {
  CashbackTypeDTO,
  FieldsUpdateCustomerDTO,
} from "../../controllers/customer/entities/dto/customer.dto.js";
import {
  sendBirthdayToCustomer,
  sendCashbackCorrectionToCustomer,
  sendCashbackEarnedToCustomer,
} from "../../email/subject/marketing.js";
import {
  createCustomerRepository,
  getAllCustomersRepository,
  getCashbackHistoryCustomer,
  getCustomerByIdRepository,
  getCustomersWithEmailMarketingConsentRepository,
  getTodayBirthdayCustomersRepository,
  updateCashbackCustomerRepository,
  updateCustomerOrderStatsRepository,
  updateCustomerRepository,
} from "../../repositories/customer/customerRepository.js";

// Créer un customer
export const createCustomerService = async (email: string) => {
  await createCustomerRepository(email);
};
// Récupérer le customer
export const getCustomerService = async (customerId: string) => {
  const customer = await getCustomerByIdRepository(customerId);

  // Convertir le document Mongoose en JSON brut
  const customerData = customer.toJSON();

  // Formatage des données cartProducts
  const formattedCartProducts = customerData.cartProducts.map((cartProduct: any) => {
    const { productId, quantity, variant, _id } = cartProduct;

    return {
      ...productId, // Les données du produit
      quantity,
      variant,
      cartItemId: _id, // Renomme `_id` pour l'élément du panier
    };
  });

  return {
    ...customerData, // Copie les autres données du client
    cartProducts: formattedCartProducts, // Remplace cartProducts par la version formatée
  };
};

// Mettre à jour ou créer le profil du customer
export const updateCustomerService = async (
  customerId: string,
  fields: FieldsUpdateCustomerDTO
) => {
  await updateCustomerRepository(customerId, fields);
};
// Mettre à jour les stats order du customer suite à une commande créée
export const updateCustomerOrderStatsService = async (
  customerId: string,
  amountToAdd: number
) => {
  await updateCustomerOrderStatsRepository(customerId, amountToAdd);
};
// Admin access
export const getCustomersService = async () => {
  return await getAllCustomersRepository();
};

export const getCashbackHistoryCustomerService = async (customerId: string) => {
  return await getCashbackHistoryCustomer(customerId);
};
export const updateCashbackCustomerService = async (
  customerId: string,
  updatedCashback: CashbackTypeDTO
) => {
  const customerInfo = await getCustomerByIdRepository(customerId);
  if (updatedCashback.label === "correction") {
    // C'est forcément une correction de l'admin
    sendCashbackCorrectionToCustomer(
      customerInfo.email,
      updatedCashback.cashbackSpent
    );
  } else if (updatedCashback.label === "birthday") {
    sendBirthdayToCustomer(
      customerInfo.email,
      customerInfo.firstName,
      updatedCashback.cashbackEarned
    );
  } else {
    // C'est donc au choix  label: "loyalty" | "order" | "other" | "review" | "referral";
    sendCashbackEarnedToCustomer(
      customerInfo.email,
      customerInfo.firstName,
      updatedCashback.cashbackEarned,
      updatedCashback.label
    );
  }

  return await updateCashbackCustomerRepository(customerId, updatedCashback);
};

// Récupérer tous les customers qui ont consenti aux emails marketing
export const getCustomersWithEmailMarketingConsentService = async () => {
  return await getCustomersWithEmailMarketingConsentRepository();
};

// Récupérer les customers dont c'est l'anniversaire
export const getTodayBirthdayCustomersService = async () => {
  return await getTodayBirthdayCustomersRepository();
};

export const getCartDataService = async (customerId: string) => {
  const customerInfo = await getCustomerService(customerId);
  return {
    cartProducts: customerInfo.cartProducts || [],
    giftcardsInCart: customerInfo.cartGiftcards || [],
  };
};
