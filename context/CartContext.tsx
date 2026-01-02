"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { TProduct, TProductVariant } from "@/types/product";
import { trackAddToCart, trackRemoveFromCart } from "@/lib/analytics";
import { trackProductAddToCart, trackProductRemoveFromCart } from "@/lib/analyticsHelpers";
import {
  saveOrUpdateAbandonedCart,
  markCartAsAbandoned,
} from "@/lib/abandonedCartHelpers";
import { getOrCreateSessionId } from "@/lib/ecommerceOrderHelpers";
import { getCustomerInfo } from "@/components/CustomerInfoDialog";

export interface CartItem {
  product: TProduct;
  quantity: number;
  selectedVariant?: TProductVariant;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: TProduct, quantity?: number, variant?: TProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  isInCart: (productId: string, variantId?: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    setIsClient(true);
    const savedCart = localStorage.getItem("banderasMDP_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("banderasMDP_cart", JSON.stringify(cart));
    }
  }, [cart, isClient]);

  // ==========================================
  // ABANDONED CART TRACKING
  // ==========================================

  // Guardar carrito abandonado en Firestore (con debounce de 2 segundos)
  useEffect(() => {
    if (!isClient || cart.length === 0) {
      return;
    }

    // Debounce: esperar 2 segundos después del último cambio
    const timer = setTimeout(async () => {
      try {
        const total = getCartTotal();
        const customerInfo = getCustomerInfo();

        // Guardar o actualizar carrito (retorna el ID)
        const cartId = await saveOrUpdateAbandonedCart(cart, total, customerInfo || undefined);

        if (cartId) {
          // Guardar el ID en localStorage para usarlo en beforeunload
          localStorage.setItem("banderasMDP_abandonedCartId", cartId);
          console.log("💾 Cart ID guardado en localStorage:", cartId);
        }
      } catch (error) {
        console.error("❌ Error guardando carrito:", error);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [cart, isClient]);

  // Detectar abandono cuando el usuario cierra la página
  useEffect(() => {
    if (!isClient || cart.length === 0) {
      return;
    }

    const handleBeforeUnload = () => {
      try {
        // Obtener el ID del carrito guardado en localStorage
        const cartId = localStorage.getItem("banderasMDP_abandonedCartId");

        if (cartId) {
          console.log("🚨 Usuario cerrando página - Marcando carrito como abandonado:", cartId);

          // Marcar como abandonado
          markCartAsAbandoned(cartId).catch(err => {
            console.error("❌ ERROR en beforeunload:", err);
            console.error("❌ Error completo:", JSON.stringify(err, null, 2));
            // Para debugging - desactivado (solo logs en consola)
            // alert("Error al marcar carrito abandonado:\n" + (err.message || JSON.stringify(err)));
          });
        } else {
          console.log("ℹ️ No hay cartId guardado en localStorage");
        }
      } catch (error) {
        console.error("❌ ERROR CRÍTICO en handleBeforeUnload:", error);
        // Para debugging - desactivado (solo logs en consola)
        // alert("Error CRÍTICO en handleBeforeUnload:\n" + error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cart, isClient]);

  const addToCart = (product: TProduct, quantity: number = 1, variant?: TProductVariant) => {
    setCart((prevCart) => {
      // Buscar si el producto ya está en el carrito
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          (variant ? item.selectedVariant?.id === variant.id : !item.selectedVariant)
      );

      if (existingIndex > -1) {
        // Si ya existe, actualizar cantidad
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        // Si no existe, agregar nuevo item
        return [...prevCart, { product, quantity, selectedVariant: variant }];
      }
    });

    // Track Analytics: Agregar al carrito
    trackAddToCart(product, quantity, variant?.name);

    // Firestore Analytics para dashboard
    trackProductAddToCart(product, quantity);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart((prevCart) => {
      // Encontrar el item que se va a remover para tracking
      const itemToRemove = prevCart.find(
        (item) =>
          item.product.id === productId &&
          (variantId ? item.selectedVariant?.id === variantId : !item.selectedVariant)
      );

      // Track Analytics: Remover del carrito
      if (itemToRemove) {
        trackRemoveFromCart(
          itemToRemove.product,
          itemToRemove.quantity,
          itemToRemove.selectedVariant?.name
        );

        // Firestore Analytics para dashboard
        trackProductRemoveFromCart(itemToRemove.product, itemToRemove.quantity);
      }

      // Filtrar el carrito
      return prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (variantId ? item.selectedVariant?.id === variantId : !item.selectedVariant)
          )
      );
    });
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId &&
        (variantId ? item.selectedVariant?.id === variantId : !item.selectedVariant)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.selectedVariant
        ? typeof item.selectedVariant.price === "number"
          ? item.selectedVariant.price
          : parseFloat(item.selectedVariant.price.toString())
        : typeof item.product.price === "number"
        ? item.product.price
        : parseFloat(item.product.price.toString());

      return total + price * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId: string, variantId?: string) => {
    return cart.some(
      (item) =>
        item.product.id === productId &&
        (variantId ? item.selectedVariant?.id === variantId : true)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
