import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useMarketing from "@/hooks/dashboard/admin/useMarketing";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Quill } from "react-quill";
import ReactQuill from "react-quill";
import * as Emoji from "quill-emoji";
import "quill-emoji/dist/quill-emoji.css"; // Styles d'emoji
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "@/utils/imageManage";
import ImageUploaderBox from "@/components/shared/ImageUploaderBox";
import { useNavigate, useParams } from "react-router-dom";
import { MarketingCampaignDBType } from "@/types/MarketingTypes";
import NavBackDashboard from "@/components/shared/NavBackDashboard";
import FullscreenLoader from "@/components/shared/FullscreenLoader";

const updateMarketingCampaignSchema = z.object({
  subject: z
    .string()
    .min(1, { message: "Le sujet de la campagne est requis." }),
  content: z
    .string()
    .min(1, { message: "Le contenu HTML de la campagne est requis." }),
  linkCTA: z.string().url({ message: "URL du lien invalide." }),
});
type UpdateMarketingCampaignDTO = z.infer<typeof updateMarketingCampaignSchema>;

const MarketingUpdate: React.FC = () => {
  const [marketing, setMarketing] = useState<MarketingCampaignDBType | null>(
    null
  );
  const [previewImage, setPreviewImage] = useState<File | string | null>(null);
  console.log("previewImage:", previewImage);
  const [urlFirebaseToDelete, setUrlFirebaseToDelete] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { marketingId } = useParams();
  const { updateMarketing, getOneMarketing } = useMarketing(marketingId);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateMarketingCampaignDTO>({
    resolver: zodResolver(updateMarketingCampaignSchema),
  });
  useEffect(() => {
    const getFetchData = async () => {
      try {
        if (!marketing) {
          const data = await getOneMarketing();
          setMarketing(data || null);
          setPreviewImage(data?.imageUrl || "");
          reset(data);
        }
      } catch (error) {
        console.log("error:", error);
        toast.error(
          "Une erreur s'est produite avec la récupération de l'événement"
        );
      }
    };
    getFetchData();
  }, [marketingId, getOneMarketing, marketing, reset]);

  const Font = ReactQuill.Quill.import("formats/font");
  ReactQuill.Quill.register(Font, true);
  Quill.register("modules/emoji", Emoji);
  // Définir les options de la barre d'outils
  const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "emoji"], // Bouton emoji ajouté
    ["clean"],
  ];
  const modules = {
    toolbar: toolbarOptions,
    "emoji-toolbar": true,
    "emoji-textarea": true,
    "emoji-shortname": true,
  };

  const onSubmit = async (data: UpdateMarketingCampaignDTO) => {
    try {
      if (!previewImage) {
        toast.error("L'image est requise");
        return;
      }
      setIsLoading(true);
      if (urlFirebaseToDelete) {
        await deleteImageFromFirebase(urlFirebaseToDelete);
      }
      const url = await uploadImageToFirebase(previewImage, "marketing");
      const bodyData = {
        subject: data.subject,
        imageUrl: url,
        content: data.content,
        linkCTA: data.linkCTA,
      };
      await updateMarketing(bodyData);
      toast.success("Campagne modifiée avec succès !");
      reset();
      setPreviewImage(null);
      navigate("/admin/tableau-de-bord/marketing/liste");
    } catch (error) {
      console.error("Erreur :", error);
      toast.error("Une erreur est survenue lors de l'envoi.");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <FullscreenLoader />;
  }
  const handleRemoveImage = (image: File | string) => {
    if (typeof image === "string") {
      setUrlFirebaseToDelete(image);
    }
    setPreviewImage(null);
  };
  return (
    <div>
      <NavBackDashboard
        path="marketing/liste"
        text="Revenir à la liste des événements"
        role="admin"
      />
      <div className="w-full xl:w-1/2 mx-auto p-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Modifier la campagne marketing
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Champ Titre */}
          <div>
            <Label htmlFor="subject">Sujet (objet et titre du mail)</Label>
            <Input
              type="text"
              {...register("subject")}
              className={`w-full p-3 border ${
                errors.subject ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.subject && (
              <p className="text-red-500">{errors.subject.message}</p>
            )}
          </div>
          {/* Champ CTA */}
          <div className=" my-16">
            <Label htmlFor="linkCTA">Lien de renvoi vers la page du site</Label>
            <Input
              type="text"
              {...register("linkCTA")}
              className={`w-full p-3 border ${
                errors.linkCTA ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              placeholder="https://ateliernoaralya/produit/059834572111085"
            />
            {errors.linkCTA && (
              <p className="text-red-500">{errors.linkCTA.message}</p>
            )}
          </div>
          {/* Champ Image */}
          <div>
            <Label>Image de la campagne</Label>
            <div className="flex justify-center my-10">
              <ImageUploaderBox
                image={previewImage}
                width={400}
                height={350}
                handleImageUpload={(e) =>
                  setPreviewImage(e.target.files?.[0] as File)
                }
                handleRemoveImage={handleRemoveImage}
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Contenu du mail
            </Label>
            <Controller
              name="content"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <ReactQuill
                  {...field}
                  theme="snow"
                  modules={modules}
                  className={`mt-2 h-96 w-full  ${
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

          {/* Bouton de soumission */}
          <div className="flex justify-center ">
            <Button
              type="submit"
              className="w-1/2 flex justify-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 mt-16"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Envoi en cours..."
                : "Enregistrer les modifications"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarketingUpdate;
