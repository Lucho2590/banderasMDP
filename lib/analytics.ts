// Firebase Analytics Helper
import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";
import { TProduct } from "@/types/product";

// Tipos de eventos personalizados
type AnalyticsEvent = {
  // E-commerce events
  view_item: {
    product_id: string;
    product_name: string;
    price: number;
    category?: string;
    variant?: string;
  };
  add_to_cart: {
    product_id: string;
    product_name: string;
    price: number;
    quantity: number;
    variant?: string;
    category?: string;
  };
  remove_from_cart: {
    product_id: string;
    product_name: string;
    quantity: number;
    variant?: string;
  };
  view_cart: {
    cart_total: number;
    items_count: number;
    currency: string;
  };
  begin_checkout: {
    cart_total: number;
    items_count: number;
    currency: string;
    checkout_method: string; // 'whatsapp'
  };

  // Navigation events
  page_view: {
    page_path: string;
    page_title: string;
  };

  // Search & Filter events
  search: {
    search_term: string;
    results_count: number;
  };
  select_category: {
    category_name: string;
    category_id?: string;
  };

  // Engagement events
  view_product_image: {
    product_id: string;
    product_name: string;
    image_index: number;
  };
};

// Helper para trackear eventos solo en el cliente
const trackEvent = <T extends keyof AnalyticsEvent>(
  eventName: T,
  params: AnalyticsEvent[T]
) => {
  if (typeof window === "undefined" || !analytics) {
    return; // No trackear en servidor
  }

  try {
    // Cast a any para evitar problemas de tipos con Firebase Analytics
    logEvent(analytics, eventName as any, params as any);

    // Log en desarrollo para debugging
    if (process.env.NODE_ENV === "development") {
      console.log(`📊 Analytics Event: ${eventName}`, params);
    }
  } catch (error) {
    console.error(`Error tracking event ${eventName}:`, error);
  }
};

// ==========================================
// FUNCIONES DE TRACKING ESPECÍFICAS
// ==========================================

/**
 * Trackea cuando un usuario ve un producto
 */
export const trackViewItem = (product: TProduct, variant?: string) => {
  trackEvent("view_item", {
    product_id: product.id,
    product_name: product.name,
    price: typeof product.price === "number" ? product.price : parseFloat(product.price),
    category: product.categories?.[0] || "sin-categoria",
    variant: variant || "default",
  });
};

/**
 * Trackea cuando un usuario agrega un producto al carrito
 */
export const trackAddToCart = (
  product: TProduct,
  quantity: number,
  variant?: string
) => {
  trackEvent("add_to_cart", {
    product_id: product.id,
    product_name: product.name,
    price: typeof product.price === "number" ? product.price : parseFloat(product.price),
    quantity,
    variant: variant || "default",
    category: product.categories?.[0] || "sin-categoria",
  });
};

/**
 * Trackea cuando un usuario remueve un producto del carrito
 */
export const trackRemoveFromCart = (
  product: TProduct,
  quantity: number,
  variant?: string
) => {
  trackEvent("remove_from_cart", {
    product_id: product.id,
    product_name: product.name,
    quantity,
    variant: variant || "default",
  });
};

/**
 * Trackea cuando un usuario abre/visualiza el carrito
 */
export const trackViewCart = (total: number, itemsCount: number) => {
  trackEvent("view_cart", {
    cart_total: total,
    items_count: itemsCount,
    currency: "ARS",
  });
};

/**
 * Trackea cuando un usuario inicia el checkout (WhatsApp)
 */
export const trackBeginCheckout = (total: number, itemsCount: number) => {
  trackEvent("begin_checkout", {
    cart_total: total,
    items_count: itemsCount,
    currency: "ARS",
    checkout_method: "whatsapp",
  });
};

/**
 * Trackea cuando un usuario realiza una búsqueda
 */
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent("search", {
    search_term: searchTerm.toLowerCase().trim(),
    results_count: resultsCount,
  });
};

/**
 * Trackea cuando un usuario selecciona una categoría
 */
export const trackSelectCategory = (categoryName: string, categoryId?: string) => {
  trackEvent("select_category", {
    category_name: categoryName,
    category_id: categoryId,
  });
};

/**
 * Trackea cuando un usuario hace click en una imagen de producto
 */
export const trackViewProductImage = (
  product: TProduct,
  imageIndex: number
) => {
  trackEvent("view_product_image", {
    product_id: product.id,
    product_name: product.name,
    image_index: imageIndex,
  });
};

/**
 * Trackea vista de página
 */
export const trackPageView = (pagePath: string, pageTitle: string) => {
  trackEvent("page_view", {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

// Export por defecto con todas las funciones
export default {
  trackViewItem,
  trackAddToCart,
  trackRemoveFromCart,
  trackViewCart,
  trackBeginCheckout,
  trackSearch,
  trackSelectCategory,
  trackViewProductImage,
  trackPageView,
};
