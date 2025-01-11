import {
  createProductRepository,
  deleteProductRepository,
  getAllProductsAdminRepository,
  getAllProductsRepository,
  getProductByIdRepository,
  updateProductNumberOfSalesRepository,
  updateProductRepository,
  updateProductStockRepository,
} from "../../repositories/product/productRepository.js";
// Public - Récupérer tous les produits
export const getAllProductsService = async (filters) => {
  return await getAllProductsRepository(filters);
};
// Admin - Récupérer tous les produits
export const getAllProductsAdminService = async () => {
  return await getAllProductsAdminRepository();
};
export const getProductByIdService = async (productId) => {
  return await getProductByIdRepository(productId);
};
export const createProductService = async (productData) => {
  return await createProductRepository(productData);
};
export const updateProductService = async (productId, productData) => {
  return await updateProductRepository(productId, productData);
};
export const deleteProductService = async (productId) => {
  return await deleteProductRepository(productId);
};
export const updateProductStockService = async (orderItems) => {
  await updateProductStockRepository(orderItems);
};
export const updateProductNumberOfSalesService = async (orderItems) => {
  await updateProductNumberOfSalesRepository(orderItems);
};
