import { sendOTPEmail } from "../../email/service/emailService.js";

export const sendVerificationEmail = async (email: string, OTP: string) => {
  const mailOptions = {
    to: email,
    subject: "Vérifiez votre adresse e-mail",
    html: `
      <div style="text-align: center; font-family: Arial, sans-serif;padding:20px 10px">
        <p style="font-size: 18px;">Bonjour 👋</p>
        <p style="font-size: 16px;">Veuillez recopier sur le site ce code à 6 chiffres pour vérifier votre adresse e-mail :</p>
        <p style="font-size: 32px; font-weight: bold; letter-spacing: 4px; display: inline-block; background-color: #f0f0f0; padding: 10px; border-radius: 5px;">${OTP}</p>
        <p style="font-size: 14px; font-weight: bold;">Ce code est valable 5 minutes.</p>
        <p style="font-size: 14px;">À tout de suite 🙂</p>
      </div>
    `,
  };

  try {
    await sendOTPEmail(mailOptions);
    console.log("Email de vérification envoyé à", email);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de vérification:", error);
  }
};
