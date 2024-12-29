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
  const totalOrdersStats = await OrderModel.aggregate([
    {
      $facet: {
        totalOrdersByYear: [
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
              totalOrdersByYear: { $sum: 1 }, // Compte le nombre de commandes pour l'année
            },
          },
        ],
        totalOrdersAllTime: [
          { $count: "totalOrdersAllTime" }, // Compte toutes les commandes sans filtre
        ],
        totalAmountOrdersAllTime: [
          {
            $group: {
              _id: null,
              totalAmountOrdersAllTime: { $sum: "$totalPrice" }, // Somme des prix de toutes les commandes pour toutes les années
            },
          },
        ],
      },
    },
  ]);

  const totalProductSales = await ProductModel.aggregate([
    {
      $facet: {
        totalSalesByYear: [
          {
            $match: {
              createdAt: {
                $gte: startOfYear,
                $lt: endOfYear,
              },
              numberOfSales: { $gt: 0 }, // Filtrer les produits avec des ventes > 0
            },
          },
          {
            $group: {
              _id: null,
              totalSalesArticlesByYear: { $sum: "$numberOfSales" },
              totalSalesProductsByYear: { $count: {} }, // Compter les produits ayant des ventes > 0
            },
          },
        ],
        totalSalesAllTime: [
          {
            $match: {
              numberOfSales: { $gt: 0 }, // Filtrer les produits avec des ventes > 0
            },
          },
          {
            $group: {
              _id: null,
              totalSalesArticlesAllTime: { $sum: "$numberOfSales" },
              totalSalesProductsAllTime: { $count: {} }, // Compter les produits ayant des ventes > 0
            },
          },
        ],
      },
    },
  ]);
  
  
  // Statistiques des cartes cadeaux
  const giftCardStats = await GiftCardModel.aggregate([
    {
      $facet: {
        totalGiftcardsByYear: [
          {
            $match: {
              createdAt: {
                $gte: startOfYear,
                $lt: endOfYear,
              },
            },
          },
          { $count: "totalGiftcardsByYear" },
        ],
        totalGiftcardsAllTime: [
          { $count: "totalGiftcardsAllTime" }, // Compte toutes les gift cards sans filtre
        ],
        activeGiftcards: [
          {
            $match: {
              balance: { $gt: 0 },
              expirationDate: { $gte: new Date() },
            },
          },
          { $count: "activeGiftcards" },
        ],
        inactiveGiftcards: [
          {
            $match: {
              $or: [{ balance: 0 }, { expirationDate: { $lt: new Date() } }],
            },
          },
          { $count: "inactiveGiftcards" },
        ],
        totalAmountUsedByYear: [
          { $unwind: "$usageHistory" },
          {
            $match: {
              "usageHistory.createdAt": {
                $gte: startOfYear,
                $lt: endOfYear,
              },
            },
          },
          {
            $group: {
              _id: null,
              totalAmountUsedByYear: { $sum: "$usageHistory.amountUsed" },
            },
          },
        ],
        totalAmountUsedAllTime: [
          { $unwind: "$usageHistory" },
          {
            $group: {
              _id: null,
              totalAmountUsedByYear: { $sum: "$usageHistory.amountUsed" },
            },
          },
        ],
        totalAmountBalanceByYear: [
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
              totalAmountBalanceByYear: { $sum: "$balance" },
            },
          },
        ],
        totalAmountBalanceAllTime: [
          {
            $group: {
              _id: null,
              totalAmountBalanceAllTime: { $sum: "$balance" },
            },
          },
        ],
        totalAmountAvailable: [
          {
            $match: {
              balance: { $gt: 0 },
              expirationDate: { $gte: new Date() },
            },
          },
          { $group: { _id: null, totalAmountAvailable: { $sum: "$balance" } } },
        ],
      },
    },
  ]);

  const cashbackStats = await Customer.aggregate([
    {
      $unwind: "$cashback", // Dépliage du tableau cashback
    },
    {
      $facet: {
        cashbackByYear: [
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
              totalCashbackEarnedByYear: { $sum: "$cashback.cashbackEarned" },
              totalCashbackSpentByYear: { $sum: "$cashback.cashbackSpent" },
            },
          },
        ],
        cashbackAllTime: [
          {
            $group: {
              _id: null,
              totalCashbackEarnedAllTime: { $sum: "$cashback.cashbackEarned" },
              totalCashbackSpentAllTime: { $sum: "$cashback.cashbackSpent" },
            },
          },
          {
            $project: {
              totalCashbackEarnedAllTime: 1,
              totalCashbackSpentAllTime: 1,
            },
          },
        ],
      },
    },
  ]);

  // Format de la réponse
  const stats = {
    orders: {
      totalAmountOrdersByYear: formatAmount(
        totalOrdersStats[0].totalOrdersByYear[0]?.totalAmount || 0
      ),
      totalOrdersByYear:
        totalOrdersStats[0].totalOrdersByYear[0]?.totalOrdersByYear || 0,
      totalAmountOrdersAllTime: formatAmount(
        totalOrdersStats[0].totalAmountOrdersAllTime[0]
          ?.totalAmountOrdersAllTime || 0
      ),
      totalOrdersAllTime: totalOrdersStats[0].totalOrdersAllTime[0]?.totalOrdersAllTime || 0,
    },
    products: {
      totalSalesProductsByYear:
        totalProductSales[0].totalSalesByYear[0]
          ?.totalSalesProductsByYear || 0,
      totalSalesProductsAllTime:
        totalProductSales[0].totalSalesAllTime[0]
          ?.totalSalesProductsAllTime || 0,
      totalSalesArticlesByYear:
        totalProductSales[0].totalSalesByYear[0]
          ?.totalSalesArticlesByYear || 0,
      totalSalesArticlesAllTime:
        totalProductSales[0].totalSalesAllTime[0]
          ?.totalSalesArticlesAllTime || 0,
    },
    giftCards: {
      totalGiftcardsByYear:
        giftCardStats[0]?.totalGiftcardsByYear[0]?.totalGiftcardsByYear || 0,
      activeGiftcards:
        giftCardStats[0]?.activeGiftcards[0]?.activeGiftcards || 0,
      inactiveGiftcards:
        giftCardStats[0]?.inactiveGiftcards[0]?.inactiveGiftcards || 0,
      totalAmountUsedByYear: formatAmount(
        giftCardStats[0]?.totalAmountUsedByYear[0]?.totalAmountUsedByYear || 0
      ),
      totalAmountAvailable: formatAmount(
        giftCardStats[0]?.totalAmountAvailable[0]?.totalAmountAvailable || 0
      ),
      totalAmountBalanceByYear: formatAmount(
        giftCardStats[0]?.totalAmountBalanceByYear[0]
          ?.totalAmountBalanceByYear || 0
      ),
      totalGiftcardsAllTime:
        giftCardStats[0]?.totalGiftcardsAllTime[0]?.totalGiftcardsAllTime || 0,
      totalAmountUsedAllTime: formatAmount(
        giftCardStats[0]?.totalAmountUsedAllTime[0]?.totalAmountUsedByYear || 0
      ),
      totalAmountBalanceAllTime: formatAmount(
        giftCardStats[0]?.totalAmountBalanceAllTime[0]
          ?.totalAmountBalanceAllTime || 0
      ),
    },
    cashback: {
      totalCashbackEarnedByYear: formatAmount(
        cashbackStats[0]?.cashbackByYear[0]?.totalCashbackEarnedByYear || 0
      ),
      totalCashbackSpentByYear: formatAmount(
        cashbackStats[0]?.cashbackByYear[0]?.totalCashbackSpentByYear || 0
      ),
      totalCashbackEarnedAllTime: formatAmount(
        cashbackStats[0]?.cashbackAllTime[0]?.totalCashbackEarnedAllTime || 0
      ),
      totalCashbackSpentAllTime: formatAmount(
        cashbackStats[0]?.cashbackAllTime[0]?.totalCashbackSpentAllTime || 0
      ),
      totalCashbackUsable: formatAmount(
        cashbackStats[0]?.cashbackAllTime[0]
          ? cashbackStats[0]?.cashbackAllTime[0]?.totalCashbackEarnedAllTime -
              cashbackStats[0]?.cashbackAllTime[0]?.totalCashbackSpentAllTime
          : 0
      ),
    },
  };

  return stats;
};
