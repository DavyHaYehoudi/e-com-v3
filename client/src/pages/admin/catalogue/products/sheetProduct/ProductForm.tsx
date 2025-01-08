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
import ImageUploader, { ImagesCarousselType } from "./sections/ImageUploader";
import { CollectionDBType } from "@/types/collectionTypes";
import useCollection from "@/hooks/dashboard/admin/useCollection";
import VariantsToAdd from "./sections/VariantsToAdd";
import HeaderSection from "./sections/HeaderSection";
import DescriptionSection from "./sections/DescriptionSection";
import PriceSection from "./sections/PriceSection";
import StockSection from "./sections/StockSection";
import CashbackSection from "./sections/CashbbackSection";
import useProductDefaultValues from "@/hooks/dashboard/admin/useProductDefaultValues";
import NavBackDashboard from "@/components/shared/NavBackDashboard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useProductFormHandler } from "@/hooks/dashboard/admin/useProductFormHandler";

export interface VariantsToAddType {
  combination: string;
  mainImage: File | string | null;
  secondaryImages: (File | string)[];
}
export type AddingVariantType = "combination" | "images";
const ProductForm: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDBType[]>([]);
  const [tags, setTags] = useState<TagDBType[]>([]);
  const [collections, setCollections] = useState<CollectionDBType[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [heroImage, setHeroImage] = useState<File | string | null>(null);
  const [mainImage, setMainImage] = useState<File | string | null>(null);
  const [secondaryImages, setSecondaryImages] = useState<(File | string)[]>([]);
  const [variantsToAddList, setVariantsToAddList] = useState<
    VariantsToAddType[]
  >([]);
  const [urlFirebaseToDelete, setUrlFirebaseToDelete] = useState<string[]>([]);

  const { getCollections } = useCollection();
  const { getCategories } = useCategory();
  const { getTags } = useTag();
  const { defaultValues, productId, loading } = useProductDefaultValues();
  const { onSubmitProductForm, isSubmitLoading } = useProductFormHandler({ productId });


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
      setHeroImage(defaultValues.heroImage || "");
      if (defaultValues.variants && defaultValues.variants.length > 0) {
        setMainImage(defaultValues.variants[0].mainImage || "");
        setSecondaryImages(defaultValues.variants[0].secondaryImages || []);
      }
      // En mode modifications, on n'affiche pas le 1er variant
      if (
        productId &&
        defaultValues.variants &&
        defaultValues.variants?.length > 0
      ) {
        setVariantsToAddList(defaultValues.variants.slice(1) || []);
      } else {
        setVariantsToAddList(defaultValues.variants || []);
      }
    }
  }, [defaultValues, reset, productId]);
  const onSubmit = async (data: ProductInputDTO) => {
    await onSubmitProductForm(
      data,
      heroImage,
      mainImage,
      secondaryImages,
      variantsToAddList,
      urlFirebaseToDelete,
      selectedCollections,
      selectedCategories,
      selectedTags
  );
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
  };
  const handleHeroImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHeroImage(event.target.files && event.target.files[0]);
  };
  const handleRemoveHeroImage = (image: File | string) => {
    setHeroImage(null);
    if (typeof image === "string" && !urlFirebaseToDelete.includes(image)) {
      setUrlFirebaseToDelete((prev) => [...prev, image]);
    }
  };

  const promotionEndDate = watch("promotionEndDate");
  const newUntil = watch("newUntil");
  const isAllFiedlsEmpty =
    selectedCollections.length > 0 &&
    selectedCategories.length > 0 &&
    heroImage &&
    mainImage;
  if (loading || isSubmitLoading) {
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner />
        <span> Chargement en cours...</span>
      </div>
    );
  }
  return (
    <div className="pb-20">
      <NavBackDashboard
        path="catalogue/produits/liste"
        text="Revenir à la liste des produits"
        role="admin"
      />
      <h1 className="text-center mb-10">
        {productId ? "modifier le produit" : "creer un produit"}
      </h1>
      {!isAllFiedlsEmpty ? (
        <p className="text-red-500 text-center">
          ℹ️ Les champs marqués par l'astérix * sont requis
        </p>
      ) : (
        <p className="text-green-500 text-center">
          Tous les champs requis sont complétés
        </p>
      )}

      <Card className="p-2 md:p-6 xl:w-1/2 2xl:w-1/3 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <div>
              {/* Nom du produit et Image principale */}
              <HeaderSection
                register={register}
                errors={errors}
                heroImage={heroImage}
                handleHeroImageUpload={handleHeroImageUpload}
                handleRemoveHeroImage={handleRemoveHeroImage}
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
              <ImageUploader
                mainImage={mainImage}
                secondaryImages={secondaryImages}
                onImagesUpload={handleMainAndSecondaryImages}
                setUrlFirebaseToDelete={setUrlFirebaseToDelete}
              />
            </div>
            {/* Variantes */}
            <VariantsToAdd
              variantsToAddList={variantsToAddList}
              setVariantsToAddList={setVariantsToAddList}
              setUrlFirebaseToDelete={setUrlFirebaseToDelete}
            />
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
