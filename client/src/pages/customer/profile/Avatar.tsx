import ImageUploaderBox from "@/components/shared/ImageUploaderBox";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import useCustomerInfo from "@/hooks/dashboard/customer/useCustomerInfo";
import { RootState } from "@/redux/store/store";
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "@/utils/imageManage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Avatar = () => {
  const [image, setImage] = useState<File | string | null>(null);
  const [originImage, setOriginImage] = useState("");
  const [urlDeleted, setUrlDeleted] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { customerInfoFetch, customerInfoUpdate } = useCustomerInfo();
  const isConnected = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setIsLoading(true);
        const data = await customerInfoFetch();
        if (data) {
          setOriginImage(data.avatarUrl);
          setImage(data.avatarUrl);
        }
      } catch (error) {
        console.log("error:", error);
        toast.error(
          "Une erreur est survenue lors de la récupération de vos informations"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomer();
  }, [customerInfoFetch]);

  useEffect(() => {
    if (image instanceof File) {
      setIsUpdated(true);
    }
  }, [image]);

  const handleImageUpload = (image: File | string | null) => {
    setImage(image);
  };
  const handleRemoveImage = () => {
    if (!(image instanceof File) && image) {
      setUrlDeleted(image);
    }
    setImage(null);
  };
  const handleConfirm = async () => {
    if (!image) {
      toast.error(
        "Veuillez choisir une image pour valider votre modification."
      );
      return;
    }
    if (!(image instanceof File)) {
      toast.error("Il n'a pas eu de modification apportée.");
      return;
    }
    if (!isConnected) {
      toast.error("Vous êtes déconnecté");
      return;
    }
    try {
      if (image instanceof File) {
        setIsLoading(true);
        if (urlDeleted) {
          await deleteImageFromFirebase(urlDeleted);
        }
        const url = await uploadImageToFirebase(image, "avatars");
        await customerInfoUpdate({ avatarUrl: url });
        setIsUpdated(false);
        setUrlDeleted("");
        toast.success("Votre image de profil a bien été modifiée.");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la modification de votre image de profil :",
        error
      );
      toast.error(
        "Une erreur est survenue lors de la modification de votre image de profil."
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    setImage(originImage);
    setUrlDeleted("");
    toast.success("Votre modification a été annulée.");
  };
  if (isLoading) {
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner />
        <span> Chargement en cours...</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-center">Mon image de profil</h1>
      <ImageUploaderBox
        image={image}
        width={250}
        height={250}
        handleImageUpload={(e) =>
          handleImageUpload(e.target.files?.[0] || null)
        }
        handleRemoveImage={handleRemoveImage}
      />
      {isUpdated && (
        <div className="flex items-center justify-between gap-2">
          <Button onClick={handleCancel}>Annuler</Button>
          <Button
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={handleConfirm}
          >
            Valider
          </Button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
