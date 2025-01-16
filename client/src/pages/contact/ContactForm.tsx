import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"; 
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { CheckCircle, XCircle, Loader, Unlock } from "lucide-react";
import emailjs from "@emailjs/browser";
import { ContactFormValues, contactSchema } from "./contactSchema";

const ContactForm = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      message: "",
    },
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const publicKey = import.meta.env.VITE_FORMULAIRE_PUBLIC_API_KEY;
  const template_id = import.meta.env.VITE_FORMULAIRE_TEMPLATE_KEY || "";
  const service_id = import.meta.env.VITE_FORMULAIRE_SERVICE_KEY || "";
  const onSubmit = async () => {
    setStatus("loading");
    if (formRef.current) {
      emailjs
        .sendForm(service_id, template_id, formRef.current, { publicKey })
        .then(() => {
          setStatus("success");
        })
        .catch((error) => {
          console.log(
            "Erreur dans l'envoi de mail formulaire contact :",
            error
          );
          setStatus("error");
        });
    }
  };

  return (
    <main className="space-y-6">
      {/* Message pour la sécurité et la confidentialité */}
      <p
        id="contact-text"
        className="flex items-center space-x-2 text-sm text-gray-600"
      >
        <Unlock size={24} className="mr-2 text-green-500" />
        <span className="dark:text-[var(--whiteSmoke)]">
          Les informations saisies sur cette page sont confidentielles et
          sécurisées
        </span>
      </p>

      {/* Gestion des différents états : envoi en cours, succès ou erreur */}
      {status === "loading" ? (
        <div className="flex items-center justify-center space-x-2 p-4 rounded-md">
          <Loader className="animate-spin text-gray-500" size={24} />
          <p>Envoi en cours...</p>
        </div>
      ) : status === "success" ? (
        <div className="flex items-center justify-center space-x-2 bg-green-100 p-4 rounded-md">
          <CheckCircle className="text-green-500" size={24} />
          <p className="text-green-700">
            Votre message a été envoyé avec succès !
          </p>
        </div>
      ) : status === "error" ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 bg-red-100 p-4 rounded-md">
            <XCircle className="text-red-500" size={24} />
            <p className="text-red-700">
              Erreur lors de l&apos;envoi du message. Veuillez réessayer.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setStatus("idle")} // Permet de réinitialiser l'état et de réafficher le formulaire
          >
            Réessayer
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            ref={formRef}
          >
            <FormField
              control={form.control}
              name="firstName"
              render={() => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <Input placeholder="Prénom" {...field} />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={() => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <Input placeholder="Nom" {...field} />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={() => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <Input placeholder="Téléphone" {...field} />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={() => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <Textarea placeholder="Votre message" {...field} />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Envoyer
            </Button>
          </form>
        </Form>
      )}
    </main>
  );
};

export default ContactForm;
