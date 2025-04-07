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
import useGiftcardsCustomer from "@/hooks/dashboard/customer/useGiftcardsCustomer";
import { isGiftCardValid } from "@/utils/giftcardValidity";
import { GiftcardCustomerDBType } from "@/types/GiftcardTypes";
import { formatDate } from "@/utils/formatDate";
import { FileStack } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import FullscreenLoader from "@/components/shared/FullscreenLoader";

const GiftcardsTable = () => {
  const [giftcards, setGiftcards] = useState<GiftcardCustomerDBType[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { giftcardsFetch } = useGiftcardsCustomer();
  useEffect(() => {
    const fetchGiftcardsCustomer = async () => {
      setIsLoading(true);
      try {
        const data = await giftcardsFetch();
        if (data) setGiftcards(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de votre historique :",
          error
        );
        toast.error("Impossible de charger vos informations.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGiftcardsCustomer();
  }, [giftcardsFetch]);
  if (isLoading) {
    return <FullscreenLoader />;
  }
  return (
    <Table>
      <TableCaption>Liste de vos cartes cadeaux.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Valeur initiale</TableHead>
          <TableHead>Reste</TableHead>
          <TableHead>Valide</TableHead>
          <TableHead>Date d'achat</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {giftcards &&
          giftcards.length > 0 &&
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
                  <ValidBadge label="créditée" />
                ) : (
                  <NoValidBadge label="épuisée" />
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {formatDate(giftcard.createdAt)}
              </TableCell>
              <TableCell>
                <Link
                  to={`/customer/tableau-de-bord/avantages/cartes-cadeaux/${giftcard._id}`}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <FileStack />
                      </TooltipTrigger>
                      <TooltipContent>Voir les détails</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};
export default GiftcardsTable;
