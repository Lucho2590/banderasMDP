// Firebase Storage Utilities - Banderas MDP
import { storage } from "./firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  StorageReference,
} from "firebase/storage";

/**
 * Sube una imagen a Firebase Storage
 * @param file - Archivo a subir
 * @param path - Ruta en Storage (ej: "productos/bandera-argentina.jpg")
 * @returns URL pública de la imagen
 */
export async function uploadImage(
  file: File,
  path: string
): Promise<string> {
  try {
    const storageRef: StorageReference = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

/**
 * Obtiene la URL de una imagen desde Storage
 * @param path - Ruta en Storage
 * @returns URL pública de la imagen
 */
export async function getImageURL(path: string): Promise<string> {
  try {
    const storageRef: StorageReference = ref(storage, path);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error getting image URL:", error);
    throw error;
  }
}

/**
 * Elimina una imagen de Firebase Storage
 * @param path - Ruta en Storage
 */
export async function deleteImage(path: string): Promise<void> {
  try {
    const storageRef: StorageReference = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}

/**
 * Sube múltiples imágenes a Firebase Storage
 * @param files - Array de archivos a subir
 * @param basePath - Ruta base en Storage (ej: "productos")
 * @returns Array de URLs públicas
 */
export async function uploadMultipleImages(
  files: File[],
  basePath: string
): Promise<string[]> {
  try {
    const uploadPromises = files.map((file, index) => {
      const fileName = `${Date.now()}_${index}_${file.name}`;
      const path = `${basePath}/${fileName}`;
      return uploadImage(file, path);
    });

    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error("Error uploading multiple images:", error);
    throw error;
  }
}
