import { SentMessageInfo } from "nodemailer";
import { marketingTransporter, paymentTransporter, sessionTransporter } from "../config/emailConfig.js";

// Interface pour les options de mail
interface MailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  bcc?: string;
}

// Fonction pour envoyer un email avec un transporteur spécifique
const sendEmail = async (transporter: any, mailOptions: MailOptions): Promise<SentMessageInfo> => {
  try {
    const defaultMailOptions = {
      from: transporter.options.auth.user, // Utiliser l'adresse du transporteur en tant qu'expéditeur
      bcc: transporter.options.auth.user,  // Copie cachée à l'expéditeur
      ...mailOptions,                      // Merge avec les options passées
    };

    const info = await transporter.sendMail(defaultMailOptions);
    console.log(`Email envoyé avec succès: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    throw error;
  }
};

// Fonction pour envoyer un email de vérification (SESSION)
export const sendOTPEmail = async (mailOptions: MailOptions) => {
  return sendEmail(sessionTransporter, mailOptions);
};

// Fonction pour informer l'admin d'un nouveau client
export const sendNewClientEmail = async (mailOptions: MailOptions) => {
  return sendEmail(marketingTransporter, mailOptions);
};

// Fonction pour envoyer un email de paiement (PAYMENT)
export const sendPaymentEmail = async (mailOptions: MailOptions) => {
  return sendEmail(paymentTransporter, mailOptions);
};

// Fonction pour envoyer un email marketing (MARKETING)
export const sendMarketingEmail = async (mailOptions: MailOptions) => {
  return sendEmail(marketingTransporter, mailOptions);
};
