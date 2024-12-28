import { StatisticTypeDTO } from "../../controllers/chiffres/entities/dto/chiffre.dto.js";
import Customer from "../../models/customer/customer.schema.js";
import { GiftCardModel } from "../../models/giftcard/giftcard.schema.js";
import { OrderModel } from "../../models/order/order.schema.js";
import { ProductModel } from "../../models/product/product.schema.js";
import { formatAmount } from "../../utils/format_amount.js";

// Fonction pour récupérer les statistiques filtrées par année
export const getStatisticsRepository = async (year?: StatisticTypeDTO) => {
  // Définir les bornes pour l'année sélectionnée
  const startOfYear = new Date(year || new Date().getFullYear(), 0, 1);
  const endOfYear = new Date((year || new Date().getFullYear()) + 1, 0, 1);

  // Statistiques des commandes
  const totalOrders = await OrderModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfYear,
          $lt: endOfYear,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$totalPrice" },
        totalOrders: { $count: {} },
      },
    },
  ]);

  // Statistiques des produits
  const totalProductSales = await ProductModel.aggregate([
    {
      $match: {
        updatedAt: {
          $gte: startOfYear,
          $lt: endOfYear,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$numberOfSales" },
      },
    },
  ]);

  // Statistiques des cartes cadeaux
  const giftCardStats = await GiftCardModel.aggregate([
    {
      $facet: {
        totalGiftCards: [
          {
            $match: {
              createdAt: {
                $gte: startOfYear,
                $lt: endOfYear,
              },
            },
          },
          { $count: "totalGiftCards" },
        ],
        activeGiftCards: [
          {
            $match: {
              balance: { $gt: 0 },
              expirationDate: { $gte: new Date() },
              createdAt: {
                $gte: startOfYear,
                $lt: endOfYear,
              },
            },
          },
          { $count: "activeGiftCards" },
        ],
        inactiveGiftCards: [
          {
            $match: {
              $or: [{ balance: 0 }, { expirationDate: { $lt: new Date() } }],
              createdAt: {
                $gte: startOfYear,
                $lt: endOfYear,
              },
            },
          },
          { $count: "inactiveGiftCards" },
        ],
        totalAmountUsed: [
          { $unwind: "$usageHistory" },
          {
            $match: {
              "usageHistory.usedAt": {
                $gte: startOfYear,
                $lt: endOfYear,
              },
            },
          },
          {
            $group: {
              _id: null,
              totalAmountUsed: { $sum: "$usageHistory.amountUsed" },
            },
          },
        ],
        totalAmountAvailable: [
          {
            $match: {
              balance: { $gt: 0 },
              expirationDate: { $gte: new Date() },
              createdAt: {
                $gte: startOfYear,
                $lt: endOfYear,
              },
            },
          },
          { $group: { _id: null, totalAmountAvailable: { $sum: "$balance" } } },
        ],
      },
    },
  ]);

  // Statistiques du cashback
  const cashbackStats = await Customer.aggregate([
    {
      $unwind: "$cashback",
    },
    {
      $match: {
        "cashback.createdAt": {
          $gte: startOfYear,
          $lt: endOfYear,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalCashbackEarned: { $sum: "$cashback.cashbackEarned" },
        totalCashbackSpent: { $sum: "$cashback.cashbackSpent" },
      },
    },
  ]);

  // Format de la réponse
  const stats = {
    orders: {
      totalAmount: formatAmount(totalOrders[0]?.totalAmount || 0),
      totalOrders: totalOrders[0]?.totalOrders || 0,
    },
    products: {
      totalSales: totalProductSales[0]?.totalSales || 0,
    },
    giftCards: {
      totalGiftCards: giftCardStats[0]?.totalGiftCards[0]?.totalGiftCards || 0,
      activeGiftCards:
        giftCardStats[0]?.activeGiftCards[0]?.activeGiftCards || 0,
      inactiveGiftCards:
        giftCardStats[0]?.inactiveGiftCards[0]?.inactiveGiftCards || 0,
      totalAmountUsed: formatAmount(
        giftCardStats[0]?.totalAmountUsed[0]?.totalAmountUsed || 0
      ),
      totalAmountAvailable: formatAmount(
        giftCardStats[0]?.totalAmountAvailable[0]?.totalAmountAvailable || 0
      ),
    },
    cashback: {
      totalCashbackEarned: formatAmount(
        cashbackStats[0]?.totalCashbackEarned || 0
      ),
      totalCashbackSpent: formatAmount(
        cashbackStats[0]?.totalCashbackSpent || 0
      ),
    },
  };

  return stats;
};
