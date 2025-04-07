import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

interface ChooseRecipientsProps {
  selectedEmails: string[];
  customerEmails: string[];
  toggleSelectAll: () => void;
  toggleEmail: (email: string) => void;
}
const ChooseRecipients: React.FC<ChooseRecipientsProps> = ({
  selectedEmails,
  customerEmails,
  toggleSelectAll,
  toggleEmail,
}) => {
  return (
    <>
      <p className="text-gray-500 mt-2">
        Destinataire{selectedEmails.length > 1 ? "s" : ""} :{" "}
        {selectedEmails.length}
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
  );
};

export default ChooseRecipients;
