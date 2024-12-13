import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCustomerInfo from "@/hooks/dashboard/customer/useCustomerInfo";
import useGiftcardsCustomer from "@/hooks/dashboard/customer/useGiftcardsCustomer";
import { CustomerDBType } from "@/types/customer/CustomerTypes";
import { GiftcardCustomerDBType } from "@/types/giftcard/GiftcardTypes";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/pricesFormat";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const GiftcardDetail = () => {
  const [giftcard, setGiftcard] = useState<GiftcardCustomerDBType | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerDBType | null>(null);
  const { giftcardId } = useParams();
  const { giftcardsFetch } = useGiftcardsCustomer();
  const { customerInfoFetch } = useCustomerInfo();
  useEffect(() => {
    const fetchGiftcardsCustomer = async () => {
      try {
        const data = await giftcardsFetch();
        if (data) {
          const giftcard = data.find((gc) => gc._id === giftcardId);
          setGiftcard(giftcard || null);
        }
        // if (data) setGiftcards(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de votre historique :",
          error
        );
        toast.error("Impossible de charger vos informations.");
      }
    };

    fetchGiftcardsCustomer();
  }, [giftcardsFetch, giftcardId]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await customerInfoFetch();
        if (data) setCustomerInfo(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
        toast.error("Impossible de charger vos informations.");
      }
    };

    fetchProfile();
  }, [customerInfoFetch]);
  return (
    <div>
      <h1 className="text-center mb-10">Historique de votre carte cadeau</h1>
      <p className="text-blue-300 m-5 text-xs">
        <Link to="/customer/tableau-de-bord/avantages/cartes-cadeaux/liste">
          Revenir à la liste
        </Link>{" "}
      </p>
      <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
        <Table>
          <TableCaption>
            Détails d&apos;utilisation de la carte cadeau.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Date d&apos;usage</TableHead>
              <TableHead>Montant initial</TableHead>
              <TableHead>Montant utilisé</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {giftcard &&
              giftcard.usageHistory &&
              giftcard.usageHistory.length > 0 &&
              giftcard.usageHistory.map((item, index) => (
                <>
                  <TableRow key={index}>
                    <TableCell>
                      {item.usedByCustomerId === customerInfo?._id
                        ? "Vous"
                        : "Autre utilisateur"}
                    </TableCell>
                    <TableCell>{formatDate(item.createdAt)}</TableCell>
                    <TableCell>{formatPrice(giftcard.initialValue)}</TableCell>
                    <TableCell>{formatPrice(item.amountUsed)}</TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GiftcardDetail;
