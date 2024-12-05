import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShippingTracking } from "../pages/dashboard/customer/hooks/useTrackingCustomer";
import { formatDate } from "@/app/(public)/utils/formatDate";

interface TrackingNumberProps {
  tracking: ShippingTracking;
  confirmationNumber?: string;
}

const TrackingNumber = ({
  tracking,
  confirmationNumber,
}: TrackingNumberProps) => {
  return (
    <div>
      <Card className="flex-grow">
        <CardHeader>
          <CardTitle>Suivi d'envoi - Commande № {confirmationNumber}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <span className="font-bold">Expéditeur :</span>{" "}
            {tracking.sender === "admin" ? "Responsable des ventes" : "Client"}
          </p>
          <p>
            <span className="font-bold">Numéro de suivi :</span>{" "}
            {tracking.tracking_number}
          </p>
          <Separator className="my-4" />
          <p>
            <span className="font-bold">Date d'envoi :</span>{" "}
            {formatDate(tracking.date_sending)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
export default TrackingNumber;
