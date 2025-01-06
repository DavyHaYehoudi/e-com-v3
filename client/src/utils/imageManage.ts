import { v4 as uuidv4 } from "uuid";
import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase";

// Upload une image vers Firebase
export const uploadImageToFirebase = async (
  file: File,
  path: string
): Promise<string> => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

// Supprimer une image depuis Firebase
export const deleteImageFromFirebase = async (url: string): Promise<void> => {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef);
};

// Gérer l'affichage des images
export const resolveImageUrl = (url: File | string | null): string | null => {
  return url instanceof File ? URL.createObjectURL(url) : url;
};

// Générer un path unique
export const generateFilePath = (file: File, path: string) => {
  const uniqueId = uuidv4();
  const fileExtension = file.name.split(".").pop();
  const filePath = `${path}${uniqueId}.${fileExtension}`;
  return filePath;
};
