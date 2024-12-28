export interface StatsResponse {
  orders: {
    totalAmount: number;
    totalOrders: number;
  };
  products: {
    totalSales: number;
  };
  giftCards: {
    totalGiftCards: number;
    activeGiftCards: number;
    inactiveGiftCards: number;
    totalAmountUsed: number;
    totalAmountAvailable: number;
  };
  cashback: {
    totalCashbackEarned: number;
    totalCashbackSpent: number;
  };
}
