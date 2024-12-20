import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
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
import CalendarCustom from "@/components/shared/CalendarCustom";
import { Label } from "@/components/ui/label";
import { CategoryDBType } from "@/types/category/CategoryTypes";
import { TagDBType } from "@/types/tag/TagTypes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import CancelBtnDashboard from "@/components/shared/CancelBtnDashboard";
import { add } from "date-fns";
import { Switch } from "@/components/ui/switch";

const CreateProduct: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDBType[]>([]);
  const [tags, setTags] = useState<TagDBType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
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

  const {
    fields: variantFields,
    append: addVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = (data: ProductInputDTO) => {
    console.log("Form Data", data);
    console.log("categories", selectedCategories);
    console.log("tags", selectedTags);
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
  const promotionEndDate = watch("promotionEndDate");
  const newUntil = watch("newUntil");
  return (
    <div>
      <h1 className="text-center mb-10">creer un produit</h1>

      <Card className="p-6 xl:w-1/2 2xl:w-1/3 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
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
            {/* Hero Image */}
            <div className="mb-4">
              <Label htmlFor="heroImage">Image principale</Label>
              <Input
                id="heroImage"
                type="file"
                accept="image/*"
                {...register("heroImage")}
              />
              {errors.heroImage && (
                <p className="text-red-500">{errors.heroImage.message}</p>
              )}
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
              {/* Catégories */}
              <div className="mb-4 flex items-center gap-2 flex-wrap">
                <Label>Classement 1</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Catégories <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {categories.map((category) => (
                      <DropdownMenuCheckboxItem
                        key={category._id}
                        checked={selectedCategories.includes(category._id)}
                        onCheckedChange={(isChecked) =>
                          handleCategorySelection(category._id, isChecked)
                        }
                      >
                        {category.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {selectedCategories.map((categoryId) => (
                    <span
                      key={categoryId}
                      className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-center"
                    >
                      {categories.find((cat) => cat._id === categoryId)?.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-4 flex items-center gap-2 flex-wrap">
                <Label>Classement 2</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Tags <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {tags.map((tag) => (
                      <DropdownMenuCheckboxItem
                        key={tag._id}
                        checked={selectedTags.includes(tag._id)}
                        onCheckedChange={(isChecked) =>
                          handleTagSelection(tag._id, isChecked)
                        }
                      >
                        {tag.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {selectedTags.map((tagId) => (
                    <span
                      key={tagId}
                      className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-center"
                    >
                      {tags.find((tag) => tag._id === tagId)?.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Promotion */}
            <div className="border rounded-md p-4">
              <h3 className=" mb-2">Promotion</h3>
              <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                <div>
                  <Label htmlFor="promotionPercentage" className="text-center">
                    Pourcentage de promotion (%)
                  </Label>
                  <Input
                    id="promotionPercentage"
                    type="number"
                    {...register("promotionPercentage", {
                      setValueAs: (value) =>
                        value === "" ? undefined : parseInt(value), // Convertit en nombre ou undefined si vide
                    })}
                  />
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <Label htmlFor="promotionEndDate" className="text-center">
                    Date de fin de promotion
                  </Label>
                  <Controller
                    control={control}
                    name="promotionEndDate"
                    render={({ field }) => (
                      <div className="flex items-center gap-4 flex-wrap">
                        <CalendarCustom
                          value={promotionEndDate}
                          onChange={(date) =>
                            setValue("promotionEndDate", date)
                          }
                        />{" "}
                        {field.value && (
                          <CancelBtnDashboard
                            onCancel={() => field.onChange(null)}
                          />
                        )}
                      </div>
                    )}
                  />
                  {errors.promotionEndDate && (
                    <p className="text-red-500">
                      {errors.promotionEndDate.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Attributs */}
            <div className="border rounded-md p-4 my-20">
              <h3 className="mb-2">Attributs</h3>
              {/* Nouvelle date */}
              <div className="mb-4 flex items-center gap-4 flex-wrap">
                <Label
                  htmlFor="newUntil"
                  className="bg-blue-100 text-blue-800 p-1 rounded-md"
                >
                  Date de nouveauté - jusqu'au :
                </Label>
                <Controller
                  control={control}
                  name="newUntil"
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <CalendarCustom
                        value={newUntil}
                        onChange={(date) => setValue("newUntil", date)}
                      />
                      {field.value && (
                        <CancelBtnDashboard
                          onCancel={() => field.onChange(null)}
                        />
                      )}
                    </div>
                  )}
                />
                {errors.newUntil && (
                  <p className="text-red-500">{errors.newUntil.message}</p>
                )}
              </div>
            </div>
            {/* Variantes */}
            <div className="mb-4">
              <h3 className=" mb-2">Variantes</h3>
              {variantFields.map((variant, index) => (
                <div key={variant.id} className="mb-4 border p-4">
                  <Button
                    variant="destructive"
                    onClick={() => removeVariant(index)}
                  >
                    Supprimer cette variante
                  </Button>
                </div>
              ))}
              <Button
                className="bg-slate-500 hover:bg-slate-600 text-white"
                onClick={() =>
                  addVariant({
                    combination: "",
                    mainImage: "",
                    secondaryImages: [],
                    _id: "",
                  })
                }
              >
                Ajouter une variante
              </Button>
            </div>

            {/* Options */}
            <div className="border rounded-md p-4 my-20">
              <h3 className=" mb-2">Options</h3>
              <div className="mb-4 flex items-center gap-2">
                <Controller
                  name="isStar"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Switch
                        id="isStar"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-gray-200  border-gray-300 dark:border-gray-500 "
                      />
                      {field.value ? (
                        <span className="text-xs text-green-500">
                          Produit mis en avant
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500">
                          Produit ordinaire
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="mb-4 flex items-center gap-2">
                <Controller
                  name="isPublished"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Switch
                        id="isPublished"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-gray-200  border-gray-300 dark:border-gray-500 "
                      />
                      {field.value ? (
                        <span className="text-xs text-green-500">
                          Produit publié
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500">
                          Produit suspendu
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
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
