import {
  BadRequestError,
  MongooseDuplicateError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";
import Collection from "../../models/collection/collection.schema.js";
import { ProductModel } from "../../models/product/product.schema.js";
export const getAllCollectionsRepository = async () => {
  // await Collection.syncIndexes();
  try {
    const collectionsWithProductCounts = await Collection.aggregate([
      {
        $lookup: {
          from: "products", // Nom de la collection des produits
          localField: "_id", // Champ local dans la collection Tag
          foreignField: "collections", // Champ dans la collection Product
          as: "products", // Alias pour les données jointes
        },
      },
      {
        $addFields: {
          productCount: { $size: "$products" }, // Compte les produits liés
        },
      },
      {
        $project: {
          products: 0, // Exclut le tableau de produits de la réponse
        },
      },
    ]);
    return collectionsWithProductCounts;
  } catch (error) {
    throw new Error(
      `Error retrieving tags with product counts: ${error.message}`
    );
  }
};
export const createCollectionRepository = async (data) => {
  try {
    return await Collection.create({ label: data.label });
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB Duplicate Key Error
      throw new MongooseDuplicateError(
        `A collection with the label "${data.label}" already exists.`
      );
    }
    throw new Error(`Error creating collection : ${error.message}`);
  }
};
// Update une collection
export const updateCollectionRepository = async (collectionId, data) => {
  try {
    const updatedCollection = await Collection.findByIdAndUpdate(
      collectionId,
      { label: data.label },
      { new: true }
    );
    if (!updatedCollection) {
      throw new NotFoundError(`Collection with ID ${collectionId} not found`);
    }
    return updatedCollection;
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB Duplicate Key Error
      throw new MongooseDuplicateError(
        `A collection with the label "${data.label}" already exists.`
      );
    }
    throw new Error(`Error updating collection : ${error.message}`);
  }
};
export const deleteCollectionRepository = async (collectionId) => {
  // Vérifier si la collection est utilisée dans un produit
  const productsUsingCollection = await ProductModel.find({
    collections: { $in: [collectionId] },
  }).exec();
  if (productsUsingCollection.length > 0) {
    // Si la collection est associée à des produits, ne pas permettre la suppression
    throw new BadRequestError(
      `This collection is used in one or more products and cannot be removed.`
    );
  }
  const deletedCollection = await Collection.findByIdAndDelete(collectionId);
  if (!deletedCollection) {
    throw new NotFoundError(`Collection with ID ${collectionId} not found`);
  }
  return deletedCollection;
};
