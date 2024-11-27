// import { GiftCardSendEmail } from "../../repositories/gift-card/dao/gift-card.dao.js";
// import { ProductSendEmail } from "../../repositories/product/dao/product.dao.js";
// import { sendPaymentEmail } from "../../email/service/emailService.js";

// export const sendPaymentConfirmationEmail = async (
//   customer: { email: string; firstName: string },
//   orderDetails: {
//     order: {
//       confirmation_number: string;
//       total_price: number;
//       shipping_price: number;
//       cashbackEarneded: number;
//       cashbackSpent: number;
//       code_promo_amount: number;
//       total_promo_products: number;
//       total_weight: number | null;
//       total_giftCardUsed: number | null;
//     };
//     giftCards: GiftCardSendEmail[];
//     products: ProductSendEmail[];
//   }
// ) => {
//   const { order } = orderDetails;
//   const giftCardsList = orderDetails.giftCards;
//   const productsList = orderDetails.products;

//   // Création du tableau des cartes cadeaux
//   const giftCardsTable =
//     giftCardsList.length > 0
//       ? `
//     <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #f9f9f9;">
//       <thead>
//         <tr style="background-color: #e0e0e0;">
//           <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Code de la Carte Cadeau</th>
//           <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Montant</th>
//           <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Solde</th>
//           <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Date d'Expiration</th>
//         </tr>
//       </thead>
//       <tbody>
//         ${giftCardsList
//           .map(
//             (card: GiftCardSendEmail) => `
//           <tr>
//             <td style="border: 1px solid #ddd; padding: 8px;">${card.code}</td>
//             <td style="border: 1px solid #ddd; padding: 8px;">${
//               card.amount
//             } €</td>
//             <td style="border: 1px solid #ddd; padding: 8px;">${
//               card.balance
//             } €</td>
//             <td style="border: 1px solid #ddd; padding: 8px;">${new Date(
//               card.expirationDate
//             ).toLocaleDateString()}</td>
//           </tr>
//         `
//           )
//           .join("")}
//       </tbody>
//     </table>
//   `
//       : "<p>Aucune carte cadeau achetée pour cette commande.</p>";

//   // Création du tableau des produits
//   const productsTable =
//     productsList.length > 0
//       ? `
//     <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #f9f9f9;">
//       <thead>
//         <tr style="background-color: #e0e0e0;">
//           <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Produit</th>
//           <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Prix Avant Réduction</th>
//           <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Pourcentage de Réduction</th>
//           <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantité</th>
//         </tr>
//       </thead>
//       <tbody>
//         ${productsList
//           .map(
//             (product: ProductSendEmail) => `
//           <tr>
//             <td style="border: 1px solid #ddd; padding: 8px;">${
//               product.name + " " + product?.variant
//             }</td>
//             <td style="border: 1px solid #ddd; padding: 8px;">${
//               product.price_before_discount
//             } €</td>
//             <td style="border: 1px solid #ddd; padding: 8px;">${
//               product.discount_percentage
//                 ? product.discount_percentage + "%"
//                 : "Aucun"
//             }</td>
//             <td style="border: 1px solid #ddd; padding: 8px;">${product.article_number}</td>
//           </tr>
//         `
//           )
//           .join("")}
//       </tbody>
//     </table>
//   `
//       : "<p>Aucun produit acheté dans cette commande.</p>";

//   // Options de l'email
//   const mailOptions = {
//     to: customer.email,
//     subject: "Création de votre commande",
//     html: `
//       <div style="font-family: Arial, sans-serif; padding: 20px;">
//         <h2 style="text-align: center; color: #4CAF50;">Merci pour votre achat, ${
//           customer.firstName || "cher client"
//         } !</h2>
//         <p style="font-size: 16px;">Votre commande a été créée avec succès.</p>
//         <p><strong>Numéro de commande :</strong> ${
//           order.confirmation_number
//         }</p>
//         <p><strong>Total net de la commande :</strong> ${order.total_price} €</p>
//         <p><strong>Coût de la livraison :</strong> ${order.shipping_price} €</p>
//         <p><strong>Cashback gagné :</strong> ${order.cashbackEarneded} €</p>
//         <p><strong>Cashback dépensé :</strong> ${order.cashbackSpent} €</p>
//         <p><strong>Montant de la réduction (code promo) :</strong> ${
//           order.code_promo_amount
//         } €</p>
//         <p><strong>Total des promotions sur les produits :</strong> ${
//           order.total_promo_products
//         } €</p>
//         <p><strong>Poids total des articles :</strong> ${
//           order.total_weight ? order.total_weight + " g" : "Non renseigné"
//         }</p>
//         <p><strong>Montant total des cartes cadeaux utilisées :</strong> ${
//           order.total_giftCardUsed
//             ? order.total_giftCardUsed + " €"
//             : "Aucune carte cadeau utilisée."
//         }</p>
        
//         <h3 style="text-align: center;">Détails des produits</h3>
//         ${productsTable}

//         <h3 style="text-align: center;">Détails des cartes cadeaux achetées</h3>
//         ${giftCardsTable}

//         <p style="text-align: center;">Nous vous remercions de votre confiance et restons à votre disposition pour toute question.</p>
//       </div>
//     `,
//   };

//   try {
//     await sendPaymentEmail(mailOptions);
//     console.log("Email de confirmation de paiement envoyé à", customer.email);
//   } catch (error) {
//     console.error("Erreur lors de l'envoi de l'email de paiement:", error);
//   }
// };
