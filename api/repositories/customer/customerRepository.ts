import {
  CashbackTypeDTO,
  FieldsUpdateCustomerDTO,
} from "../../controllers/customer/entities/dto/customer.dto.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";
import Customer from "../../models/customer/customer.schema.js";

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
    // Recherche du client par ID avec les produits associés
    const customer = await Customer.findById(id)
      .populate({
        path: "cartProducts.productId",
        model: "Product",
      })
      .populate({
        path: "wishlistProducts",
        model: "Product",
      });

    if (!customer) {
      throw new NotFoundError("Client not found with this ID.");
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
      throw new NotFoundError("Client not found with this email.");
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
      throw new NotFoundError("Client not found with this ID");
    }

    return updatedCustomer;
  } catch (error: any) {
    throw error;
  }
};
export const getAllCustomersRepository = async () => {
  try {
    // Récupère tous les clients
    const customers = await Customer.find().sort({ createdAt: -1 }); // Trie par date décroissante (les plus récentes en premier);
    return customers;
  } catch (error: any) {
    throw error;
  }
};
export const getCashbackHistoryCustomer = async (customerId: string) => {
  try {
    // Récupère l'historique de cashback du client
    const customer = await Customer.findById(customerId).sort({ createdAt: -1 }); // Trie par date décroissante (les plus récentes en premier);
    if (!customer) {
      throw new NotFoundError("Client not found with this ID.");
    }
    return customer.cashback;
  } catch (error: any) {
    throw error;
  }
};
export const updateCashbackCustomerRepository = async (
  customerId: string,
  updatedCashback: CashbackTypeDTO
) => {
  try {
    // Mise à jour des informations du client
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { $push: { cashback: updatedCashback } },
      { new: true, runValidators: true }
    );

    // Si le client n'existe pas
    if (!updatedCustomer) {
      throw new NotFoundError("Client not found with this ID.");
    }

    return updatedCustomer;
  } catch (error: any) {
    throw error;
  }
};
export const updateCustomerOrderStatsRepository = async (
  customerId: string,
  amountToAdd: number
) => {
  try {
    // Mise à jour des champs
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      {
        $inc: {
          ordersTotalCount: 1, // Incrémente ordersTotalCount de 1
          ordersTotalAmount: amountToAdd, // Ajoute amountToAdd à ordersTotalAmount
        },
      },
      { new: true, runValidators: true }
    );

    // Si aucun client trouvé
    if (!updatedCustomer) {
      throw new NotFoundError("Client not found with this ID.");
    }

    return updatedCustomer;
  } catch (error: any) {
    throw error;
  }
};
export const getCustomersWithEmailMarketingConsentRepository = async () => {
  try {
    // Recherche des clients avec consentement de marketing
    const customers = await Customer.find({ emailMarketingConsent: true });
    return customers;
  } catch (error: any) {
    throw error;
  }
};
export const getTodayBirthdayCustomersRepository = async () => {
  const today = new Date();

  // Requête pour trouver les clients ayant leur anniversaire aujourd'hui
  return await Customer.find({
    $expr: {
      $and: [
        { $eq: [{ $dayOfMonth: "$birthdate" }, today.getDate()] },
        { $eq: [{ $month: "$birthdate" }, today.getMonth() + 1] },
      ],
    },
  }).lean(); // Utilise lean() pour un retour d'objet simple
};
