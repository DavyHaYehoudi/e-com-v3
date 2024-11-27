import { FieldsUpdateCustomerDTO } from "../../controllers/customer/entities/dto/customer.dto";
import { NotFoundError } from "../../exceptions/CustomErrors";
import Customer from "../../models/customer/customer.schema";

export const createCustomerRepository = async (email: string) => {
  try {
    // Création du document
    const newCustomer = await Customer.create({ email });

    // Retourne le document complet
    return newCustomer;
  } catch (error: any) {
    throw error;
  }
};
export const getCustomerByIdRepository = async (id: string) => {
  try {
    // Recherche du client par ID
    const customer = await Customer.findById(id);

    if (!customer) {
      throw new NotFoundError("Client introuvable avec cet ID.");
    }

    return customer;
  } catch (error: any) {
    throw error;
  }
};
export const getCustomerByEmailRepository = async (email: string) => {
  try {
    // Recherche du client par email
    const customer = await Customer.findOne({ email });

    if (!customer) {
      throw new NotFoundError("Client introuvable avec cet email.");
    }

    return customer;
  } catch (error: any) {
    throw error;
  }
};


export const updateCustomerRepository = async (
  customerId: string,
  updateData: FieldsUpdateCustomerDTO
) => {
  try {
    // Mise à jour des informations du client
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { $set: updateData }, // On met à jour uniquement les champs fournis
      { new: true, runValidators: true } // Retourne l'objet mis à jour et applique les validateurs
    );

    // Si le client n'existe pas
    if (!updatedCustomer) {
      throw new NotFoundError("Client introuvable avec cet ID.");
    }

    return updatedCustomer;
  } catch (error: any) {
    throw error;
  }
};
