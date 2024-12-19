import { useForm, Controller } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "quill-emoji/dist/quill-emoji.css"; // Styles d'emoji
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Quill } from "react-quill";
import * as Emoji from "quill-emoji";
import useMarketing from "@/hooks/dashboard/admin/useMarketing";
import { toast } from "sonner";

const createMarketingCampaignSchema = z.object({
  subject: z
    .string()
    .min(1, { message: "Le sujet de la campagne est requis." }),
  content: z
    .string()
    .min(1, { message: "Le contenu HTML de la campagne est requis." }),
});

type CreateMarketingCampaignDTO = z.infer<typeof createMarketingCampaignSchema>;

const CreateMarketingCampaign: React.FC = () => {
  const { createMarketing } = useMarketing();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateMarketingCampaignDTO>({
    resolver: zodResolver(createMarketingCampaignSchema),
  });

  const onSubmit = async (data: CreateMarketingCampaignDTO) => {
    try {
      const bodyData = {
        subject: data.subject,
        content: data.content,
      };
      await createMarketing(bodyData).then((result) => {
        if (result) {
          toast.success("Campagne ajoutée avec succès !");
        }
      });
      reset();
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      alert("Une erreur est survenue !");
    }
  };
  const Font = ReactQuill.Quill.import("formats/font");
  ReactQuill.Quill.register(Font, true);
  // Enregistrer le module Emoji dans Quill
  Quill.register("modules/emoji", Emoji);

  // Définir les options de la barre d'outils
  const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "emoji"], // Bouton emoji ajouté
    ["clean"],
  ];

  return (
    <div className="w-full xl:w-1/2 mx-auto p-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Ajouter une campagne marketing
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Titre de la campagne
          </label>
          <input
            type="text"
            id="subject"
            {...register("subject")}
            className={`mt-2 block w-full p-3 border ${
              errors.subject
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200`}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Contenu du mail
          </label>
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ReactQuill
                {...field}
                theme="snow"
                modules={{
                  toolbar: { container: toolbarOptions },
                  "emoji-toolbar": true,
                  "emoji-textarea": true,
                  "emoji-shortname": true,
                }}
                className={`mt-2 h-64 w-full  ${
                  errors.content
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-lg dark:bg-gray-700 dark:text-gray-200`}
              />
            )}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600 my-16"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." : "Ajouter la campagne"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMarketingCampaign;
