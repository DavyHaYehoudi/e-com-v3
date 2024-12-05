"use client";

import { useEffect } from "react";
import { CashBackCartToUseType } from "../types/CashbackCartToUseType";
import { useFetch } from "@/service/hooks/useFetch";
import { useDispatch } from "react-redux";
import { setCashback } from "@/redux/slice/cashbackSlice";

const useCashback = () => {
  const dispatch = useDispatch();

  const { data, triggerFetch } = useFetch<CashBackCartToUseType>(
    "/customer/cash-back-history",
    { requiredCredentials: true }
  );

  const getCashbackOneCustomer = async () => {
    await triggerFetch();
  };

  useEffect(() => {
    if (data) {
      dispatch(
        setCashback({ type: "cashback_earned", amount: data.total_earned })
      );
      dispatch(
        setCashback({ type: "cashback_spent", amount: data.total_spent })
      );
    }
  }, [data]);

  return { getCashbackOneCustomer };
};

export default useCashback;
