import { CustomerDBType } from "@/types/customer/CustomerTypes";
import CustomersTable from "./CustomersTable";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useCustomerInfo from "@/hooks/dashboard/admin/useCustomer";

const CustomersPage = () => {
    const [data, setData] = useState<CustomerDBType[]>([]);
    const { customersInfoFetch } = useCustomerInfo();
    useEffect(() => {
      const fetchCustomers = async () => {
        try {
          const data = await customersInfoFetch();
          if (data) {
            setData(data);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des clients :", error);
          toast.error("Impossible de charger vos informations.");
        }
      };
  
      fetchCustomers();
    }, [customersInfoFetch]);
  return (
    <div>
      <h1 className="text-center mb-10">Liste des clients</h1>
      <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
        <CustomersTable data={data} />
      </div>
    </div>
  );
};

export default CustomersPage;
