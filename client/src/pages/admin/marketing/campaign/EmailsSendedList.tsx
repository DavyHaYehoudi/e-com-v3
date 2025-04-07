import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface EmailsSendedListProps {
  emailsSendCount: number;
  emailsList: string[];
}
const EmailsSendedList: React.FC<EmailsSendedListProps> = ({
  emailsSendCount,
  emailsList,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="max-w-[350px] space-y-2 my-8 text-center"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <p className="text-sm font-semibold">
          {emailsSendCount} destinataire{emailsSendCount > 1 ? "s" : ""}
        </p>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
        Liste des emails envoyés
      </div>
      <CollapsibleContent className="space-y-2">
        {emailsList.map((email) => (
          <div
            key={email}
            className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm"
          >
            {email}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
export default EmailsSendedList;
