import ClipboardButton from "@/components/shared/ClipboardButton";
import { GiftCardsCustomer } from "../../../../hooks/dashboard/customer/useGiftcardsCustomer";
import { formatDate } from "@/utils/formatDate";
interface CommonDetailsProps {
  giftcard: GiftCardsCustomer;
}
const CommonDetails: React.FC<CommonDetailsProps> = ({ giftcard }) => {
  return (
    <div className="p-2">
      <p className="flex items-center gap-2">
        Origine :
        {giftcard.is_issued_by_admin ? (
          " Offre commerciale"
        ) : (
          <span className="flex items-center gap-2">
            commande {giftcard.orderNumber}
            <ClipboardButton text={giftcard.orderNumber} />
          </span>
        )}
      </p>
      <p>Identifiant de l&apos;acheteur : {giftcard.first_holder_id}</p>
      <p>Date d&apos;achat : {formatDate(giftcard.createdAt)}</p>
    </div>
  );
};

export default CommonDetails;
