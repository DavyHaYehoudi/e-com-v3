import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";
import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase";

// Générer un path unique
export const generateFilePath = (file: File, endPoint: string) => {
  const uniqueId = uuidv4();
  const fileExtension = file.name.split(".").pop();
  const filePath = `${endPoint}/${uniqueId}.${fileExtension}`;
  return filePath;
};
// Upload une image vers Firebase
export const uploadImageToFirebase = async (
  file: File | string,
  endPoint: string
): Promise<string> => {
  // Si c'est déjà une url firebase
  if (typeof file === "string") {
    return file;
  }
  const uniquePath = generateFilePath(file, endPoint);
  const storageRef = ref(storage, uniquePath);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

// Supprimer une image depuis Firebase
export const deleteImageFromFirebase = async (
  url: File | string
): Promise<void> => {
  try {
    // Si c'est un fichier local
    if (url instanceof File) return;
    // Extraire le chemin du fichier depuis l'URL complète
    const path = decodeURIComponent(url.split("/o/")[1].split("?")[0]);
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image :", error);
    throw error;
  }
};

// Gérer l'affichage des images local/firebase
export const resolveImageUrl = (url: File | string | null): string | null => {
  return url instanceof File ? URL.createObjectURL(url) : url;
};

export const fileOptimize = async (
  fileOrUrl: File | string | null
): Promise<string | null> => {
  if (!fileOrUrl) return null;

  // Si c'est déjà une URL (string), la renvoyer directement
  if (typeof fileOrUrl === "string") return fileOrUrl;

  // Sinon, compresser l'image et retourner l'URL de l'objet compressé
  try {
    const options = {
      maxSizeMB: 3, // Augmenter la taille maximale du fichier pour préserver la qualité
      maxWidthOrHeight: 3000, // Augmenter la résolution maximale
      useWebWorker: true, 
      initialQuality: 0.9, // Définir une qualité initiale élevée (entre 0 et 1)
      alwaysKeepResolution: true, // Empêche la réduction automatique de la résolution
  };
    const compressedFile = await imageCompression(fileOrUrl, options);

    return URL.createObjectURL(compressedFile);
  } catch (error) {
    console.error("Erreur de compression :", error);
    throw new Error("Impossible de compresser l'image.");
  }
};
