// Firestore Analytics Helpers
// Guarda eventos de analytics en Firestore para análisis en el dashboard

import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  increment,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import {
  TProductAnalytics,
  TProductViewEvent,
  TSearchQuery,
  TConversionFunnel,
  UpdateProductAnalyticsInput,
} from "@/types/analytics";
import { getOrCreateSessionId } from "./ecommerceOrderHelpers";
import { TProduct } from "@/types/product";

const COLLECTIONS = {
  productAnalytics: "productAnalytics",
  productViewEvents: "productViewEvents",
  searchQueries: "searchQueries",
  conversionFunnels: "conversionFunnels",
};

/**
 * Registra una vista de producto
 */
export async function trackProductView(
  product: TProduct,
  source?: "tienda" | "busqueda" | "destacados" | "categorias",
  searchTerm?: string
): Promise<void> {
  try {
    const sessionId = getOrCreateSessionId();

    // 1. Guardar el evento individual
    const viewEvent: any = {
      productId: product.id,
      productName: product.name,
      sessionId,
      timestamp: serverTimestamp(),
    };

    // Solo agregar campos opcionales si tienen valor
    if (source) viewEvent.source = source;
    if (searchTerm) viewEvent.searchTerm = searchTerm;
    if (product.categories?.[0]) viewEvent.category = product.categories[0];

    // Metadata
    const metadata: any = {};
    if (typeof window !== "undefined") {
      if (window.navigator.userAgent) metadata.userAgent = window.navigator.userAgent;
      if (document.referrer) metadata.referrer = document.referrer;
    }
    if (Object.keys(metadata).length > 0) {
      viewEvent.metadata = metadata;
    }

    await addDoc(collection(db, COLLECTIONS.productViewEvents), viewEvent);

    // 2. Actualizar analytics agregados del producto
    await updateProductAnalytics({
      productId: product.id,
      productName: product.name,
      productSku: product.sku,
      incrementViews: 1,
    });

    // 3. Actualizar embudo de conversión (silencioso si falla)
    updateConversionFunnel({
      action: "view",
      productId: product.id,
    }).catch(err => {
      // Silencioso - no romper UX si fallan permisos
      console.warn("⚠️ Conversion funnel tracking skipped:", err.message);
    });

    console.log("📊 Product view tracked:", product.name);
  } catch (error) {
    console.error("❌ Error tracking product view:", error);
    // No throw - analytics no debe romper la UX
  }
}

/**
 * Registra cuando se agrega un producto al carrito
 */
export async function trackProductAddToCart(
  product: TProduct,
  quantity: number
): Promise<void> {
  try {
    // Actualizar analytics agregados
    await updateProductAnalytics({
      productId: product.id,
      productName: product.name,
      productSku: product.sku,
      incrementAddToCart: quantity,
    });

    // Actualizar embudo de conversión (silencioso si falla)
    updateConversionFunnel({
      action: "add_to_cart",
      productId: product.id,
    }).catch(err => {
      console.warn("⚠️ Conversion funnel tracking skipped:", err.message);
    });

    console.log("📊 Add to cart tracked:", product.name);
  } catch (error) {
    console.error("❌ Error tracking add to cart:", error);
  }
}

/**
 * Registra cuando se remueve un producto del carrito
 */
export async function trackProductRemoveFromCart(
  product: TProduct,
  quantity: number
): Promise<void> {
  try {
    await updateProductAnalytics({
      productId: product.id,
      productName: product.name,
      productSku: product.sku,
      incrementRemoveFromCart: quantity,
    });

    console.log("📊 Remove from cart tracked:", product.name);
  } catch (error) {
    console.error("❌ Error tracking remove from cart:", error);
  }
}

/**
 * Registra una compra
 */
export async function trackProductPurchase(
  product: TProduct,
  quantity: number,
  revenue: number
): Promise<void> {
  try {
    await updateProductAnalytics({
      productId: product.id,
      productName: product.name,
      productSku: product.sku,
      incrementPurchased: quantity,
      addRevenue: revenue,
    });

    // Actualizar embudo de conversión (silencioso si falla)
    updateConversionFunnel({
      action: "purchase",
      productId: product.id,
      revenue,
    }).catch(err => {
      console.warn("⚠️ Conversion funnel tracking skipped:", err.message);
    });

    console.log("📊 Purchase tracked:", product.name, "Revenue:", revenue);
  } catch (error) {
    console.error("❌ Error tracking purchase:", error);
  }
}

/**
 * Registra una búsqueda
 */
export async function trackSearchQuery(
  searchTerm: string,
  resultsCount: number,
  source: "tienda" | "home" = "tienda"
): Promise<void> {
  try {
    const sessionId = getOrCreateSessionId();

    const searchQuery: Omit<TSearchQuery, "timestamp"> = {
      searchTerm: searchTerm.toLowerCase().trim(),
      resultsCount,
      sessionId,
      source,
    };

    await addDoc(collection(db, COLLECTIONS.searchQueries), {
      ...searchQuery,
      timestamp: serverTimestamp(),
    });

    console.log("📊 Search tracked:", searchTerm, "Results:", resultsCount);
  } catch (error) {
    console.error("❌ Error tracking search:", error);
  }
}

/**
 * Actualiza o crea analytics de producto
 */
async function updateProductAnalytics(
  input: UpdateProductAnalyticsInput
): Promise<void> {
  const { productId, productName, productSku, ...increments } = input;

  const docRef = doc(db, COLLECTIONS.productAnalytics, productId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // Actualizar documento existente
    const updateData: any = {
      updatedAt: serverTimestamp(),
    };

    if (increments.incrementViews) {
      updateData.viewsCount = increment(increments.incrementViews);
      updateData.lastViewedAt = serverTimestamp();
    }
    if (increments.incrementUniqueViews) {
      updateData.uniqueViewsCount = increment(increments.incrementUniqueViews);
    }
    if (increments.incrementAddToCart) {
      updateData.addToCartCount = increment(increments.incrementAddToCart);
    }
    if (increments.incrementRemoveFromCart) {
      updateData.removeFromCartCount = increment(increments.incrementRemoveFromCart);
    }
    if (increments.incrementPurchased) {
      updateData.purchasedCount = increment(increments.incrementPurchased);
    }
    if (increments.addRevenue) {
      updateData.totalRevenue = increment(increments.addRevenue);
    }

    await updateDoc(docRef, updateData);

    // Recalcular tasas de conversión
    const updatedDoc = await getDoc(docRef);
    const data = updatedDoc.data() as TProductAnalytics;

    const conversionRate = data.viewsCount > 0 ? data.purchasedCount / data.viewsCount : 0;
    const cartConversionRate = data.addToCartCount > 0 ? data.purchasedCount / data.addToCartCount : 0;

    await updateDoc(docRef, {
      conversionRate,
      cartConversionRate,
    });
  } else {
    // Crear nuevo documento
    const newAnalytics: Omit<TProductAnalytics, "createdAt" | "updatedAt"> = {
      productId,
      productName,
      productSku,
      viewsCount: increments.incrementViews || 0,
      uniqueViewsCount: increments.incrementUniqueViews || 0,
      addToCartCount: increments.incrementAddToCart || 0,
      removeFromCartCount: increments.incrementRemoveFromCart || 0,
      purchasedCount: increments.incrementPurchased || 0,
      totalRevenue: increments.addRevenue || 0,
      conversionRate: 0,
      cartConversionRate: 0,
    };

    await setDoc(docRef, {
      ...newAnalytics,
      lastViewedAt: increments.incrementViews ? serverTimestamp() : null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}

/**
 * Actualiza el embudo de conversión del usuario actual
 * Nota: Esta función puede lanzar errores - debe ser manejada con .catch() por el llamador
 */
async function updateConversionFunnel(params: {
  action: "view" | "add_to_cart" | "checkout" | "purchase";
  productId: string;
  revenue?: number;
}): Promise<void> {
  const sessionId = getOrCreateSessionId();
  const docRef = doc(db, COLLECTIONS.conversionFunnels, sessionId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // Actualizar embudo existente
    const data = docSnap.data() as TConversionFunnel;
    const updateData: any = {
      updatedAt: serverTimestamp(),
    };

    if (params.action === "view" && !data.viewedProducts.includes(params.productId)) {
      updateData.viewedProducts = [...data.viewedProducts, params.productId];
      updateData.totalProductsViewed = data.totalProductsViewed + 1;
    }

    if (params.action === "add_to_cart") {
      if (!data.addedToCart.includes(params.productId)) {
        updateData.addedToCart = [...data.addedToCart, params.productId];
        updateData.totalProductsInCart = data.totalProductsInCart + 1;
      }
      if (!data.firstAddToCartAt) {
        updateData.firstAddToCartAt = serverTimestamp();
      }
      if (data.stage === "viewed") {
        updateData.stage = "added_to_cart";
      }
    }

    if (params.action === "checkout") {
      updateData.checkoutAt = serverTimestamp();
      updateData.stage = "checkout";
    }

    if (params.action === "purchase") {
      if (!data.purchasedProducts.includes(params.productId)) {
        updateData.purchasedProducts = [...data.purchasedProducts, params.productId];
        updateData.totalProductsPurchased = data.totalProductsPurchased + 1;
      }
      if (params.revenue) {
        updateData.totalRevenue = data.totalRevenue + params.revenue;
      }
      updateData.purchaseAt = serverTimestamp();
      updateData.stage = "purchased";
    }

    await updateDoc(docRef, updateData);
  } else {
    // Crear nuevo embudo
    const newFunnel: Omit<TConversionFunnel, "createdAt" | "updatedAt"> = {
      sessionId,
      viewedProducts: params.action === "view" ? [params.productId] : [],
      addedToCart: params.action === "add_to_cart" ? [params.productId] : [],
      purchasedProducts: params.action === "purchase" ? [params.productId] : [],
      firstViewAt: serverTimestamp() as any,
      firstAddToCartAt: params.action === "add_to_cart" ? (serverTimestamp() as any) : undefined,
      checkoutAt: params.action === "checkout" ? (serverTimestamp() as any) : undefined,
      purchaseAt: params.action === "purchase" ? (serverTimestamp() as any) : undefined,
      stage: params.action === "purchase" ? "purchased" : params.action === "checkout" ? "checkout" : params.action === "add_to_cart" ? "added_to_cart" : "viewed",
      totalProductsViewed: params.action === "view" ? 1 : 0,
      totalProductsInCart: params.action === "add_to_cart" ? 1 : 0,
      totalProductsPurchased: params.action === "purchase" ? 1 : 0,
      totalRevenue: params.revenue || 0,
    };

    await setDoc(docRef, {
      ...newFunnel,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}

/**
 * Marca el checkout en el embudo
 */
export async function trackCheckoutStarted(): Promise<void> {
  try {
    // Actualizar embudo de conversión (silencioso si falla)
    updateConversionFunnel({
      action: "checkout",
      productId: "", // No se necesita productId específico
    }).catch(err => {
      console.warn("⚠️ Conversion funnel tracking skipped:", err.message);
    });

    console.log("📊 Checkout started tracked");
  } catch (error) {
    console.error("❌ Error tracking checkout:", error);
  }
}
