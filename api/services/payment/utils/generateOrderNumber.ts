import crypto from "crypto";

// Fonction pour générer un code alphanumérique de 9 caractères
export const generateOrderNumber = (): string => {
  const code = crypto.randomBytes(5).toString('hex').toUpperCase(); // Génère 10 caractères hexadécimaux (5 octets)
  return code.slice(0, 9); // Tronque à 9 caractères
};
