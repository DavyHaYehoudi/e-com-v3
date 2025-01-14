import { sendPaymentEmail } from "../service/emailService.js";
import { formatDate } from "../../utils/formatDate.js";
export const sendPaymentConfirmationEmail = async (customer, orderDetailsForEmail) => {
    var _a;
    const giftCardsList = orderDetailsForEmail.giftcardsCreated;
    const giftcardsUsedList = orderDetailsForEmail.giftcardsUsed;
    const productsList = orderDetailsForEmail.orderItems;
    const currentYear = new Date().getFullYear();
    // Section pour les cartes cadeaux utilisées
    const giftcardsAmountUsedTotal = (_a = giftcardsUsedList === null || giftcardsUsedList === void 0 ? void 0 : giftcardsUsedList.reduce((total, gift) => total + gift.amountUsed, 0)) !== null && _a !== void 0 ? _a : 0;
    const giftcardsUsedTable = giftcardsUsedList.length > 0
        ? `
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #f9f9f9;">
    <thead>
      <tr style="background-color: #e0e0e0;">
        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Code de la Carte Cadeau</th>
        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Montant Utilisé</th>
        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Montant Restant</th>
        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Date d'Expiration</th>
      </tr>
    </thead>
    <tbody>
      ${giftcardsUsedList
            .map((card) => `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${card.code}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${card.amountUsed} €</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${card.balance} €</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${formatDate(card.expirationDate)}</td>
        </tr>
      `)
            .join("")}
    </tbody>
  </table>
`
        : "<p>Aucune carte cadeau utilisée pour cette commande.</p>";
    // Création du tableau des cartes cadeaux créées
    const giftCardsTable = giftCardsList.length > 0
        ? `
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #f9f9f9;">
      <thead>
        <tr style="background-color: #e0e0e0;">
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Code de la Carte Cadeau</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Montant</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Date d'Expiration</th>
        </tr>
      </thead>
      <tbody>
        ${giftCardsList
            .map((card) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${card.code}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${card.balance} €</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${formatDate(card.expirationDate)}</td>
          </tr>
        `)
            .join("")}
      </tbody>
    </table>
  `
        : "<p>Aucune carte cadeau achetée pour cette commande.</p>";
    // Création du tableau des produits
    const productsTable = productsList.length > 0
        ? `
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #f9f9f9;">
      <thead>
        <tr style="background-color: #e0e0e0;">
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Produit</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Prix Avant Réduction</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Pourcentage de Réduction</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantité</th>
        </tr>
      </thead>
      <tbody>
        ${productsList
            .map((product) => `
          <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${product.name + (product.variant ? " " + product.variant : "")}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${product.priceBeforePromotionOnProduct} €</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${product.promotionPercentage
            ? product.promotionPercentage + "%"
            : "Aucun"}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${product.articleNumber}</td>
          </tr>
        `)
            .join("")}
      </tbody>
    </table>
  `
        : "<p>Aucun produit acheté dans cette commande.</p>";
    // Options de l'email
    const mailOptions = {
        to: customer.email,
        subject: "Création de votre commande",
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="text-align: center; color: #4CAF50;">Merci pour votre achat, ${customer.firstName || "cher client"} !</h2>
        <p style="font-size: 16px;">Votre commande a été créée avec succès.</p>
        <p><strong>Numéro de commande :</strong> ${orderDetailsForEmail.orderNumber}</p>
        <p><strong>Total net de la commande :</strong> ${orderDetailsForEmail.totalPrice} €</p>
        <p><strong>Nombre total d'articles :</strong> ${orderDetailsForEmail.totalNumberArticles}</p>
        <p><strong>Cashback gagné :</strong> ${orderDetailsForEmail.cashbackEarned} €</p>
        <p><strong>Cashback dépensé :</strong> ${orderDetailsForEmail.cashbackSpent} €</p>
        <p><strong>Montant de la réduction (code promo) :</strong> ${orderDetailsForEmail.promocodeAmount} €</p>
        <p><strong>Total des promotions sur les produits :</strong> ${orderDetailsForEmail.totalPromotionOnProduct} €</p>
        <p><strong>Montant total des cartes cadeaux utilisées :</strong> ${giftcardsAmountUsedTotal
            ? giftcardsAmountUsedTotal + " €"
            : "Aucune carte cadeau utilisée."}</p>
        
        <h3 style="text-align: center;">Détails des produits</h3>
        ${productsTable}
        <h3 style="text-align: center;">Détails des cartes cadeaux utilisées</h3>
        ${giftcardsUsedTable}
        <h3 style="text-align: center;">Détails des cartes cadeaux achetées</h3>
        ${giftCardsTable}

        <p style="text-align: center;">Nous vous remercions de votre confiance et restons à votre disposition pour toute question.</p>
        <!-- Pied de page -->
        <footer style="text-align: center; margin-top: 40px; font-size: 14px; color: #777;">
          <p>© ${currentYear} Atelier Noralya. Tous droits réservés.</p>
        </footer>
      </div>
    `,
    };
    try {
        await sendPaymentEmail(mailOptions);
        console.log("Email de confirmation de paiement envoyé à", customer.email);
    }
    catch (error) {
        console.error("Erreur lors de l'envoi de l'email de paiement:", error);
    }
};
