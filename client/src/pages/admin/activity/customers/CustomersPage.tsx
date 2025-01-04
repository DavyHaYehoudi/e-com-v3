import { CustomerDBType } from "@/types/CustomerTypes";
import CustomersTable from "./CustomersTable";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useCustomerInfo from "@/hooks/dashboard/admin/useCustomer";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const CustomersPage = () => {
  const [data, setData] = useState<CustomerDBType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { customersInfoFetch } = useCustomerInfo();
  useEffect(() => {
    setIsLoading(true);
    const fetchCustomers = async () => {
      try {
        const data = await customersInfoFetch();
        if (data) {
          setData(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des clients :", error);
        toast.error("Impossible de charger vos informations.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, [customersInfoFetch]);
  if (isLoading) {
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner />
        <span> Chargement en cours...</span>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-center mb-10">Liste des clients</h1>
      <div className="container-responsive">
        <CustomersTable data={data} />
      </div>
    </div>
  );
};

export default CustomersPage;
