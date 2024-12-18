import GiftcardsHistory from "./GiftcardsHistory";
import { Separator } from "@/components/ui/separator";
import CashbackHistory from "./CashbackHistory";
import OrderHistory from "./OrderHistory";
import NavBackDashboard from "@/components/shared/NavBackDashboard";

const CustomerHistory = () => {
  return (
    <div>
      <NavBackDashboard
        path="activite/clients/liste"
        text="Revenir à la liste des clients"
        role="admin"
      />
      <h1 className="text-center mb-10">Historique du client</h1>
      <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
        <h2 className="ml-5 my-20">Cartes cadeaux</h2>
        <GiftcardsHistory />
        <Separator className="my-10" />
        <h2 className="ml-5 my-20">Cashback</h2>
        <CashbackHistory />
        <Separator className="my-10" />
        <h2 className="ml-5 my-20">Commandes</h2>
        <OrderHistory />
      </div>
    </div>
  );
};

export default CustomerHistory;
