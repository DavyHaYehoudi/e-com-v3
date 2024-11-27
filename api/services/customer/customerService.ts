import { FieldsUpdateCustomerDTO } from "../../controllers/customer/entities/dto/customer.dto.js";
import {
  createCustomerRepository,
  getCustomerByIdRepository,
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
