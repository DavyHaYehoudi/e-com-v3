import Auth from "../../models/auth/auth.schema.js";
import { addMinutes } from "date-fns";
// Insérer ou mettre à jour le code d'authentification avec une expiration de 5 minutes
export const storeAuthCodeRepository = async (email, authCode) => {
  const expiresAt = addMinutes(new Date(), 5); // Expiration dans 5 minutes
  await Auth.updateOne(
    { email }, // Condition de recherche
    {
      $set: { digitCode: authCode, expiresAt }, // Champs à mettre à jour
    },
    { upsert: true } // Si le document n'existe pas, il est créé
  );
};
// Vérifier l'authentification (email + code + expiration)
export const verifyAuthCodeRepository = async (email, otp) => {
  const auth = await Auth.findOne({
    email,
    digitCode: otp,
    expiresAt: { $gt: new Date() }, // Vérifie si la date d'expiration est dans le futur
  });
  return auth !== null; // Retourne true si un document est trouvé
};
