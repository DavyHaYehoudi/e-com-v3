import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProduct from "@/hooks/dashboard/admin/useProduct";
import { ProductInputDTO } from "../../../pages/admin/catalogue/products/sheetProduct/productSchema";
import { toast } from "sonner";
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "@/utils/imageManage";

interface UseProductFormHandlerProps {
  productId?: string;
}

export const useProductFormHandler = ({
  productId,
}: UseProductFormHandlerProps) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const navigate = useNavigate();
  const { createProduct, udpateProduct } = useProduct(productId);

  const onSubmitProductForm = async (
    data: ProductInputDTO,
    heroImage: File | string | null,
    mainImage: File | string | null,
    secondaryImages: (File | string)[],
    variantsToAddList: {
      combination: string;
      mainImage: File | string | null;
      secondaryImages: (File | string)[];
    }[],
    urlFirebaseToDelete: string[],
    selectedCollections: string[],
    selectedCategories: string[],
    selectedTags: string[]
  ) => {
    setIsSubmitLoading(true);
    // Firebase Storage
    try {
      if (!heroImage) return;
      const heroImageToDB = await uploadImageToFirebase(heroImage, "products");

      if (!mainImage) return;
      const mainImageToDB = await uploadImageToFirebase(mainImage, "products");

      const secondaryImagesToDB = await Promise.all(
        secondaryImages.map((secImg) =>
          uploadImageToFirebase(secImg, "products")
        )
      ).then((results) =>
        results.filter((url) => !urlFirebaseToDelete.includes(url))
      );

      const variantsToAddListToDB = await Promise.all(
        variantsToAddList.map(async (variant) => {
          // Upload de l'image principale du variant
          const mainImageVariantToDB = variant.mainImage
            ? await uploadImageToFirebase(variant.mainImage, "products")
            : undefined;

          // Upload des images secondaires du variant
          const secondaryImagesVariantToDB = await Promise.all(
            variant.secondaryImages.map((secImg) =>
              uploadImageToFirebase(secImg, "products")
            )
          ).then((results) =>
            results.filter((url) => !urlFirebaseToDelete.includes(url))
          );

          return {
            combination: variant.combination,
            mainImage: mainImageVariantToDB,
            secondaryImages: secondaryImagesVariantToDB,
          };
        })
      );
      await Promise.all(
        urlFirebaseToDelete.map(async (url) => {
          await deleteImageFromFirebase(url);
        })
      );

      const bodyData = {
        name: data.name,
        description: data.description,
        heroImage: heroImageToDB,
        promotionPercentage: data.promotionPercentage,
        promotionEndDate: data.promotionEndDate?.toISOString() || null,
        continueSelling: data.continueSelling,
        quantityInStock: data.quantityInStock,
        price: data.price,
        newUntil: data.newUntil?.toISOString() || null,
        isPublished: data.isPublished,
        cashback: data.cashback,
        collections: selectedCollections,
        categories: selectedCategories,
        tags: selectedTags,
        variants: [
          // Toujours positionner au 1er index la mainImage/secondaryImages du produit
          {
            combination: "Model unique",
            mainImage: mainImageToDB,
            secondaryImages: secondaryImagesToDB,
          },
          ...variantsToAddListToDB,
        ],
        isStar: data.isStar,
        isArchived: data.isArchived,
      };

      if (productId) {
        udpateProduct(bodyData).then((result) => {
          if (result) {
            toast.success("Le produit a été mis à jour avec succès!");
            return navigate("/admin/tableau-de-bord/catalogue/produits/liste");
          }
          toast.error(
            "Une erreur s'est produite lors de la mise à jour du produit"
          );
        });
      } else {
        createProduct(bodyData).then((result) => {
          if (result) {
            toast.success("Le produit a été créé avec succès!");
            return navigate("/admin/tableau-de-bord/catalogue/produits/liste");
          }
          toast.error(
            "Une erreur s'est produite lors de la création du produit"
          );
        });
      }
    } catch (error) {
      console.log("error:", error);
      setIsSubmitLoading(false);
      toast.error(
        "Une erreur s'est produite avec les modifications de la fiche produit."
      );
    }
  };

  return {
    onSubmitProductForm,
    isSubmitLoading,
  };
};
