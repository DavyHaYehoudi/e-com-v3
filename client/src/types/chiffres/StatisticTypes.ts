export interface StatsResponse {
  orders: {
    totalAmountOrdersByYear: number;
    totalOrdersByYear: number;
    totalAmountOrdersAllTime: number;
    totalOrdersAllTime: number;
  };
  products: {
    totalSalesProductsByYear: number;
    totalSalesProductsAllTime: number;
    totalSalesArticlesByYear: number;
    totalSalesArticlesAllTime: number;
  };
  giftCards: {
    totalGiftcardsByYear: number;
    totalAmountBalanceByYear: number;
    totalAmountUsedByYear: number;
    activeGiftcards: number;
    inactiveGiftcards: number;
    totalAmountAvailable: number;
    totalGiftcardsAllTime: number;
    totalAmountUsedAllTime: number;
    totalAmountBalanceAllTime: number;
  };
  cashback: {
    totalCashbackEarnedByYear: number;
    totalCashbackSpentByYear: number;
    totalCashbackEarnedAllTime: number;
    totalCashbackSpentAllTime: number;
    totalCashbackUsable: number;
  };
}
