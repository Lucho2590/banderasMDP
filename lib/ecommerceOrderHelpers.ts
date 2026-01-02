// Ecommerce Order Helpers
import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import {
  TEcommerceOrder,
  CreateEcommerceOrderInput,
  DeviceType,
  EcommerceOrderMetadata,
} from "@/types/ecommerceOrder";

const COLLECTION_NAME = "ecommerceOrders";

/**
 * Detecta el tipo de dispositivo del usuario
 */
export function detectDeviceType(): DeviceType {
  if (typeof window === "undefined") return "desktop";

  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /iphone|ipod|android|blackberry|opera mini|windows phone|mobile/i.test(userAgent);
  const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);

  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  return "desktop";
}

/**
 * Obtiene el nombre del browser
 */
export function getBrowserName(): string {
  if (typeof window === "undefined") return "unknown";

  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("edg")) return "Edge";
  if (userAgent.includes("chrome")) return "Chrome";
  if (userAgent.includes("safari") && !userAgent.includes("chrome")) return "Safari";
  if (userAgent.includes("firefox")) return "Firefox";
  if (userAgent.includes("opera") || userAgent.includes("opr")) return "Opera";

  return "unknown";
}

/**
 * Genera un sessionId único para el usuario (guardado en sessionStorage)
 */
export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";

  const key = "ecommerce_session_id";
  let sessionId = sessionStorage.getItem(key);

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem(key, sessionId);
  }

  return sessionId;
}

/**
 * Obtiene parámetros UTM de la URL (si los hay)
 */
export function getUTMParams(): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
} {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);

  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
  };
}

/**
 * Crea metadata completa del pedido
 */
export function createOrderMetadata(): EcommerceOrderMetadata {
  const utmParams = getUTMParams();

  return {
    deviceType: detectDeviceType(),
    browser: getBrowserName(),
    userAgent: typeof window !== "undefined" ? navigator.userAgent : undefined,
    sessionId: getOrCreateSessionId(),
    referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
    ...utmParams,
  };
}

/**
 * Genera un número de orden único en formato ECOM-YYYYMMDD-HHMMSS-XXX
 * Ejemplo: ECOM-20250101-143052-A7B
 *
 * Usa timestamp + random para garantizar unicidad sin necesidad de leer la DB
 */
export function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Generar código random de 3 caracteres (A-Z, 0-9)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomCode = "";
  for (let i = 0; i < 3; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `ECOM-${year}${month}${day}-${hours}${minutes}${seconds}-${randomCode}`;
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

  if (typeof obj === 'object') {
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

/**
 * Crea un nuevo pedido de ecommerce en Firestore
 * Devuelve { id, orderNumber }
 */
export async function createEcommerceOrder(
  orderInput: CreateEcommerceOrderInput
): Promise<{ id: string; orderNumber: string }> {
  try {
    // Generar número de orden único (sin necesidad de leer la DB)
    const orderNumber = generateOrderNumber();

    // Crear el documento con timestamps del servidor
    const orderData = {
      ...orderInput,
      orderNumber,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Limpiar campos undefined (Firestore no los acepta)
    const cleanedData = cleanUndefinedFields(orderData);

    // Agregar a Firestore
    const docRef = await addDoc(collection(db, COLLECTION_NAME), cleanedData);

    console.log("✅ Pedido de ecommerce creado:", orderNumber, "ID:", docRef.id);

    return { id: docRef.id, orderNumber };
  } catch (error) {
    console.error("❌ Error creando pedido de ecommerce:", error);
    throw error;
  }
}

/**
 * Actualiza el estado de un pedido
 */
export async function updateEcommerceOrderStatus(
  orderId: string,
  status: TEcommerceOrder["status"]
): Promise<void> {
  try {
    const orderRef = doc(db, COLLECTION_NAME, orderId);
    const updates: any = {
      status,
      updatedAt: serverTimestamp(),
    };

    // Agregar timestamp específico según el estado
    if (status === "confirmed") {
      updates.confirmedAt = serverTimestamp();
    } else if (status === "shipped") {
      updates.shippedAt = serverTimestamp();
    } else if (status === "delivered") {
      updates.deliveredAt = serverTimestamp();
    } else if (status === "cancelled") {
      updates.cancelledAt = serverTimestamp();
    }

    await updateDoc(orderRef, updates);
    console.log("✅ Estado del pedido actualizado:", orderId, "→", status);
  } catch (error) {
    console.error("❌ Error actualizando estado del pedido:", error);
    throw error;
  }
}

/**
 * Vincula un pedido de ecommerce con una orden del CRM
 */
export async function linkEcommerceOrderToCRM(
  ecommerceOrderId: string,
  crmOrderId: string
): Promise<void> {
  try {
    const orderRef = doc(db, COLLECTION_NAME, ecommerceOrderId);
    await updateDoc(orderRef, {
      crmOrderId,
      updatedAt: serverTimestamp(),
    });
    console.log("✅ Pedido vinculado al CRM:", ecommerceOrderId, "→", crmOrderId);
  } catch (error) {
    console.error("❌ Error vinculando pedido al CRM:", error);
    throw error;
  }
}

/**
 * Agrega notas internas a un pedido
 */
export async function addInternalNotes(
  orderId: string,
  notes: string
): Promise<void> {
  try {
    const orderRef = doc(db, COLLECTION_NAME, orderId);
    await updateDoc(orderRef, {
      internalNotes: notes,
      updatedAt: serverTimestamp(),
    });
    console.log("✅ Notas internas agregadas al pedido:", orderId);
  } catch (error) {
    console.error("❌ Error agregando notas internas:", error);
    throw error;
  }
}
