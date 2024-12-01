import Stripe from "stripe";
import mongoose from "mongoose";
import { PaymentAmountCustomerDTO } from "../../controllers/payment/entities/dto/paymentAmountCustomer.dto.js";
import { PaymentAmountVisitorDTO } from "../../controllers/payment/entities/dto/paymentAmountVisitor.dto.js";
import { formatAmount } from "../../utils/format_amount.js";
import {
  getCartDataService,
  updateCustomerService,
} from "../customer/customerService.js";
import {
  getProductByIdService,
  updateProductService,
  updateProductStockService,
} from "../product/productService.js";
import { checkPromocodeService } from "../promocode/promocodeService.js";
import { PaymentConfirmationDTO } from "../../controllers/payment/entities/dto/paymentConfirmation.dto.js";
import { generateOrderNumber } from "./utils/generateOrderNumber.js";
import { getOrderStatusService } from "../orderStatus/orderStatusService.js";
import { getPaymentStatusService } from "../paymentStatus/paymentStatusService.js";
import { updateCashbackCustomer } from "../../repositories/customer/customerRepository.js";
import {
  createGiftcardWhenOrderService,
  updateGiftcardBalanceService,
} from "../giftcard/giftcardService.js";

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
  const cartInfo = await getCartDataService(customerId);

  return await calculatePaymentAmountService(
    paymentData,
    cartInfo.cartProducts,
    cartInfo.giftcardsInCart
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
export const createOrderService = async (
  customerId: string,
  paymentConfirmationData: PaymentConfirmationDTO
) => {
  // Initialisation des variables
  let cashbackToEarn = 0;
  let giftcardsCreated = [];

  // 1. Générer un numéro de commande
  const orderNumber = generateOrderNumber();
  // 2. Récupérer les informations des statuts de payment et de commandes
  const orderStatus = await getOrderStatusService();
  const paymentsStatus = await getPaymentStatusService();
  // 3. Récupérer les détails de la commande
  const { promocode, cashbackToSpend, giftcardsToUse } =
    paymentConfirmationData;
  const paymentData = {
    promocode,
    cashbackToSpend,
    giftcardsToUse,
    emailCustomer: null,
  };
  const paymentDetails = await getPaymentAmountCustomerService(
    customerId,
    paymentData
  );
  //4. Récupérer les détails du panier
  const cartInfo = await getCartDataService(customerId);
  const giftcardsInCart = cartInfo.giftcardsInCart;
  const productsInCart = cartInfo.cartProducts;

  //5. Mise à jour du stock du produit
  await updateProductStockService(productsInCart);
  //6. Calcul du cashback capitalisé
  productsInCart.forEach(async (product) => {
    const productDB = await getProductByIdService(product.productId.toString());
    cashbackToEarn += product.quantity * productDB.cashback;
  });
  //7. Mise à jour de l'historique du cashback du customer
  const cashbackData = {
    label: "order" as "order",
    orderNumber,
    cashbackEarned: cashbackToEarn || 0,
    cashbackSpent: cashbackToSpend || 0,
  };
  await updateCashbackCustomer(customerId, cashbackData);

  //8. Création des cartes cadeaux
  giftcardsInCart.forEach(async (giftcard) => {
    const { amount, quantity } = giftcard;
    for (let i = 0; i < quantity; i++) {
      const giftcardCreated = await createGiftcardWhenOrderService(
        customerId,
        amount
      );
      giftcardsCreated.push(giftcardCreated);
    }
  });

  //9. Mise à jour des cartes cadeaux utilisées
  giftcardsToUse.forEach(async (giftcard) => {
    const { id, amountToUse } = giftcard;
    await updateGiftcardBalanceService(id, amountToUse);
  });
};
