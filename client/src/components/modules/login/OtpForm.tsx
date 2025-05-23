import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useFetch } from "@/service/hooks/useFetch";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useState } from "react";

const otpSchema = z.object({
  otp: z.string().length(6, "Le code OTP doit comporter 6 chiffres"),
});
interface OtpFormProps {
  email: string;
  authenticate: (token: string) => void;
  changeEmail: () => void;
}
interface AuthResponse {
  token: string;
}
interface OnSubmitData {
  otp: string;
}
const OtpForm: React.FC<OtpFormProps> = ({
  email,
  authenticate,
  changeEmail,
}) => {
  const [inputKey, setInputKey] = useState(0); // Clé pour forcer la réinitialisation

  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Vérification du code OTP
  const { triggerFetch } = useFetch<AuthResponse>("/auth/send-verify-otp", {
    method: "POST",
  });
  // Renvoyer un code OTP
  const { triggerFetch: reSendOtp } = useFetch("/auth/open-session", {
    method: "POST",
  });
  const resendOTP = () => {
    reSendOtp({ email });
    setInputKey((prevKey) => prevKey + 1); // Change la clé pour recréer `InputOTP`
    form.reset({ otp: "" }); // Réinitialise le champ OTP
    toast("Un nouveau code OTP a été renvoyé");
  };
  const wishlistCustomer = useSelector((state: RootState) => state.wishlist);
  const cartCustomer = useSelector((state: RootState) => state.cart);

  const onSubmit = async (data: OnSubmitData) => {
    const wishlistItemsFormated = wishlistCustomer.map((item) => item._id);
    const bodyData = {
      email,
      otp: data.otp,
      wishlistProducts: wishlistItemsFormated,
      cartProducts: cartCustomer.cartProducts,
      cartGiftcards: cartCustomer.cartGiftcards,
    };
    try {
      const OTPresponse = await triggerFetch(bodyData);
      if (OTPresponse) {
        authenticate(OTPresponse.token);
        toast.success("Vous êtes connecté 👍");
      } else {
        toast.error("Le code OTP est incorrect ou expiré");
      }
    } catch (error) {
      console.error(error);
      toast.error("Le code OTP est incorrect ou expiré");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={() => (
            <FormItem>
              <FormLabel htmlFor="otp">Entrez votre code OTP</FormLabel>
              <FormControl>
                <InputOTP
                  key={inputKey}
                  maxLength={6}
                  onChange={(newValue: string) =>
                    form.setValue("otp", newValue)
                  }
                >
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={0}
                      className="dark:text-whitesmoke dark:border-[var(--whitesmoke)] border border-[var(--whitesmoke)]"
                    />
                    <InputOTPSlot
                      index={1}
                      className="dark:text-whitesmoke dark:border-[var(--whitesmoke)] border border-[var(--whitesmoke)]"
                    />
                    <InputOTPSlot
                      index={2}
                      className="dark:text-whitesmoke dark:border-[var(--whitesmoke)] border border-[var(--whitesmoke)]"
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={3}
                      className="dark:text-whitesmoke dark:border-[var(--whitesmoke)] border border-[var(--whitesmoke)]"
                    />
                    <InputOTPSlot
                      index={4}
                      className="dark:text-whitesmoke dark:border-[var(--whitesmoke)] border border-[var(--whitesmoke)]"
                    />
                    <InputOTPSlot
                      index={5}
                      className="dark:text-whitesmoke dark:border-[var(--whitesmoke)] border border-[var(--whitesmoke)]"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Le code OTP a été envoyé à votre email {email}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Valider OTP</Button>
      </form>
      <p
        onClick={resendOTP}
        className="italic underline cursor-pointer inline w-fit ml-auto"
      >
        Renvoyer un code OTP
      </p>
      <p
        onClick={changeEmail}
        className="italic underline cursor-pointer inline w-fit ml-auto"
      >
        Changer d'email
      </p>
    </Form>
  );
};

export default OtpForm;
