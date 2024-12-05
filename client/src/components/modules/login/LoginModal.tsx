"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EmailForm from "./EmailForm";
import OtpForm from "./OtpForm";
import { UserRound } from "lucide-react";

interface LoginModalProps {
  authenticate: (token: string) => void;
  label?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({
  authenticate,
  label = "",
}) => {
  const [emailSent, setEmailSent] = useState<string | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[var(--golden-2)] hover:bg-[var(--golden-2-hover)] p-2 mb-2">
          <UserRound className="w-6 h-6" />
          {label && <span className="ml-2">{label}</span>}
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            <UserRound className="w-6 h-6 cursor-pointer" />
          </DialogTitle>
          <DialogDescription asChild>
            {!emailSent ? (
              <EmailForm
                onEmailSubmit={(submittedEmail: string) =>
                  setEmailSent(submittedEmail)
                }
              />
            ) : (
              <OtpForm email={emailSent} authenticate={authenticate} />
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
