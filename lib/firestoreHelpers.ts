// Firestore CRUD Helpers - Banderas MDP
import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  DocumentReference,
} from "firebase/firestore";
import { TProduct, TProductVariant } from "@/types/product";

/**
 * Agrega un nuevo producto a Firestore (colección "products")
 */
export async function addProduct(product: Omit<TProduct, "id">) {
  try {
    const docRef: DocumentReference = await addDoc(
      collection(db, "products"),
      {
        ...product,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }
    );
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

/**
 * Actualiza un producto existente
 */
export async function updateProduct(
  id: string,
  data: Partial<TProduct>
) {
  try {
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

/**
 * Elimina un producto
 */
export async function deleteProduct(id: string) {
  try {
    await deleteDoc(doc(db, "products", id));
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

/**
 * Agrega un nuevo cliente (logo)
 */
export async function addCliente(cliente: {
  nombre: string;
  logo: string;
  orden: number;
}) {
  try {
    const docRef: DocumentReference = await addDoc(
      collection(db, "clientes"),
      cliente
    );
    return docRef.id;
  } catch (error) {
    console.error("Error adding cliente:", error);
    throw error;
  }
}

/**
 * Actualiza un cliente existente
 */
export async function updateCliente(
  id: string,
  data: Partial<{
    nombre: string;
    logo: string;
    orden: number;
  }>
) {
  try {
    const docRef = doc(db, "clientes", id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating cliente:", error);
    throw error;
  }
}

/**
 * Elimina un cliente
 */
export async function deleteCliente(id: string) {
  try {
    await deleteDoc(doc(db, "clientes", id));
  } catch (error) {
    console.error("Error deleting cliente:", error);
    throw error;
  }
}

/**
 * Agrega una nueva promoción
 */
export async function addPromocion(promocion: {
  titulo: string;
  descripcion: string;
  descuento: number;
  imagen: string;
  activa: boolean;
  fechaInicio: Date;
  fechaFin: Date;
}) {
  try {
    const docRef: DocumentReference = await addDoc(
      collection(db, "promociones"),
      promocion
    );
    return docRef.id;
  } catch (error) {
    console.error("Error adding promocion:", error);
    throw error;
  }
}

/**
 * Actualiza una promoción existente
 */
export async function updatePromocion(
  id: string,
  data: Partial<{
    titulo: string;
    descripcion: string;
    descuento: number;
    imagen: string;
    activa: boolean;
    fechaInicio: Date;
    fechaFin: Date;
  }>
) {
  try {
    const docRef = doc(db, "promociones", id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating promocion:", error);
    throw error;
  }
}

/**
 * Elimina una promoción
 */
export async function deletePromocion(id: string) {
  try {
    await deleteDoc(doc(db, "promociones", id));
  } catch (error) {
    console.error("Error deleting promocion:", error);
    throw error;
  }
}
