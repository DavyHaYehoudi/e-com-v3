"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SessionExpired = () => {
  const isTokenExpired = useSelector(
    (state: RootState) => state.auth.isTokenExpired
  );
  const [isOpen, setIsOpen] = useState(false);

  // Ouvrir la modale lorsque isTokenExpired passe à true
  useEffect(() => {
    if (isTokenExpired) {
      setIsOpen(true);
    }
  }, [isTokenExpired]);

  const handleClose = () => {
    setIsOpen(false); // Fermer la modale après la déconnexion
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Session Expirée</DialogTitle>
          <DialogDescription>
            Votre session a expiré. Veuillez vous reconnecter.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SessionExpired;
