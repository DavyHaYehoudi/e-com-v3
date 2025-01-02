import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductInputDTO, productSchema } from "./productSchema";
import useCategory from "@/hooks/dashboard/admin/useCategory";
import useTag from "@/hooks/dashboard/admin/useTag";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CategoryDBType } from "@/types/CategoryTypes";
import { TagDBType } from "@/types/TagTypes";
import OptionSwitch from "./sections/OptionSwitch";
import AttributeField from "./sections/AttributeField";
import PromotionField from "./sections/PromotionField";
import Classifying from "./sections/Classifying";
import ImageUploader from "./sections/ImageUploader";
import { CollectionDBType } from "@/types/collectionTypes";
import useCollection from "@/hooks/dashboard/admin/useCollection";
import VariantsToAdd from "./sections/VariantsToAdd";
import HeaderSection from "./sections/HeaderSection";
import DescriptionSection from "./sections/DescriptionSection";
import PriceSection from "./sections/PriceSection";
import StockSection from "./sections/StockSection";
import CashbackSection from "./sections/CashbbackSection";
import useProduct from "@/hooks/dashboard/admin/useProduct";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useProductDefaultValues from "@/hooks/dashboard/admin/useProductDefaultValues";
import NavBackDashboard from "@/components/shared/NavBackDashboard";

export interface ImagesCarousselType {
  mainImage: File | null;
  secondaryImages: File[];
}
export interface VariantsToAddType {
  combination: string;
  mainImage: File | null;
  secondaryImages: File[];
}
export type AddingVariantType = "combination" | "images";
const ProductForm: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDBType[]>([]);
  const [tags, setTags] = useState<TagDBType[]>([]);
  const [collections, setCollections] = useState<CollectionDBType[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [secondaryImages, setSecondaryImages] = useState<File[]>([]);
  const [addOneVariant, setAddOneVariant] = useState(false);
  const [variantsToAddList, setVariantsToAddList] = useState<
    VariantsToAddType[]
  >([]);

  const { getCollections } = useCollection();
  const { getCategories } = useCategory();
  const { getTags } = useTag();
  const { defaultValues, productId } = useProductDefaultValues();
  const { createProduct, udpateProduct } = useProduct(productId);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await getTags();
      if (response) {
        setTags(response);
      }
    };
    fetchTags();
  }, [getTags]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      if (response) {
        setCategories(response);
      }
    };
    fetchCategories();
  }, [getCategories]);
  useEffect(() => {
    const fetchCollections = async () => {
      const response = await getCollections();
      if (response) {
        setCollections(response);
      }
    };
    fetchCollections();
  }, [getCollections]);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductInputDTO>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
      setSelectedCollections(defaultValues.collections);
      setSelectedCategories(defaultValues.categories);
      setSelectedTags(defaultValues.tags);
    }
  }, [defaultValues, reset]);
  const navigate = useNavigate();
  const onSubmit = async (data: ProductInputDTO) => {
    const variantsToAddListWaitingFirebase = variantsToAddList.map(
      (variant) => {
        return {
          combination: variant.combination,
          mainImage: variant.mainImage?.name,
          secondaryImages: variant.secondaryImages.map((image) => image.name),
        };
      }
    );
    const bodyData = {
      name: data.name,
      description: data.description,
      heroImage: heroImage?.name,
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
        {
          combination: "Model unique",
          mainImage: mainImage?.name,
          secondaryImages: secondaryImages.map((image) => image.name),
        },
        ...variantsToAddListWaitingFirebase, // Ajoute les autres variantes dans l'ordre voulu
      ],
      isStar: data.isStar,
      isArchived: data.isArchived,
    };
    if (productId) {
      console.log("bodyData:", bodyData);
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
        toast.error("Une erreur s'est produite lors de la création du produit");
      });
    }
  };
  const handleCollectionSelection = (id: string, isChecked: boolean) => {
    setSelectedCollections((prev) =>
      isChecked
        ? [...prev, id]
        : prev.filter((collectionId) => collectionId !== id)
    );
  };
  const handleCategorySelection = (id: string, isChecked: boolean) => {
    setSelectedCategories((prev) =>
      isChecked ? [...prev, id] : prev.filter((categoryId) => categoryId !== id)
    );
  };
  const handleTagSelection = (id: string, isChecked: boolean) => {
    setSelectedTags((prev) =>
      isChecked ? [...prev, id] : prev.filter((tagId) => tagId !== id)
    );
  };
  const handleMainAndSecondaryImages = (images: ImagesCarousselType) => {
    setMainImage(images.mainImage);
    setSecondaryImages(images.secondaryImages);
    if (mainImage) {
      setAddOneVariant(true);
    }
  };
  const handleHeroImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHeroImage(event.target.files && event.target.files[0]);
  };
  const handleRemoveImageUpload = () => {
    setHeroImage(null);
  };
  const promotionEndDate = watch("promotionEndDate");
  const newUntil = watch("newUntil");
  const isAllFiedlsEmpty =
    selectedCollections.length > 0 &&
    selectedCategories.length > 0 &&
    heroImage &&
    mainImage;

  return (
    <div>
      <NavBackDashboard
        path="catalogue/produits/liste"
        text="Revenir à la liste des produits"
        role="admin"
      />
      <h1 className="text-center mb-10">
        {productId ? "modifier le produit" : "creer un produit"}
      </h1>

      <Card className="p-6 xl:w-1/2 2xl:w-1/3 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <div>
              {/* Nom du produit et Image principale */}
              <HeaderSection
                register={register}
                errors={errors}
                heroImage={heroImage}
                handleHeroImageUpload={handleHeroImageUpload}
                handleRemoveImageUpload={handleRemoveImageUpload}
              />
            </div>
          </CardHeader>
          <CardContent>
            {/* Description */}
            <DescriptionSection register={register} errors={errors} />
            {/* price */}
            <PriceSection register={register} errors={errors} />
            {/* stock */}
            <StockSection register={register} errors={errors} />
            {/* Cashback */}
            <CashbackSection register={register} errors={errors} />
            {/* Classement */}
            <div className="my-20 p-4 border rounded-md">
              <h3 className=" mb-2">Classement</h3>
              <Classifying
                collections={collections}
                categories={categories}
                tags={tags}
                selectedCollections={selectedCollections}
                selectedCategories={selectedCategories}
                selectedTags={selectedTags}
                handleCollectionSelection={handleCollectionSelection}
                handleCategorySelection={handleCategorySelection}
                handleTagSelection={handleTagSelection}
              />
            </div>
            {/* Promotion */}
            <div className="border rounded-md p-4">
              <h3 className=" mb-2">Promotion</h3>
              <PromotionField
                control={control}
                value={promotionEndDate}
                setValue={setValue}
                error={errors.promotionEndDate?.message}
                register={register}
              />
            </div>
            {/* Attributs */}
            <div className="border rounded-md p-4 my-20">
              <h3 className="mb-2">Attributs</h3>
              <AttributeField
                name="newUntil"
                control={control}
                label="Date de nouveauté - jusqu'au :"
                value={newUntil}
                setValue={setValue}
                error={errors.newUntil?.message}
                getValues={getValues}
              />
            </div>
            {/* Caroussel */}
            <div className="border rounded-md p-4">
              <h3 className="mb-2">
                Caroussel d'images
                <span className="text-red-500 text-2xl">*</span>
              </h3>
              <ImageUploader onImagesUpload={handleMainAndSecondaryImages} />
            </div>
            {/* Variantes */}
            {addOneVariant && (
              <VariantsToAdd
                variantsToAddList={variantsToAddList}
                setVariantsToAddList={setVariantsToAddList}
              />
            )}
            {/* Options */}
            <div className="border rounded-md p-4 my-20">
              <h3 className="mb-2">Options</h3>
              <OptionSwitch
                name="isStar"
                control={control}
                id="isStar"
                labelChecked="Produit mis en avant  🚀"
                labelUnchecked="Produit ordinaire"
              />
              <OptionSwitch
                name="isPublished"
                control={control}
                id="isPublished"
                labelChecked="Produit publié"
                labelUnchecked="Produit suspendu"
                className="text-green-500"
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            {/* Bouton Soumettre */}
            <Button
              type="submit"
              className={`mt-4 ${
                isAllFiedlsEmpty ? "bg-green-500" : "bg-slate-500"
              }  hover:bg-green-600 text-white`}
              disabled={!isAllFiedlsEmpty}
            >
              {productId ? "Enregistrer les modifications" : "Créer le produit"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ProductForm;
