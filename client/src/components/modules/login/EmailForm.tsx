"use client";
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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { useFetch } from "@/service/hooks/useFetch";

// Schéma de validation Zod
const emailSchema = z.object({
  email: z.string().email("L'email doit être valide"),
});
interface EmailFormProps {
  onEmailSubmit: (email: string) => void;
}
interface OnSubmitData {
  email: string;
}
const EmailForm: React.FC<EmailFormProps> = ({ onEmailSubmit }) => {
  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });
  const { triggerFetch } = useFetch("/auth/open-session", { method: "POST" });
  const { handleSubmit } = form;

  const onSubmit = async (data: OnSubmitData) => {
    const bodyData = { email: data.email };
    await triggerFetch(bodyData);
    onEmailSubmit(data.email);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Votre email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  id="email"
                  placeholder="email@exemple.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Entrez votre adresse e-mail pour recevoir un code OTP.
              </FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Envoyer OTP</Button>
      </form>
    </Form>
  );
};

export default EmailForm;
