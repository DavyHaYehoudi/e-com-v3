import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from "../../services/product/productService.js";
import {
  getAllProductsQuerySchema,
  productSchema,
} from "./entities/dto/product.dto.js";
// PUBLIC - Récupérer tous les produits
export const getAllProducts = async (
  req, // Typer les queries
  res,
  next
) => {
  try {
    // Valider et formater les queries avec Zod
    const queries = getAllProductsQuerySchema.parse(req.query);
    // Appeler le service avec les queries validées
    const products = await getAllProductsService(queries);
    res.json(products);
  } catch (error) {
    next(error);
  }
};
// PUBLIC - Récupérer un produit en particulier
export const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await getProductByIdService(productId);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
// ADMIN - Créer un nouveau produit
export const createProduct = async (req, res, next) => {
  try {
    const productData = productSchema.parse(req.body);
    const newProduct = await createProductService(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Modifier un produit
export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const productData = productSchema.parse(req.body);
    await updateProductService(productId, productData);
    res.status(200).json({});
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// ADMIN - Supprimer une catégorie
export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    await deleteProductService(productId);
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
