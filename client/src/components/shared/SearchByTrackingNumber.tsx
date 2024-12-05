"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { BaggageClaim } from "lucide-react";

const SearchByTrackingNumber = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [error, setError] = useState("");

  const handleTrack = () => {
    if (!trackingNumber.trim()) {
      setError("Veuillez entrer un numéro de suivi.");
      return;
    }
    setError(""); // Clear any previous errors
    if (typeof window !== "undefined" && (window as any).YQV5) {
      (window as any).YQV5.trackSingle({
        YQ_ContainerId: "YQContainer",
        YQ_Height: 560,
        YQ_Fc: "0",
        YQ_Lang: "fr",
        YQ_Num: trackingNumber.trim(),
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6 border-2 rounded">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <span>Suivi de colis</span> <BaggageClaim />{" "}
      </h1>
      <p className="text-sm text-muted-foreground">
        Entrez votre numéro de suivi pour suivre l&apos;acheminement de votre
        commande.
      </p>
      <div className="space-y-4">
        <Input
          placeholder="Entrez votre numéro de suivi"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
        {error && <Alert variant="destructive">{error}</Alert>}
        <Button onClick={handleTrack}>Suivre mon colis</Button>
      </div>
      <div id="YQContainer" className="mt-6 border rounded-md p-4"></div>
      <script
        type="text/javascript"
        src="//www.17track.net/externalcall.js"
        async
      ></script>
    </div>
  );
};
export default SearchByTrackingNumber;
