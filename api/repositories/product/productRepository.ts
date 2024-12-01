import { ProductInputDTO } from "../../controllers/product/entities/dto/product.dto.js";
import {
  BadRequestError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";
import { ProductModel } from "../../models/product/product.schema.js";
import { FilterQuery } from "mongoose";
import mongoose from "mongoose";


// Types des filtres
interface GetAllProductsFilters {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  onPromotion?: boolean;
  isNew?: boolean;
  categoryIds?: string[];
  tagIds?: string[];
  isStar?: boolean;
  limit?: number;
}

export const getAllProductsRepository = async (
  filters: GetAllProductsFilters
) => {
  const query: FilterQuery<typeof ProductModel> = {};

  // Filtre par nom (minimum 3 lettres)
  if (filters.name && filters.name.length >= 3) {
    query.name = { $regex: filters.name, $options: "i" }; // Recherche insensible à la casse
  }
  // Filtre par prix minimum
  if (filters.minPrice !== undefined) {
    query.price = { ...query.price, $gte: filters.minPrice };
  }
  // Filtre par prix maximum
  if (filters.maxPrice !== undefined) {
    query.price = { ...query.price, $lte: filters.maxPrice };
  }

  // Filtre par promotion active
  if (filters.onPromotion) {
    const now = new Date();
    query.promotionEndDate = { $gte: now }; // Promotion active
    query.promotionPercentage = { $gt: 0 }; // Promotion définie
  }
  // Filtre par nouveauté
  if (filters.isNew) {
    const now = new Date();
    query.newUntil = { $gte: now }; // Produit toujours considéré comme "nouveau"
  } 

  // Filtre par catégories
  if (filters.categoryIds && filters.categoryIds.length > 0) {
    query.categories = { $in: filters.categoryIds };
  }
  // Filtre par tags
  if (filters.tagIds && filters.tagIds.length > 0) {
    query.tags = { $in: filters.tagIds };
  }
  // Filtre par produit "star"
  if (filters.isStar !== undefined) {
    query.isStar = filters.isStar;
  }

  // Limite du nombre de résultats
  const limit = filters.limit || 50; // Valeur par défaut si non spécifiée

  // Exécute la requête avec les filtres
  return await ProductModel.find(query)
    .populate("categories", "_id label")
    .populate("tags", "_id label")
    .limit(limit)
    .lean();
};

export const getProductByIdRepository = async (productId: string) => {
  const product = await ProductModel.findById(productId)
    .populate("categories", "_id name")
    .populate("tags", "_id name")
    .lean();

  if (!product) {
    throw new NotFoundError(`Product with ID ${productId} not found`);
  }
  return product;
};
export const createProductRepository = async (productData: ProductInputDTO) => {
  return await ProductModel.create(productData);
};
export const updateProductRepository = async (
  productId: string,
  productData: ProductInputDTO
) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    productData,
    { new: true, runValidators: true }
  )
    .populate("categories", "_id name")
    .populate("tags", "_id name");

  if (!updatedProduct) {
    throw new NotFoundError(`Product with ID ${productId} not found`);
  }
  return updatedProduct;
};
export const deleteProductRepository = async (productId: string) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(productId);

  if (!deletedProduct) {
    throw new NotFoundError(`Product with ID ${productId} not found`);
  }
  return deletedProduct;
};

interface OrderItem {
  productId: string| mongoose.Types.ObjectId;
  quantity: number;
}
export const updateProductStockRepository = async (orderItems: OrderItem[]) => {
  for (const item of orderItems) {
    const { productId, quantity } = item;

    // Récupérer la quantité en stock et l'état continueSelling du produit
    const product = await ProductModel.findById(productId).select(
      "quantityInStock continueSelling"
    );

    if (!product) {
      throw new BadRequestError(`Produit with ID ${productId} not found.`);
    }

    const { quantityInStock, continueSelling } = product;

    // Calcul du nouveau stock
    const newQuantityInStock = quantityInStock - quantity;

    // Si le stock devient négatif et que le produit ne permet pas de continuer à vendre
    if (newQuantityInStock < 0 && !continueSelling) {
      throw new BadRequestError(
        `Product ${productId} has insufficient stock, and sales are not allowed with negative stock.`
      );
    }

    // Mettre à jour la quantité en stock du produit
    product.quantityInStock = newQuantityInStock;
    await product.save();
  }
};
