// Abandoned Cart Helpers
import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
  Timestamp,
  serverTimestamp,
  limit,
} from "firebase/firestore";
import {
  TAbandonedCart,
  CreateAbandonedCartInput,
  UpdateAbandonedCartInput,
  AbandonedCartItem,
} from "@/types/abandonedCart";
import { getOrCreateSessionId, createOrderMetadata } from "./ecommerceOrderHelpers";
import { CartItem } from "@/context/CartContext";

const COLLECTION_NAME = "abandonedCarts";

/**
 * Convierte CartItem a AbandonedCartItem
 */
export function cartItemToAbandonedCartItem(item: CartItem): AbandonedCartItem {
  const price = item.selectedVariant
    ? typeof item.selectedVariant.price === "number"
      ? item.selectedVariant.price
      : parseFloat(item.selectedVariant.price.toString())
    : typeof item.product.price === "number"
    ? item.product.price
    : parseFloat(item.product.price.toString());

  return {
    productId: item.product.id,
    productName: item.product.name,
    productSku: item.product.sku || "",
    variant: item.selectedVariant
      ? {
          id: item.selectedVariant.id,
          name: item.selectedVariant.name || item.selectedVariant.size || "",
          size: item.selectedVariant.size,
        }
      : undefined,
    quantity: item.quantity,
    unitPrice: price,
    subtotal: price * item.quantity,
    imageUrl: item.product.imageUrls?.[0] || undefined,
  };
}

/**
 * Busca un carrito abandonado por sessionId
 */
export async function findAbandonedCartBySession(
  sessionId: string
): Promise<{ id: string; data: TAbandonedCart } | null> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("sessionId", "==", sessionId),
      limit(1)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const docData = snapshot.docs[0];
    return {
      id: docData.id,
      data: docData.data() as TAbandonedCart,
    };
  } catch (error) {
    console.error("❌ Error buscando carrito abandonado:", error);
    return null;
  }
}

/**
 * Crea un nuevo carrito abandonado
 */
export async function createAbandonedCart(
  items: CartItem[],
  total: number,
  customerInfo?: { name?: string; email?: string; phone?: string }
): Promise<string> {
  try {
    const sessionId = getOrCreateSessionId();
    const metadata = createOrderMetadata();
    const abandonedItems = items.map(cartItemToAbandonedCartItem);

    const now = new Date();

    const cartData: any = {
      sessionId,
      customer: customerInfo ? {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
      } : undefined,
      items: abandonedItems,
      itemsCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: total,
      total: total,
      abandoned: false, // Aún activo
      converted: false,
      metadata: {
        ...metadata,
        sessionId,
        lastPage: typeof window !== "undefined" ? window.location.pathname : undefined,
      },
      firstAddedAt: serverTimestamp(),
      lastActivityAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Limpiar undefined
    const cleanedData = cleanUndefinedFields(cartData);

    const docRef = await addDoc(collection(db, COLLECTION_NAME), cleanedData);

    console.log("📦 Carrito abandonado creado:", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("❌ Error creando carrito abandonado:", error);
    throw error;
  }
}

/**
 * Actualiza un carrito abandonado existente
 */
export async function updateAbandonedCart(
  cartId: string,
  items: CartItem[],
  total: number,
  customerInfo?: { name?: string; email?: string; phone?: string }
): Promise<void> {
  try {
    const abandonedItems = items.map(cartItemToAbandonedCartItem);

    const updateData: any = {
      items: abandonedItems,
      itemsCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: total,
      total: total,
      lastActivityAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      metadata: {
        lastPage: typeof window !== "undefined" ? window.location.pathname : undefined,
      },
    };

    // Agregar customer info si se proporciona
    if (customerInfo) {
      updateData.customer = {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
      };
    }

    // Limpiar undefined
    const cleanedData = cleanUndefinedFields(updateData);

    await updateDoc(doc(db, COLLECTION_NAME, cartId), cleanedData);

    console.log("📦 Carrito abandonado actualizado:", cartId);
  } catch (error) {
    console.error("❌ Error actualizando carrito abandonado:", error);
    throw error;
  }
}

/**
 * Marca un carrito como abandonado (cuando el usuario cierra la página)
 */
export async function markCartAsAbandoned(cartId: string): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTION_NAME, cartId), {
      abandoned: true,
      abandonedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log("🚫 Carrito marcado como abandonado:", cartId);
  } catch (error) {
    console.error("❌ Error marcando carrito como abandonado:", error);
    // No throw error - esto corre en beforeunload
  }
}

/**
 * Marca un carrito como convertido (cuando el usuario completa la compra)
 */
export async function markCartAsConverted(
  sessionId: string,
  orderId: string
): Promise<void> {
  try {
    // Buscar el carrito por sessionId
    const cart = await findAbandonedCartBySession(sessionId);

    if (!cart) {
      console.log("ℹ️ No hay carrito abandonado para convertir");
      return;
    }

    await updateDoc(doc(db, COLLECTION_NAME, cart.id), {
      converted: true,
      convertedOrderId: orderId,
      convertedAt: serverTimestamp(),
      abandoned: false, // Ya no está abandonado
      updatedAt: serverTimestamp(),
    });

    console.log("✅ Carrito marcado como convertido:", cart.id, "→ Orden:", orderId);
  } catch (error) {
    console.error("❌ Error marcando carrito como convertido:", error);
    // No throw error - esto no debería romper el flujo de compra
  }
}

/**
 * Guarda o actualiza el carrito del usuario (llamado con debounce desde CartContext)
 * @returns El ID del carrito creado o actualizado
 */
export async function saveOrUpdateAbandonedCart(
  items: CartItem[],
  total: number,
  customerInfo?: { name?: string; email?: string; phone?: string }
): Promise<string | null> {
  try {
    // Si el carrito está vacío, no hacer nada
    if (items.length === 0) {
      return null;
    }

    const sessionId = getOrCreateSessionId();

    // Buscar si ya existe un carrito para esta sesión
    const existingCart = await findAbandonedCartBySession(sessionId);

    if (existingCart) {
      // Actualizar carrito existente (solo si no está convertido)
      if (!existingCart.data.converted) {
        await updateAbandonedCart(existingCart.id, items, total, customerInfo);
        return existingCart.id;
      }
      return existingCart.id;
    } else {
      // Crear nuevo carrito y retornar su ID
      const cartId = await createAbandonedCart(items, total, customerInfo);
      return cartId;
    }
  } catch (error) {
    console.error("❌ Error guardando carrito abandonado:", error);
    // No throw error - esto no debería romper la UX
    return null;
  }
}

/**
 * Actualiza la información del cliente en un carrito abandonado existente
 */
export async function updateCustomerInfo(
  sessionId: string,
  customerInfo: { name: string; email: string; phone: string }
): Promise<void> {
  try {
    const cart = await findAbandonedCartBySession(sessionId);
    if (!cart || cart.data.converted) {
      return;
    }

    await updateDoc(doc(db, COLLECTION_NAME, cart.id), {
      customer: {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
      },
      updatedAt: serverTimestamp(),
    });

    console.log("👤 Información del cliente actualizada en carrito:", cart.id);
  } catch (error) {
    console.error("❌ Error actualizando información del cliente:", error);
  }
}

/**
 * Genera un link de recuperación para un carrito abandonado
 */
export function generateRecoveryLink(sessionId: string): string {
  const baseUrl = typeof window !== "undefined"
    ? window.location.origin
    : "https://banderasmdp.com"; // Cambiar por tu dominio en producción

  return `${baseUrl}/tienda/recuperar-carrito/${sessionId}`;
}

/**
 * Genera un mensaje de WhatsApp para recuperación de carrito
 */
export function generateRecoveryWhatsAppMessage(
  cart: TAbandonedCart,
  recoveryLink: string
): string {
  const itemsList = cart.items
    .map((item) => `• ${item.quantity}x ${item.productName}${item.variant ? ` (${item.variant.name})` : ""}`)
    .join("\n");

  const message = `¡Hola! 👋

Notamos que dejaste algunos productos en tu carrito:

${itemsList}

Total: $${cart.total.toFixed(2)}

¿Querés completar tu compra? Hacé click acá para recuperar tu carrito:
${recoveryLink}

Si tenés alguna duda, estamos para ayudarte! 😊`;

  return encodeURIComponent(message);
}

/**
 * Marca que se envió un mensaje de recuperación
 */
export async function markRecoveryMessageSent(cartId: string): Promise<void> {
  try {
    // Obtener el carrito actual para incrementar el contador
    const cartRef = doc(db, COLLECTION_NAME, cartId);
    const cartSnap = await getDocs(
      query(collection(db, COLLECTION_NAME), where("__name__", "==", cartId), limit(1))
    );

    if (cartSnap.empty) {
      console.error("❌ Carrito no encontrado:", cartId);
      return;
    }

    const currentCart = cartSnap.docs[0].data() as TAbandonedCart;
    const currentCount = currentCart.recoveryMessagesSent || 0;

    await updateDoc(cartRef, {
      recoveryMessagesSent: currentCount + 1,
      lastRecoveryMessageAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log("📧 Mensaje de recuperación registrado:", cartId);
  } catch (error) {
    console.error("❌ Error registrando mensaje de recuperación:", error);
    throw error;
  }
}

/**
 * Limpia un objeto removiendo campos con valor undefined
 * (Firestore no acepta undefined, solo null)
 */
function cleanUndefinedFields(obj: any): any {
  if (obj === null || obj === undefined) {
    return null;
  }

  if (Array.isArray(obj)) {
    return obj.map(cleanUndefinedFields);
  }

  if (typeof obj === "object") {
    const cleaned: any = {};
    for (const key in obj) {
      const value = obj[key];
      if (value !== undefined) {
        cleaned[key] = cleanUndefinedFields(value);
      }
    }
    return cleaned;
  }

  return obj;
}
