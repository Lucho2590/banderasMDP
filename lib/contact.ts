/**
 * Datos de contacto de Banderas MDP — fuente única de verdad.
 *
 * El número de WhatsApp estaba hardcodeado en 7 archivos con dos formatos
 * distintos del mismo número (`542235416600` y `5492235416600`). Este módulo
 * centraliza esos datos. Los consumen por ahora Header, Footer, Hero,
 * WhatsAppCTA y WhatsAppButton; el resto de las páginas (/tienda, /productos,
 * /contacto) sigue con sus constantes locales y queda pendiente de migrar.
 */

/** WhatsApp en formato wa.me (sin `+` ni separadores). */
export const WHATSAPP_PHONE = "542235416600";
export const WHATSAPP_DISPLAY = "223 541 6600";

/** Teléfono fijo rotativo (distinto del WhatsApp). */
export const PHONE = "2234739600";
export const PHONE_DISPLAY = "223 473 9600";

export const EMAIL = "banderas@banderasmdp.com.ar";

export const ADDRESS = "San Lorenzo 3145";
export const ADDRESS_FULL = "San Lorenzo 3145, Mar del Plata";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=San+Lorenzo+3145,+Mar+del+Plata,+Buenos+Aires,+Argentina";

export const INSTAGRAM_HANDLE = "banderasmdp";
export const INSTAGRAM_URL = "https://www.instagram.com/banderasmdp/";
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100017825207091";

/** Años de trayectoria. EDITAR si cambia. */
export const YEARS_EXPERIENCE = 40;

/** Arma un link de WhatsApp, opcionalmente con mensaje prellenado. */
export function waLink(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_PHONE}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
