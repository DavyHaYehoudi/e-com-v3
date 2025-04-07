import FullscreenLoader from "@/components/shared/FullscreenLoader";
import ImageUploaderBox from "@/components/shared/ImageUploaderBox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useVisual from "@/hooks/dashboard/admin/useVisual";
import useVisualPublic from "@/hooks/useVisualPublic";
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "@/utils/imageManage";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Designation = "image1";

const visualsMap: {
  designation: Designation;
  label: string;
  required: boolean;
}[] = [{ designation: "image1", label: "Image 1 :", required: true }];

const CreaterPageVisuals = () => {
  const [visuals, setVisuals] = useState<
    Record<Designation, File | string | null>
  >({
    image1: null,
  });
  const { defaultValues } = useVisualPublic("createrPage");
  useEffect(() => {
    if (defaultValues) {
      setVisuals({ ...defaultValues });
    }
  }, [defaultValues]);

  const [urlFirebaseToDelete, setUrlFirebaseToDelete] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updateVisual } = useVisual("createrPage");

  const handleImageUpload = (
    image: File | string | null,
    designation: Designation
  ) => {
    setVisuals((prev) => ({ ...prev, [designation]: image }));
    setIsEditing(true);
  };

  const handleRemoveImage = (
    image: File | string,
    designation: Designation
  ) => {
    setVisuals((prev) => ({ ...prev, [designation]: null }));
    if (typeof image === "string") {
      setUrlFirebaseToDelete((prev) => [...prev, image]);
    }
    setIsEditing(true);
  };
  const handleValidate = async () => {
    try {
      if (!visuals["image1"]) {
        toast.error("L'image 1 est requise");
        return;
      }

      setIsLoading(true);

      // Suppression des anciennes images
      if (urlFirebaseToDelete.length > 0) {
        await Promise.all(
          urlFirebaseToDelete.map((url) => deleteImageFromFirebase(url))
        );
      }
      setUrlFirebaseToDelete([]);

      // Upload des nouvelles images et récupération des URLs
      const updatedVisualsEntries = await Promise.all(
        Object.entries(visuals).map(async ([designation, value]) => {
          if (value === null) return [designation, null];
          const url = await uploadImageToFirebase(value, "visuals");
          return [designation, url];
        })
      );

      // Reconstruire l'objet visuals avec les nouvelles URLs
      const updatedVisuals = Object.fromEntries(
        updatedVisualsEntries
      ) as Record<Designation, File | string | null>;

      // envoi API
      const bodyData = { createrPage: updatedVisuals };
      updateVisual(bodyData).then((result) => {
        if (result) {
          toast.success("Modifications prises en compte avec succès !");
        }
      });

      setVisuals(updatedVisuals);
    } catch (error) {
      console.error("Erreur :", error);
      toast.error("Une erreur est survenue lors des modifications.");
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  if (isLoading) {
    return <FullscreenLoader />;
  }
  return (
    <article>
      <h2>Page creatrice</h2>
      <div className="flex justify-center flex-wrap items-center gap-5 my-5">
        {visualsMap.map(({ designation, label, required }) => (
          <div key={designation}>
            <Label className="text-sm font-medium">
              {label}
              {required && <span className="text-red-500 text-2xl">*</span>}
            </Label>
            <ImageUploaderBox
              width={300}
              height={300}
              image={visuals[designation]}
              handleImageUpload={(e) =>
                handleImageUpload(e.target.files?.[0] || null, designation)
              }
              handleRemoveImage={() =>
                handleRemoveImage(visuals[designation]!, designation)
              }
            />
          </div>
        ))}
      </div>
      <div className="text-center">
        <Button
          className="mt-4 bg-green-500 hover:bg-green-600 text-white"
          onClick={handleValidate}
          disabled={!isEditing}
        >
          Enregistrer les modifications
        </Button>
      </div>
    </article>
  );
};

export default CreaterPageVisuals;
