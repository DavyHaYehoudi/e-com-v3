import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { EmailFormValues, emailSchema } from "../schema/emailSchema";

const EmailForm = ({
  onSubmit,
}: {
  onSubmit: (data: EmailFormValues) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email input */}
      <div className="flex flex-col space-y-1">
        <Label>Email</Label>
        <Input
          {...register("email")}
          placeholder="Votre email"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      </div>

      {/* Email confirmation */}
      <div className="flex flex-col space-y-1">
        <Label>Confirmez l&apos;email</Label>
        <Input
          {...register("confirmEmail")}
          placeholder="Confirmez votre email"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        {errors.confirmEmail && (
          <p className="text-red-600">{errors.confirmEmail.message}</p>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white uppercase"
      >
        Recevoir le code
      </Button>
    </form>
  );
};

export default EmailForm;
