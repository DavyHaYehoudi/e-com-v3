import { useState } from "react";

export const usePromotion = () => {
  const [codePromoPercentage, setCodePromoPercentage] = useState(0);
  const [selectedCashback, setSelectedCashback] = useState<number | null>(null);

  const applyDiscount = (discountPercentage: number) => {
    setCodePromoPercentage(discountPercentage);
  };

  const handleCashbackSelect = (amount: number) => {
    setSelectedCashback(amount);
  };

  return {
    codePromoPercentage,
    selectedCashback,
    applyDiscount,
    handleCashbackSelect,
  };
};
