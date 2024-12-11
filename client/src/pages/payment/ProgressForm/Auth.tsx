import { useState } from "react";
import EmailForm from "./EmailForm";
import { useFetch } from "@/service/hooks/useFetch";
import OtpForm from "@/components/modules/login/OtpForm";
import useAuth from "@/app/(public)/hooks/useAuth";

interface OnSubmitData {
  email: string;
}
const Auth = () => {
  const [step, setStep] = useState(1); // Étape actuelle : 1 pour email, 2 pour OTP
  const [emailData, setEmailData] = useState("");
  const { triggerFetch } = useFetch("/auth/open-session", { method: "POST" });


  const handleEmailSubmit = async(data: OnSubmitData) => {
    const bodyData = { email: data.email };
    await triggerFetch(bodyData);
    setEmailData(data.email); 
    setStep(2); // Passe à l'étape OTP
  };

  const { handleAuthentication } = useAuth();

  return (
    <div className="p-4 bg-white shadow-md rounded-lg dark bg-dark">
      {step === 1 && <EmailForm onSubmit={handleEmailSubmit} />}
      {step === 2 && <OtpForm authenticate={handleAuthentication}email={emailData} />}
    </div>
  );
};

export default Auth;
