import { useEffect, useState } from "react";
import { BaggageClaim } from "lucide-react";

interface TrackingNumberApiProps {
  trackingNumber?: string | null;
}

const TrackingNumberApi: React.FC<TrackingNumberApiProps> = ({
  trackingNumber,
}) => {
  const [isTrackingNumber, setIsTrackingNumber] = useState(false);

  useEffect(() => {
    // Charger dynamiquement le script de 17track
    const scriptId = "17track-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "//www.17track.net/externalcall.js";
      script.async = true;
      script.onload = () => {
        console.log("Script 17track chargé");
        if (trackingNumber) handleTrack(trackingNumber);
      };
      document.body.appendChild(script);
    } else if (trackingNumber) {
      // Si le script est déjà chargé
      handleTrack(trackingNumber);
    }
  }, [trackingNumber]);

  const handleTrack = (num: string) => {
    if (typeof window !== "undefined" && (window as any).YQV5) {
      (window as any).YQV5.trackSingle({
        YQ_ContainerId: "YQContainer",
        YQ_Height: 560,
        YQ_Fc: "0",
        YQ_Lang: "fr",
        YQ_Num: num.trim(),
      });
    } else {
      console.error("17track script non disponible.");
    }
  };

  useEffect(() => {
    if (trackingNumber) {
      setIsTrackingNumber(true);
    } else {
      setIsTrackingNumber(false);
    }
  }, [trackingNumber]);

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6 border-2 rounded">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <span>
          Suivi de colis № :{" "}
          <span className="text-sm underline underline-offset-4">
            {trackingNumber}{" "}
          </span>{" "}
        </span>{" "}
        <BaggageClaim />{" "}
      </h1>
      {!isTrackingNumber && (
        <p>Le numéro de suivi n'a pas encore été assigné.</p>
      )}
      <div id="YQContainer" className="mt-6 border rounded-md p-4"></div>
    </div>
  );
};

export default TrackingNumberApi;
