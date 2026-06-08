// Contact Form Helpers
// Guarda los envíos del formulario de contacto en Firestore y
// asocia el email del usuario a su sesión de GA4 (hasheado).

import { db, analytics } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { setUserId, setUserProperties } from "firebase/analytics";
import { getOrCreateSessionId } from "./ecommerceOrderHelpers";

const COLLECTION_NAME = "contactSubmissions";

export interface ContactFormInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

async function hashEmail(email: string): Promise<string> {
  const normalized = email.trim().toLowerCase();
  if (typeof window === "undefined" || !window.crypto?.subtle) {
    return normalized;
  }
  const data = new TextEncoder().encode(normalized);
  const hash = await window.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function submitContactForm(
  input: ContactFormInput
): Promise<{ id: string }> {
  const sessionId = getOrCreateSessionId();
  const userAgent =
    typeof window !== "undefined" ? window.navigator.userAgent : undefined;
  const referrer =
    typeof document !== "undefined" ? document.referrer || undefined : undefined;

  const submission: Record<string, unknown> = {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    message: input.message.trim(),
    sessionId,
    timestamp: serverTimestamp(),
  };

  if (input.phone?.trim()) submission.phone = input.phone.trim();
  if (userAgent) submission.userAgent = userAgent;
  if (referrer) submission.referrer = referrer;

  const docRef = await addDoc(collection(db, COLLECTION_NAME), submission);

  // Asociar la sesión actual de GA4 al email (hasheado).
  if (analytics) {
    try {
      const hashed = await hashEmail(input.email);
      setUserId(analytics, hashed);
      setUserProperties(analytics, { has_contacted: "true" });
    } catch (err) {
      console.warn("⚠️ GA4 user_id assignment skipped:", err);
    }
  }

  return { id: docRef.id };
}
