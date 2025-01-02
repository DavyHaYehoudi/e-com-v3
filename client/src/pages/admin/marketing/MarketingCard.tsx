import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MarketingCampaignDBType } from "@/types/MarketingTypes";
import useMarketing from "@/hooks/dashboard/admin/useMarketing";
import ValidBadge from "@/components/shared/badge/ValidBadge";
import PendingBadge from "@/components/shared/badge/PendingBadge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { SelectMarketing } from "./MarketingPage";
import { formatDate } from "@/utils/formatDate";
import DeleteAlert from "@/components/shared/dialog/DeleteAlert";
import { toast } from "sonner";
import AlertConfirm from "@/components/shared/dialog/AlertConfirm";
import EmailsSendedList from "./EmailsSendedList";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

interface MarketingCardProps {
  marketing: MarketingCampaignDBType;
  customerEmails: string[];
  handleDeleteMarketing: (marketingId: string) => void;
  selectedMarketing: SelectMarketing;
  setSelectedMarketing: React.Dispatch<React.SetStateAction<SelectMarketing>>;
  isDeleteOpen: boolean;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSentMarketing: (result: MarketingCampaignDBType) => void;
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
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteMarketing, sentMarketing } = useMarketing(
    selectedMarketing.marketingId
  );

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

  const removeMarketing = () => {
    deleteMarketing().then((result) => {
      if (result) {
        handleDeleteMarketing(selectedMarketing.marketingId);
        toast.success("Evenement supprimé avec succès.");
      } else {
        toast.error("Erreur lors de la suppression de l'evenement.");
      }
    });
  };
  const sendMarketing = () => {
    setIsLoading(true);
    const bodyData = {
      emails: selectedEmails,
    };
    sentMarketing(bodyData).then((result) => {
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
        <button
          onClick={() => {
            setSelectedMarketing((prev) => ({
              ...prev,
              marketingId: marketing._id,
              subject: marketing.subject,
            }));
            setIsDeleteOpen(true);
          }}
        >
          <Trash2 className="absolute right-2 cursor-pointer" />
        </button>
        <CardHeader>
          <h2 className="text-xl font-bold mb-2">{marketing.subject}</h2>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Créé le : {formatDate(marketing.createdAt)}
          </p>
          {marketing.status === "sent" ? (
            <ValidBadge label="envoyé" />
          ) : (
            <PendingBadge label="en attente" />
          )}
          {marketing.sendDate && (
            <p className="text-gray-500">
              Envoyé le : {formatDate(marketing.sendDate)}
            </p>
          )}
          {marketing.status === "sent" ? (
            <EmailsSendedList
              emailsSendCount={marketing.totalSent}
              emailsList={marketing.recipients}
            />
          ) : (
            <>
              <p className="text-gray-500 mt-2">
                Destinataires : {selectedEmails.length}
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="mt-4">
                    Choisir les destinataires
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem
                    checked={selectedEmails.length === customerEmails.length}
                    onCheckedChange={toggleSelectAll}
                  >
                    Tout sélectionner
                  </DropdownMenuCheckboxItem>
                  {customerEmails.map((email) => (
                    <DropdownMenuCheckboxItem
                      key={email}
                      checked={selectedEmails.includes(email)}
                      onCheckedChange={() => toggleEmail(email)}
                    >
                      {email}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </CardContent>
        {isLoading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <CardFooter className="flex flex-col gap-2">
            {selectedEmails.length === 0 && marketing.status !== "sent" && (
              <p className="italic text-xs">Ajouter au moins un destinataire</p>
            )}
            {marketing.status !== "sent" && (
              <Button
                onClick={() => {
                  setIsConfirmOpen(true);
                  setSelectedMarketing((prev) => ({
                    ...prev,
                    subject: marketing.subject,
                    marketingId: marketing._id,
                  }));
                }}
                className="w-full"
                disabled={selectedEmails.length === 0}
              >
                Envoyer
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
      <DeleteAlert
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        onConfirm={removeMarketing}
        itemNameToDelete={`l'evenement - ${selectedMarketing.subject} -`}
        onCancel={() => setIsDeleteOpen(false)}
      />
      <AlertConfirm
        isConfirmOpen={isConfirmOpen}
        setIsConfirmOpen={setIsConfirmOpen}
        title={`Etes-vous sûr de vouloir envoyer la campagne - ${selectedMarketing.subject} - ?`}
        onConfirm={sendMarketing}
      />
    </>
  );
};

export default MarketingCard;
