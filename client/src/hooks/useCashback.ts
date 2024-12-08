import { useEffect } from "react";
import { useFetch } from "@/service/hooks/useFetch";
import { useDispatch,  } from "react-redux";
import { setCashback } from "@/redux/slice/cashbackSlice";
import { CustomerDBType } from "@/types/customer/CustomerTypes";

const useCashback = () => {
  const dispatch = useDispatch();

  const { data, triggerFetch } = useFetch<CustomerDBType>("/customer", {
    requiredCredentials: true,
  });

  const getCashbackOneCustomer = async () => {
    await triggerFetch();
  };

  useEffect(() => {
    if (data && data.cashback) {
      // Calculer les totaux de cashback
      const cashbackEarned = data.cashback.reduce(
        (total, item) => total + item.cashbackEarned,
        0
      );
      const cashbackSpent = data.cashback.reduce(
        (total, item) => total + item.cashbackSpent,
        0
      );

      // Dispatch vers Redux
      dispatch(setCashback({ type: "cashbackEarned", amount: cashbackEarned }));
      dispatch(setCashback({ type: "cashbackSpent", amount: cashbackSpent }));
    }
  }, [data, dispatch]);

  return { getCashbackOneCustomer };
};

export default useCashback;
