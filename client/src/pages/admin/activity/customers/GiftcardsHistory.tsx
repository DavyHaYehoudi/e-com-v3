import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/utils/pricesFormat";
import ValidBadge from "@/components/shared/badge/ValidBadge";
import NoValidBadge from "@/components/shared/badge/NoValidBadge";
import { isGiftCardValid } from "@/utils/giftcardValidity";
import { GiftcardCustomerDBType } from "@/types/giftcard/GiftcardTypes";
import { formatDate } from "@/utils/formatDate";
import useGiftcardsCustomer from "@/hooks/dashboard/admin/useGiftcard";
import { useParams } from "react-router-dom";

const GiftcardsHistory = () => {
  const [giftcards, setGiftcards] = useState<GiftcardCustomerDBType[]>([]);
  const { customerId } = useParams();
  const { giftcardsFetch } = useGiftcardsCustomer(customerId);
  useEffect(() => {
    const fetchGiftcardsCustomer = async () => {
      try {
        const data = await giftcardsFetch();
        if (data) setGiftcards(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de votre historique :",
          error
        );
        toast.error("Impossible de charger vos informations.");
      }
    };

    fetchGiftcardsCustomer();
  }, [giftcardsFetch]);
  return (
    <Table>
      <TableCaption>Liste des cartes cadeaux du client.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Valeur initiale</TableHead>
          <TableHead>Reste</TableHead>
          <TableHead>Valide</TableHead>
          <TableHead>Date d'achat</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {giftcards.length > 0 &&
          giftcards.map((giftcard) => (
            <TableRow key={giftcard.code}>
              <TableCell className="font-medium">{giftcard.code}</TableCell>
              <TableCell className="whitespace-nowrap">
                {formatPrice(giftcard.initialValue)}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {formatPrice(giftcard.balance)}
              </TableCell>
              <TableCell>
                {isGiftCardValid({
                  balance: giftcard.balance,
                  expirationDate: giftcard.expirationDate,
                }) ? (
                  <ValidBadge />
                ) : (
                  <NoValidBadge />
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {formatDate(giftcard.createdAt)}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};
export default GiftcardsHistory;
