import Stripe from "stripe";
import mongoose from "mongoose";
import { PaymentAmountCustomerDTO } from "../../controllers/payment/entities/dto/paymentAmountCustomer.dto.js";
import { PaymentAmountVisitorDTO } from "../../controllers/payment/entities/dto/paymentAmountVisitor.dto.js";
import { formatAmount } from "../../utils/format_amount.js";
import { getCartDataService } from "../customer/customerService.js";
import { getProductByIdService } from "../product/productService.js";
import { checkPromocodeService } from "../promocode/promocodeService.js";

export const getPaymentAmountVisitorService = async (
  paymentData: PaymentAmountVisitorDTO
) => {
  return await calculatePaymentAmountService(
    paymentData,
    paymentData.cartProducts,
    paymentData.cartGiftcards
  );
};
export const getPaymentAmountCustomerService = async (
  customerId: string,
  paymentData: PaymentAmountCustomerDTO
) => {
  const customerInfo = await getCartDataService(customerId);

  return await calculatePaymentAmountService(
    paymentData,
    customerInfo.cartProducts,
    customerInfo.giftcardsInCart
  );
};
export const calculatePaymentAmountService = async (
  paymentData: PaymentAmountCustomerDTO | PaymentAmountVisitorDTO,
  cartProducts: Array<{
    productId: string | mongoose.Types.ObjectId;
    quantity: number;
  }>,
  giftcardsInCart: Array<{ amount: number; quantity: number }>
) => {
  const { promocode, cashbackToSpend, giftcardsToUse } = paymentData;

  // Initialisation des variables liées au code promo
  let promocodePercentage = 0;
  let promocodeAmount = 0;

  // Vérification du code promo
  if (promocode) {
    const promocodeInfo = await checkPromocodeService(promocode);
    promocodePercentage = promocodeInfo?.promocodePercentage || 0;
  }

  // Calcul du montant total des produits dans le panier
  let totalProductPrice = 0;
  for (const product of cartProducts) {
    const productInfo = await getProductByIdService(
      product.productId.toString()
    );
    totalProductPrice += productInfo.price * product.quantity;
  }

  // Calcul du montant total des cartes cadeaux dans le panier
  let totalGiftcardPrice = 0;
  for (const giftcard of giftcardsInCart) {
    totalGiftcardPrice += giftcard.amount * giftcard.quantity;
  }

  // Total avant réduction
  const totalAmountBeforePromocode = formatAmount(
    totalProductPrice + totalGiftcardPrice
  );

  // Application du code promo
  promocodeAmount = (totalAmountBeforePromocode * promocodePercentage) / 100;
  const totalAfterPromocode = formatAmount(
    totalAmountBeforePromocode - promocodeAmount
  );

  // Déduction du cashback
  const totalAfterCashback = cashbackToSpend
    ? totalAfterPromocode - cashbackToSpend
    : totalAfterPromocode;

  // Déduction des cartes cadeaux
  let amountGiftcardUsed = 0;
  for (const giftcard of giftcardsToUse || []) {
    amountGiftcardUsed += giftcard.amountToUse;
  }
  const orderAmount = formatAmount(
    Math.max(0, totalAfterCashback - amountGiftcardUsed)
  );

  // Résultat final
  return {
    orderAmount, // Montant final de la commande
    promocodeAmount, // Montant déduit grâce au code promo
    promocodePercentage, // Pourcentage du code promo appliqué
    totalAmountBeforePromocode, // Prix total avant réduction
    giftcardsToUse, // Code et montant des cartes cadeaux utilisées
    amountGiftcardUsed, // Montant total utilisé via les cartes cadeaux
    cashbackToUse: cashbackToSpend || 0, // Cashback utilisé
  };
};
export async function getPaymentIntentService(
  customerId: string,
  paymentData: PaymentAmountCustomerDTO
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const amounts = await getPaymentAmountCustomerService(
    customerId,
    paymentData
  );
  const amount = formatAmount(amounts.orderAmount);

  try {
    // Rechercher un client existant par email
    const existingCustomers = await stripe.customers.list({
      email: paymentData.emailCustomer || undefined,
    });

    let customer;
    if (existingCustomers.data.length > 0) {
      // Utiliser le client existant
      customer = existingCustomers.data[0];
    } else {
      // Créer un nouveau client
      customer = await stripe.customers.create({
        email: paymentData.emailCustomer || undefined,
      });
    }

    const customerId = customer.id;
    const amountFormatStripe = Math.floor(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountFormatStripe,
      currency: "EUR",
      customer: customerId,
    });

    return { clientSecret: paymentIntent.client_secret, amount };
  } catch (error) {}
}
