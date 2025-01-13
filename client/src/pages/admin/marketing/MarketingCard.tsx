import React, { useState } from "react";
import { MarketingCampaignDBType } from "@/types/MarketingTypes";
import useMarketing from "@/hooks/dashboard/admin/useMarketing";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SelectMarketing } from "./MarketingPage";
import { formatDate } from "@/utils/formatDate";
import DeleteAlert from "@/components/shared/dialog/DeleteAlert";
import { toast } from "sonner";
import AlertConfirm from "@/components/shared/dialog/AlertConfirm";
import EmailsSendedList from "./EmailsSendedList";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ChooseRecipients from "./ChooseRecipients";
import CardActions from "./CardActions";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import CardStatusBadge from "./CardStatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MarketingCardProps {
  marketing: MarketingCampaignDBType;
  customerEmails: string[];
  handleDeleteMarketing: (marketingId: string) => void;
  selectedMarketing: SelectMarketing;
  setSelectedMarketing: React.Dispatch<React.SetStateAction<SelectMarketing>>;
  isDeleteOpen: boolean;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSentMarketing: (result: MarketingCampaignDBType) => void;
  handleMarketingPreview: (marketingId: string) => void;
}

const MarketingCard: React.FC<MarketingCardProps> = ({
  marketing,
  customerEmails,
  handleDeleteMarketing,
  selectedMarketing,
  setSelectedMarketing,
  isDeleteOpen,
  setIsDeleteOpen,
  handleSentMarketing,
  handleMarketingPreview,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isConfirmPreviewOpen, setIsConfirmPreviewOpen] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteMarketing, updateMarketing } = useMarketing(
    selectedMarketing.marketingId
  );

  const emailAdmin = useSelector((state: RootState) => state.auth.user?.email);

  const toggleEmail = (email: string) => {
    setSelectedEmails((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };
  const toggleSelectAll = () => {
    if (selectedEmails.length === customerEmails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(customerEmails);
    }
  };
  const handlePreviewMarketing = () => {
    setIsConfirmPreviewOpen(true);
    setSelectedMarketing((prev) => ({
      ...prev,
      subject: marketing.subject,
      marketingId: marketing._id,
    }));
  };
  const previewMarketingConfirm = () => {
    setIsLoading(true);
    const bodyData = {
      status: "prepared",
      // emails: ["d.sebbah@yahoo.fr"],
      emails: [emailAdmin],
    };
    updateMarketing(bodyData).then((result) => {
      if (result) {
        setSelectedMarketing((prev) => ({
          ...prev,
          status: "prepared",
        }));
        toast.success("Un email de l'événement vous a été envoyé.");
      } else {
        toast.error("Une erreur s'est produite lors de l'envoi de l'email");
      }
    });
    setIsLoading(false);
    handleMarketingPreview(selectedMarketing.marketingId);
  };
  const handleSendMarketing = () => {
    setIsConfirmOpen(true);
    setSelectedMarketing((prev) => ({
      ...prev,
      subject: marketing.subject,
      marketingId: marketing._id,
    }));
  };
  const handleRemoveMarketing = () => {
    setSelectedMarketing((prev) => ({
      ...prev,
      marketingId: marketing._id,
      subject: marketing.subject,
    }));
    setIsDeleteOpen(true);
  };
  const removeMarketingConfirm = () => {
    deleteMarketing().then((result) => {
      if (result) {
        handleDeleteMarketing(selectedMarketing.marketingId);
        toast.success("Evenement supprimé avec succès.");
      } else {
        toast.error("Erreur lors de la suppression de l'evenement.");
      }
    });
  };
  const sendMarketingConfirm = () => {
    if (selectedEmails.length === 0) {
      toast.error("Veuillez choisir au moins un destinataire.");
      return;
    }
    setIsLoading(true);
    const bodyData = {
      status: "sent",
      emails: selectedEmails,
    };
    updateMarketing(bodyData).then((result) => {
      if (result) {
        handleSentMarketing(result);
        toast.success("Campagne envoyée avec succès.");
        setIsLoading(false);
      } else {
        toast.error("Erreur lors de l'envoi de la campagne.");
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <Card className="w-full max-w-lg p-4 relative">
        <CardActions
          marketingId={marketing._id}
          handleSendMarketing={handleSendMarketing}
          handleRemoveMarketing={handleRemoveMarketing}
          handlePreviewMarketing={handlePreviewMarketing}
        />
        <CardHeader>
          <h2 className="text-xl font-bold mb-2">{marketing.subject}</h2>
          <Avatar>
            <AvatarImage src={marketing.imageUrl} alt="Image de la campagne" />
            <AvatarFallback>AN</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Créé le : {formatDate(marketing.createdAt)}
          </p>
          <p className="text-gray-500">
            Dernière modification le : {formatDate(marketing.updatedAt)}
          </p>
          <CardStatusBadge status={marketing.status} />
          {marketing.sendDate && (
            <p className="text-gray-500">
              Envoyé le : {formatDate(marketing.sendDate)}
            </p>
          )}
          {marketing.status === "sent" ? (
            <>
              <EmailsSendedList
                emailsSendCount={marketing.totalSent}
                emailsList={marketing.recipients}
              />
              <ChooseRecipients
                selectedEmails={selectedEmails}
                customerEmails={customerEmails}
                toggleSelectAll={toggleSelectAll}
                toggleEmail={toggleEmail}
              />
            </>
          ) : (
            <ChooseRecipients
              selectedEmails={selectedEmails}
              customerEmails={customerEmails}
              toggleSelectAll={toggleSelectAll}
              toggleEmail={toggleEmail}
            />
          )}
        </CardContent>
        {isLoading && (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        )}
      </Card>
      <DeleteAlert
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        onConfirm={removeMarketingConfirm}
        itemNameToDelete={`l'evenement - ${selectedMarketing.subject} -`}
        onCancel={() => setIsDeleteOpen(false)}
      />
      <AlertConfirm
        isConfirmOpen={isConfirmOpen}
        setIsConfirmOpen={setIsConfirmOpen}
        title={`Etes-vous sûr de vouloir envoyer la campagne - ${selectedMarketing.subject} - ?`}
        onConfirm={sendMarketingConfirm}
      />
      <AlertConfirm
        isConfirmOpen={isConfirmPreviewOpen}
        setIsConfirmOpen={setIsConfirmPreviewOpen}
        title={`La campagne - ${selectedMarketing.subject} - ne sera envoyée qu'à votre adresse email. Confirmez-vous ?`}
        onConfirm={previewMarketingConfirm}
      />
    </>
  );
};

export default MarketingCard;
