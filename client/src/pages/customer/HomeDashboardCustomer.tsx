import useCustomerInfo from "@/hooks/dashboard/customer/useCustomerInfo";
import { CustomerDBType } from "@/types/customer/CustomerTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const HomeDashboardCustomer = () => {
  const [customerInfo, setCustomerInfo] = useState<CustomerDBType | null>(null);
  const { customerInfoFetch } = useCustomerInfo();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await customerInfoFetch();
        if (data) setCustomerInfo(data); // Remplit le formulaire avec les données reçues
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
        toast.error("Impossible de charger vos informations.");
      }
    };

    fetchProfile();
  }, [customerInfoFetch]);
  return (
    <h1 className="text-center">
      Bienvenue dans votre espace {customerInfo?.firstName} 📔
    </h1>
  );
};

export default HomeDashboardCustomer;
