import Stripe from "stripe";
import mongoose from "mongoose";
import { PaymentAmountCustomerDTO } from "../../controllers/payment/entities/dto/paymentAmountCustomer.dto.js";
import { PaymentAmountVisitorDTO } from "../../controllers/payment/entities/dto/paymentAmountVisitor.dto.js";
import { formatAmount } from "../../utils/format_amount.js";
import {
  getCartDataService,
  updateCustomerOrderStatsService,
  updateCustomerService,
} from "../customer/customerService.js";
import {
  getProductByIdService,
  updateProductStockService,
} from "../product/productService.js";
import { checkPromocodeService } from "../promocode/promocodeService.js";
import { PaymentConfirmationDTO } from "../../controllers/payment/entities/dto/paymentConfirmation.dto.js";
import { generateOrderNumber } from "./utils/generateOrderNumber.js";
import { getOrderStatusService } from "../orderStatus/orderStatusService.js";
import { getPaymentStatusService } from "../paymentStatus/paymentStatusService.js";
import {
  getCustomerByIdRepository,
  updateCashbackCustomerRepository,
} from "../../repositories/customer/customerRepository.js";
import {
  createGiftcardWhenOrderService,
  updateGiftcardBalanceService,
} from "../giftcard/giftcardService.js";
import { OrderItemType } from "../../models/types/orderItemType.js";
import { createOrderRepository } from "../../repositories/order/orderRepository.js";
import { CashbackTypeDTO } from "../../controllers/customer/entities/dto/customer.dto.js";
import { sendPaymentConfirmationEmail } from "../../email/subject/payment.js";
import { GiftCardDocument } from "../../models/giftcard/giftcard.schema.js";
import { giftcardsUsedFormattedEmail } from "../../models/types/giftcardType.js";

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
  const cartProductsFormatted = cartInfo.cartProducts.map((cp) => ({
    ...cp,
    productId: cp._id,
  }));

  return await calculatePaymentAmountService(
    paymentData,
    cartProductsFormatted,
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

  // Calcul du montant total des produits dans le panier et le cumul des promotions
  let totalProductPrice = 0;
  let totalPromotionOnProduct = 0;
  for (const product of cartProducts) {
    const productInfo = await getProductByIdService(
      product.productId.toString()
    );
    totalProductPrice += productInfo.price * product.quantity;
    if (
      productInfo?.promotionEndDate &&
      productInfo.promotionEndDate.getTime() > Date.now()
    ) {
      totalPromotionOnProduct +=
        (productInfo.price *
          product.quantity *
          productInfo.promotionPercentage) /
        100;
    }
  }

  // Calcul du montant total des cartes cadeaux dans le panier
  let totalGiftcardPrice = 0;
  for (const giftcard of giftcardsInCart) {
    totalGiftcardPrice += giftcard.amount * giftcard.quantity;
  }

  // Total avant réduction
  const totalAmountBeforePromocode = formatAmount(
    totalProductPrice + totalGiftcardPrice - totalPromotionOnProduct
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
    orderAmount: formatAmount(orderAmount), // Montant final de la commande
    promocodeAmount: formatAmount(promocodeAmount), // Montant déduit grâce au code promo
    promocodePercentage, // Pourcentage du code promo appliqué
    totalPromotionOnProduct: formatAmount(totalPromotionOnProduct), // Cumul des promotions sur les produits
    totalAmountBeforePromocode: formatAmount(totalAmountBeforePromocode), // Prix total avant réduction
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
  try {
    // Initialisation des variables
    let cashbackToEarn = 0;
    let giftcardsCreated: GiftCardDocument[] = [];
    let orderItemsCreated: OrderItemType[] = [];
    let giftcardsUsed: giftcardsUsedFormattedEmail[] = [];

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
    //4. Récupérer les infos du customer
    const customerInfo = await getCustomerByIdRepository(customerId);
    const giftcardsInCart = customerInfo.cartGiftcards;
    const productsInCart = customerInfo.cartProducts;

    //5. Mise à jour du stock du produit
    await updateProductStockService(productsInCart);
    //6. Calcul du cashback capitalisé
    for (const product of productsInCart) {
      const productDB = await getProductByIdService(product.productId);
      cashbackToEarn += product.quantity * productDB.cashback;
    }
    //7. Mise à jour de l'historique du cashback du customer
    const cashbackData: CashbackTypeDTO = {
      label: "order",
      orderNumber,
      cashbackEarned: cashbackToEarn || 0,
      cashbackSpent: cashbackToSpend || 0,
      reviewId: null,
    };
    await updateCashbackCustomerRepository(customerId, cashbackData);
    //8. Création des cartes cadeaux
    for (const giftcard of giftcardsInCart) {
      const { amount, quantity } = giftcard;
      for (let i = 0; i < quantity; i++) {
        const giftcardCreated = await createGiftcardWhenOrderService(
          customerId,
          amount
        );
        giftcardsCreated.push(giftcardCreated);
      }
    }
    //9. Mise à jour des cartes cadeaux utilisées
    for (const giftcard of giftcardsToUse) {
      const { _id, amountToUse } = giftcard;
      const giftcardUpdated = await updateGiftcardBalanceService(
        _id,
        amountToUse,
        customerId
      );
      const giftcardUpdatedFormatted = {
        amountUsed: amountToUse,
        balance: giftcardUpdated.balance,
        code: giftcardUpdated.code,
        expirationDate: giftcardUpdated.expirationDate,
      };
      giftcardsUsed.push(giftcardUpdatedFormatted);
    }
    //10. Création des order-items
    for (const product of productsInCart) {
      const productDB = await getProductByIdService(product.productId);

      const orderItemData: OrderItemType = {
        productId: product.productId,
        name: productDB.name,
        variant: product.variant,
        customerId,
        articleNumber: product.quantity,
        heroImage: productDB.heroImage,
        priceBeforePromotionOnProduct: productDB.price,
        promotionPercentage:
          productDB.promotionEndDate &&
          productDB.promotionEndDate.getTime() > Date.now()
            ? productDB.promotionPercentage
            : 0,
        promotionEndDate: productDB.promotionEndDate,
        cashbackEarned: product.quantity * productDB.cashback,
        exchangeNumber: null,
        exchangeAt: null,
        refundNumber: null,
        refundAt: null,
        refundAmount: null,
        returnNumber: null,
        returnAt: null,
      };

      orderItemsCreated.push(orderItemData);
    }
    //11. Mise à jour des stats commandes dans customer
    await updateCustomerOrderStatsService(
      customerId,
      paymentDetails.orderAmount
    );
    //12. Vider le panier
    await updateCustomerService(customerId, {
      cartProducts: [],
      cartGiftcards: [],
    });
    //13. Création de la commande
    const orderData = {
      customerId,
      orderStatusLabel: orderStatus[0].label,
      orderStatusNumber: orderStatus[0].number,
      orderStatusColor: orderStatus[0].color,
      paymentStatusLabel: paymentsStatus[1].label,
      paymentStatusNumber: paymentsStatus[1].number,
      paymentStatusColor: paymentsStatus[1].color,
      orderNumber,
      promocodeAmount: paymentDetails.promocodeAmount,
      promocodePercentage: paymentDetails.promocodePercentage,
      totalPrice: paymentDetails.orderAmount,
      totalPromotionOnProduct: paymentDetails.totalPromotionOnProduct,
      orderAddressShipping: paymentConfirmationData.orderAddressShipping,
      orderAddressBilling: paymentConfirmationData.orderAddressBilling,
      cashbackEarned: cashbackToEarn || 0,
      cashbackSpent: cashbackToSpend || 0,
      orderItems: orderItemsCreated,
    };
    const orderCreated = await createOrderRepository(orderData);

    //14. Envoyer un email de confirmation de commande
    const emailDetails = {
      email: customerInfo.email,
      firstName: customerInfo.firstName,
    };
    const orderDetailsForEmail = {
      orderNumber,
      totalPrice: paymentDetails.orderAmount,
      cashbackEarned: cashbackToEarn || 0,
      cashbackSpent: cashbackToSpend || 0,
      totalPromotionOnProduct: paymentDetails.totalPromotionOnProduct,
      giftcardsCreated: giftcardsCreated.length > 0 ? giftcardsCreated : [],
      giftcardsUsed: giftcardsUsed.length > 0 ? giftcardsUsed : [],
      orderItems: orderItemsCreated,
      orderAddressShipping: paymentConfirmationData.orderAddressShipping,
      orderAddressBilling: paymentConfirmationData.orderAddressBilling,
      promocodeAmount: paymentDetails.promocodeAmount,
      promocodePercentage: paymentDetails.promocodePercentage,
    };
    await sendPaymentConfirmationEmail(emailDetails, orderDetailsForEmail);
    //15. Retourner la commande + prénom customer
    return { orderCreated, firstName: customerInfo.firstName };
  } catch (error) {
    console.error(error);
    throw new Error("Error creating order");
  }
};
