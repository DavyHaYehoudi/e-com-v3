import {
  marketingTransporter,
  paymentTransporter,
  sessionTransporter,
} from "../config/emailConfig.js";
// Fonction pour envoyer un email avec un transporteur spécifique
const sendEmail = async (transporter, mailOptions) => {
  try {
    const defaultMailOptions = Object.assign(
      {
        from: transporter.options.auth.user,
        bcc: transporter.options.auth.user,
      },
      mailOptions
    );
    const info = await transporter.sendMail(defaultMailOptions);
    console.log(`Email envoyé avec succès: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    throw error;
  }
};
// Fonction pour envoyer un email de vérification (SESSION)
export const sendOTPEmail = async (mailOptions) => {
  return sendEmail(sessionTransporter, mailOptions);
};
// Fonction pour informer l'admin d'un nouveau client
export const sendNewClientEmail = async (mailOptions) => {
  return sendEmail(marketingTransporter, mailOptions);
};
// Fonction pour envoyer un email de paiement (PAYMENT)
export const sendPaymentEmail = async (mailOptions) => {
  return sendEmail(paymentTransporter, mailOptions);
};
// Fonction pour envoyer un email marketing (MARKETING)
export const sendMarketingEmail = async (mailOptions) => {
  return sendEmail(marketingTransporter, mailOptions);
};
