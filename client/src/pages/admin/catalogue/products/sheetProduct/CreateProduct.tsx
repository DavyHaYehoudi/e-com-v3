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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CategoryDBType } from "@/types/category/CategoryTypes";
import { TagDBType } from "@/types/tag/TagTypes";
import { Textarea } from "@/components/ui/textarea";
import { add } from "date-fns";
import OptionSwitch from "./sections/OptionSwitch";
import AttributeField from "./sections/AttributeField";
import PromotionField from "./sections/PromotionField";
import Classifying from "./sections/Classifying";
import ImageUploader from "./sections/ImageUploader";
import ImageUploaderBox from "@/components/shared/ImageUploaderBox";
import { CollectionDBType } from "@/types/collection/CollectionTypes/collectionTypes";
import useCollection from "@/hooks/dashboard/admin/useCollection";
import VariantsToAdd from "./sections/VariantsToAdd";

export interface imagesCaroussel {
  mainImage: File | null;
  secondaryImages: File[];
}
export interface variantsToAddType {
  combination: string;
  mainImage: string;
  secondaryImages: string[];
}
const CreateProduct: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDBType[]>([]);
  const [tags, setTags] = useState<TagDBType[]>([]);
  const [collections, setCollections] = useState<CollectionDBType[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [variantsAvailable, setVariantsAvailable] = useState(false);
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [secondaryImages, setSecondaryImages] = useState<File[]>([]);
  const [variantsToAdd, setVariantsToAdd] = useState<variantsToAddType[]>([]);
  const { getCollections } = useCollection();
  const { getCategories } = useCategory();
  const { getTags } = useTag();

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
    formState: { errors },
  } = useForm<ProductInputDTO>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      heroImage: "",
      promotionPercentage: 0,
      promotionEndDate: null,
      continueSelling: false,
      quantityInStock: 1,
      price: 20,
      cashback: 0,
      newUntil: add(new Date(), { months: 3 }),
      isPublished: true,
      categories: [],
      tags: [],
      variants: [],
      isStar: false,
      isArchived: false,
    },
  });

  const onSubmit = (data: ProductInputDTO) => {
    console.log("Form Data", data);
    console.log("collections", selectedCategories);
    console.log("categories", selectedCategories);
    console.log("tags", selectedTags);
    console.log("mainImage", mainImage);
    console.log("secondaryImages", secondaryImages);
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
  const handleMainAndSecondaryImages = (images: imagesCaroussel) => {
    setMainImage(images.mainImage);
    setSecondaryImages(images.secondaryImages);
    if (mainImage) {
      setVariantsAvailable(true);
    }
  };
  const handleVariantsToAdd = (variant: variantsToAddType) => {
    const isCombinationExisted = variantsToAdd.some(
      (vr) => vr.combination === variant.combination
    );
    if (!isCombinationExisted) {
      setVariantsToAdd((prev) => [...prev, variant]);
    }
  };
  const handleVariantToRemove = (combination: string) => {
    setVariantsToAdd((prev) =>
      prev.filter((variant) => variant.combination !== combination)
    );
  };
  const promotionEndDate = watch("promotionEndDate");
  const newUntil = watch("newUntil");
  return (
    <div>
      <h1 className="text-center mb-10">creer un produit</h1>

      <Card className="p-6 xl:w-1/2 2xl:w-1/3 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <div>
              {/* Nom du produit */}
              <div className="mb-4">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Nom du produit"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Image principale */}
              <div className="flex flex-col items-center gap-4 my-20">
                <Label>Image du produit sur la carte et dans le panier</Label>
                <ImageUploaderBox
                  image={heroImage}
                  setImage={setHeroImage}
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Description */}
            <div className="mb-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Description du produit"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            {/* price */}
            <div className="mb-4">
              <Label htmlFor="price">Prix (€)</Label>
              <Input
                id="price"
                type="number"
                step="0.01" // Autorise les nombres décimaux
                {...register("price", {
                  setValueAs: (value) =>
                    value === "" ? undefined : parseFloat(value), // Convertit en nombre ou undefined si vide
                })}
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
            {/* stock */}
            <div className="mb-4">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                {...register("quantityInStock", {
                  setValueAs: (value) =>
                    value === "" ? undefined : parseInt(value), // Convertit en nombre ou undefined si vide
                })}
              />
              {errors.quantityInStock && (
                <p className="text-red-500">{errors.quantityInStock.message}</p>
              )}
            </div>
            {/* Cashback */}
            <div className="mb-4">
              <Label
                htmlFor="cashback"
                className="bg-blue-500 text-white p-1 rounded-md"
              >
                Cashback (€)
              </Label>
              <Input
                id="cashback"
                type="number"
                step="0.01" // Autorise les nombres décimaux
                {...register("cashback", {
                  setValueAs: (value) =>
                    value === "" ? undefined : parseFloat(value), // Convertit en nombre ou undefined si vide
                })}
              />
              {errors.cashback && (
                <p className="text-red-500">{errors.cashback.message}</p>
              )}
            </div>
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
              <h3 className="mb-2">Caroussel d'images</h3>
              <ImageUploader onImagesUpload={handleMainAndSecondaryImages} />
            </div>
            {/* Variantes */}
            <VariantsToAdd
              variantsAvailable={variantsAvailable}
              variantsToAdd={variantsToAdd}
              setVariantsToAdd={setVariantsToAdd}
              removeVariant={handleVariantToRemove}
              addVariant={handleVariantsToAdd}
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
              className="mt-4 bg-green-500 hover:bg-green-600 text-white"
            >
              Créer le produit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateProduct;
