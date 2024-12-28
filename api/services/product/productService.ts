import {
  GetAllProductsQuery,
  ProductInputDTO,
} from "../../controllers/product/entities/dto/product.dto.js";
import {
  createProductRepository,
  deleteProductRepository,
  getAllProductsRepository,
  getProductByIdRepository,
  updateProductNumberOfSalesRepository,
  updateProductRepository,
  updateProductStockRepository,
} from "../../repositories/product/productRepository.js";
import mongoose from "mongoose";

export const getAllProductsService = async (filters: GetAllProductsQuery) => {
  return await getAllProductsRepository(filters);
};
export const getProductByIdService = async (
  productId: string | mongoose.Types.ObjectId
) => {
  return await getProductByIdRepository(productId);
};
export const createProductService = async (productData: ProductInputDTO) => {
  return await createProductRepository(productData);
};
export const updateProductService = async (
  productId: string,
  productData: ProductInputDTO
) => {
  return await updateProductRepository(productId, productData);
};
export const deleteProductService = async (productId: string) => {
  return await deleteProductRepository(productId);
};
// Lors de la création d'une commande
interface OrderItem {
  productId: string | mongoose.Types.ObjectId;
  quantity: number;
}
export const updateProductStockService = async (orderItems: OrderItem[]) => {
  await updateProductStockRepository(orderItems);
};
export const updateProductNumberOfSalesService = async (
  orderItems: OrderItem[]
) => {
  await updateProductNumberOfSalesRepository(orderItems);
};
