import {
  CashbackTypeDTO,
  FieldsUpdateCustomerDTO,
} from "../../controllers/customer/entities/dto/customer.dto.js";
import {
  createCustomerRepository,
  getAllCustomersRepository,
  getCashbackHistoryCustomer,
  getCustomerByIdRepository,
  getCustomersWithEmailMarketingConsentRepository,
  getTodayBirthdayCustomersRepository,
  updateCashbackCustomer,
  updateCustomerOrderStatsRepository,
  updateCustomerRepository,
} from "../../repositories/customer/customerRepository.js";

// Créer un customer
export const createCustomerService = async (email: string) => {
  await createCustomerRepository(email);
};
// Récupérer le customer
export const getCustomerService = async (customerId: string) => {
  return await getCustomerByIdRepository(customerId);
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
  return await updateCashbackCustomer(customerId, updatedCashback);
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
