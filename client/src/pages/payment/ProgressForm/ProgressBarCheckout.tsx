import { Mail, Home, MapPin, CreditCard } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ProgressBarCheckout = ({ step }: { step: number }) => {
  const totalSteps = 4; // Nombre total d'étapes
  const progressValue = ((step - 1) / totalSteps) * 100; // Calcul du pourcentage
  return (
    <div className="flex items-center flex-wrap gap-5 mb-8 relative">
      <div
        className={`flex items-center ${
          step > 1 ? "text-green-500" : "text-gray-400"
        }`}
      >
        <Mail className="w-6 h-6 mr-2" />
        <span>Authentification</span>
      </div>
      <div
        className={`flex items-center ${
          step > 2 ? "text-green-500" : "text-gray-400"
        }`}
      >
        <Home className="w-6 h-6 mr-2" />
        <span>Adresse de livraison</span>
      </div>
      <div
        className={`flex items-center ${
          step > 3 ? "text-green-500" : "text-gray-400"
        }`}
      >
        <MapPin className="w-6 h-6 mr-2" />
        <span>Adresse de facturation</span>
      </div>
      <div
        className={`flex items-center ${
          step > 4 ? "text-green-500" : "text-gray-400"
        }`}
      >
        <CreditCard className="w-6 h-6 mr-2" />
        <span>Paiement</span>
      </div>
      <Progress
        value={progressValue}
        className="w-full bg-gray-200 progress-bar"
        indicatorColor="bg-green-500"
      />
    </div>
  );
};
export default ProgressBarCheckout;
