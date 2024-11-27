import nodemailer from "nodemailer";
import { environment } from "../../environment.js";

// Fonction pour créer un transporteur en fonction du type d'email
const createTransporter = (host: string, port: number, user: string, pass: string) => {
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // Port 465 pour un transport sécurisé
    auth: {
      user,
      pass,
    },
  });
};

// Transporteurs pour chaque type d'email
export const sessionTransporter = createTransporter(
  environment.HOST_SESSION,
  environment.PORT_SESSION,
  environment.EMAIL_USERNAME_SESSION,
  environment.EMAIL_PASSWORD_SESSION
);

export const paymentTransporter = createTransporter(
  environment.HOST_PAYMENT,
  environment.PORT_PAYMENT,
  environment.EMAIL_USERNAME_PAYMENT,
  environment.EMAIL_PASSWORD_PAYMENT
);

export const marketingTransporter = createTransporter(
  environment.HOST_MARKETING,
  environment.PORT_MARKETING,
  environment.EMAIL_USERNAME_MARKETING,
  environment.EMAIL_PASSWORD_MARKETING
);
