"use client";

// Firestore Hooks - Banderas MDP
import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  DocumentData,
  QuerySnapshot,
  where,
  Timestamp,
  limit,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { TProduct } from "@/types/product";

// Tipos de datos adicionales
export interface Cliente {
  id: string;
  nombre: string;
  logo: string;
  orden: number;
}

export interface Promocion {
  id: string;
  titulo: string;
  descripcion: string;
  descuento: number;
  imagen: string;
  activa: boolean;
  fechaInicio: Timestamp;
  fechaFin: Timestamp;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  orden?: number;
}

/**
 * Hook para obtener productos desde Firestore (colección "products")
 * @param filterByCategory - Categoría opcional para filtrar
 * @returns Array de productos y estado de carga
 */
export function useProducts(filterByCategory?: string) {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const productsRef = collection(db, "products");

      // IMPORTANTE: Solo productos con ecommerce = true (para web pública)
      let q = query(
        productsRef,
        where("ecommerce", "==", true),
        orderBy("createdAt", "desc")
      );

      // Si hay filtro por categoría
      if (filterByCategory) {
        q = query(
          productsRef,
          where("ecommerce", "==", true),
          where("categories", "array-contains", filterByCategory),
          orderBy("createdAt", "desc")
        );
      }

      const unsubscribe = onSnapshot(
        q,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const productsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as TProduct[];
          setProducts(productsData);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching products:", err);
          setError(err as Error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up products listener:", err);
      setError(err as Error);
      setLoading(false);
    }
  }, [filterByCategory]);

  return { products, loading, error };
}

/**
 * Hook para obtener los TOP 10 productos más vendidos (ordenados por salesCount)
 * @param limitCount - Número de productos a traer (default: 10)
 * @returns Array de productos más vendidos y estado de carga
 */
export function useTopProducts(limitCount: number = 100) {
  const [topProducts, setTopProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const productsRef = collection(db, "products");

      // IMPORTANTE: Solo productos con ecommerce = true (para web pública)
      const q = query(
        productsRef,
        where("ecommerce", "==", true),
        orderBy("salesCount", "desc"),
        limit(limitCount)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const productsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as TProduct[];
          setTopProducts(productsData);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching top products:", err);
          setError(err as Error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up top products listener:", err);
      setError(err as Error);
      setLoading(false);
    }
  }, [limitCount]);

  return { topProducts, loading, error };
}

/**
 * Hook para obtener logos de clientes desde Firestore
 * @returns Array de clientes y estado de carga
 */
export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const clientesRef = collection(db, "clientes");
      const q = query(clientesRef, orderBy("orden", "asc"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const clientesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Cliente[];
          setClientes(clientesData);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching clientes:", err);
          setError(err as Error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up clientes listener:", err);
      setError(err as Error);
      setLoading(false);
    }
  }, []);

  return { clientes, loading, error };
}

/**
 * Hook para obtener promociones activas desde Firestore
 * @returns Array de promociones y estado de carga
 */
export function usePromociones() {
  const [promociones, setPromociones] = useState<Promocion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const promocionesRef = collection(db, "promociones");
      const q = query(
        promocionesRef,
        where("activa", "==", true),
        orderBy("fechaInicio", "desc")
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const promocionesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Promocion[];
          setPromociones(promocionesData);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching promociones:", err);
          setError(err as Error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up promociones listener:", err);
      setError(err as Error);
      setLoading(false);
    }
  }, []);

  return { promociones, loading, error };
}

/**
 * Hook para obtener un producto por slug
 * @param slug - Slug del producto (URL amigable)
 * @returns Producto y estado de carga
 *
 * SOLUCIÓN TEMPORAL: Si no encuentra por slug, intenta extraer el ID del slug generado
 * y buscar directamente por ID. Útil mientras se migran los slugs a Firebase.
 */
export function useProductBySlug(slug: string | null) {
  const [product, setProduct] = useState<TProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const productsRef = collection(db, "products");

        // 1. Intentar buscar por slug primero
        const q = query(
          productsRef,
          where("slug", "==", slug),
          where("ecommerce", "==", true),
          limit(1)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const docData = snapshot.docs[0];
          setProduct({ id: docData.id, ...docData.data() } as TProduct);
          setLoading(false);
          return;
        }

        // 2. Si no encuentra por slug, intentar extraer ID del slug generado
        // Formato del slug generado: "nombre-producto-ID"
        // El ID es la última parte después del último guion
        const parts = slug.split('-');
        const potentialId = parts[parts.length - 1];

        if (potentialId) {
          const docRef = doc(db, "products", potentialId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists() && docSnap.data()?.ecommerce === true) {
            setProduct({ id: docSnap.id, ...docSnap.data() } as TProduct);
            setLoading(false);
            return;
          }
        }

        // 3. No se encontró el producto
        setProduct(null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product by slug:", err);
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return { product, loading, error };
}

/**
 * Hook para obtener categorías desde Firestore (colección "categories")
 * @returns Array de categorías y estado de carga
 */
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const categoriesRef = collection(db, "categories");
      const q = query(categoriesRef);

      const unsubscribe = onSnapshot(
        q,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const categoriesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Category[];
          setCategories(categoriesData);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching categories:", err);
          setError(err as Error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up categories listener:", err);
      setError(err as Error);
      setLoading(false);
    }
  }, []);

  return { categories, loading, error };
}
