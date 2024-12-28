import { sendPaymentEmail } from "../../email/service/emailService.js";
import { GiftCardDocument } from "../../models/giftcard/giftcard.schema.js";
import { giftcardsUsedFormattedEmail } from "../../models/types/giftcardType.js";
import { OrderItemType } from "../../models/types/orderItemType.js";
import { formatDate } from "../../utils/formatDate.js";

export const sendPaymentConfirmationEmail = async (
  customer: { email: string; firstName: string },
  orderDetailsForEmail: {
    orderNumber: string;
    totalPrice: number;
    cashbackEarned: number;
    cashbackSpent: number;
    totalPromotionOnProduct: number;
    giftcardsCreated: GiftCardDocument[] | [];
    giftcardsUsed: giftcardsUsedFormattedEmail[] | [];
    orderItems: OrderItemType[];
    promocodeAmount: number;
    promocodePercentage: number;
    totalNumberArticles:number;
  }
) => {
  const giftCardsList = orderDetailsForEmail.giftcardsCreated;
  const giftcardsUsedList = orderDetailsForEmail.giftcardsUsed;
  const productsList = orderDetailsForEmail.orderItems;
  // Section pour les cartes cadeaux utilisées
  const giftcardsAmountUsedTotal = giftcardsUsedList.reduce(
    (total, gift) => total + gift.amountUsed,
    0
  );
  const giftcardsUsedTable =
    giftcardsUsedList.length > 0
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
        .map(
          (card: giftcardsUsedFormattedEmail) => `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${card.code}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            card.amountUsed
          } €</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            card.balance
          } €</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${formatDate(
              card.expirationDate
            )}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>
`
      : "<p>Aucune carte cadeau utilisée pour cette commande.</p>";
  // Création du tableau des cartes cadeaux créées
  const giftCardsTable =
    giftCardsList.length > 0
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
          .map(
            (card: GiftCardDocument) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${card.code}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              card.balance
            } €</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${formatDate(
              card.expirationDate
            )}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `
      : "<p>Aucune carte cadeau achetée pour cette commande.</p>";

  // Création du tableau des produits
  const productsTable =
    productsList.length > 0
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
          .map(
            (product: OrderItemType) => `
          <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            product.name + (product.variant ? " " + product.variant : "")
          }</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              product.priceBeforePromotionOnProduct
            } €</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              product.promotionPercentage
                ? product.promotionPercentage + "%"
                : "Aucun"
            }</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              product.articleNumber
            }</td>
          </tr>
        `
          )
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
        <h2 style="text-align: center; color: #4CAF50;">Merci pour votre achat, ${
          customer.firstName || "cher client"
        } !</h2>
        <p style="font-size: 16px;">Votre commande a été créée avec succès.</p>
        <p><strong>Numéro de commande :</strong> ${
          orderDetailsForEmail.orderNumber
        }</p>
        <p><strong>Total net de la commande :</strong> ${
          orderDetailsForEmail.totalPrice
        } €</p>
        <p><strong>Nombre total d'articles :</strong> ${
          orderDetailsForEmail.totalNumberArticles
        }</p>
        <p><strong>Cashback gagné :</strong> ${
          orderDetailsForEmail.cashbackEarned
        } €</p>
        <p><strong>Cashback dépensé :</strong> ${
          orderDetailsForEmail.cashbackSpent
        } €</p>
        <p><strong>Montant de la réduction (code promo) :</strong> ${
          orderDetailsForEmail.promocodeAmount
        } €</p>
        <p><strong>Total des promotions sur les produits :</strong> ${
          orderDetailsForEmail.totalPromotionOnProduct
        } €</p>
        <p><strong>Montant total des cartes cadeaux utilisées :</strong> ${
          giftcardsAmountUsedTotal
            ? giftcardsAmountUsedTotal + " €"
            : "Aucune carte cadeau utilisée."
        }</p>
        
        <h3 style="text-align: center;">Détails des produits</h3>
        ${productsTable}
        <h3 style="text-align: center;">Détails des cartes cadeaux utilisées</h3>
        ${giftcardsUsedTable}
        <h3 style="text-align: center;">Détails des cartes cadeaux achetées</h3>
        ${giftCardsTable}

        <p style="text-align: center;">Nous vous remercions de votre confiance et restons à votre disposition pour toute question.</p>
      </div>
    `,
  };

  try {
    await sendPaymentEmail(mailOptions);
    console.log("Email de confirmation de paiement envoyé à", customer.email);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de paiement:", error);
  }
};
