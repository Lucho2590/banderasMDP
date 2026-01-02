'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCart } from "@/context/CartContext";
import { TAbandonedCart } from "@/types/abandonedCart";

export default function RecuperarCarritoPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const recuperarCarrito = async () => {
      try {
        setLoading(true);
        const sessionId = params.sessionId as string;

        if (!sessionId) {
          setError("Link inválido");
          return;
        }

        // Buscar el carrito abandonado por sessionId
        const cartRef = doc(db, "abandonedCarts", sessionId);
        const cartSnap = await getDoc(cartRef);

        if (!cartSnap.exists()) {
          setError("Carrito no encontrado o ya fue recuperado");
          return;
        }

        const cartData = cartSnap.data() as TAbandonedCart;

        // Verificar que el carrito esté abandonado y no convertido
        if (!cartData.abandoned || cartData.converted) {
          setError("Este carrito ya fue procesado");
          return;
        }

        // Restaurar cada item al carrito
        for (const item of cartData.items) {
          await addToCart(
            item.product,
            item.quantity,
            item.variant || undefined
          );
        }

        setSuccess(true);

        // Redirigir a la tienda después de 2 segundos
        setTimeout(() => {
          router.push("/tienda");
        }, 2000);

      } catch (err) {
        console.error("Error recuperando carrito:", err);
        setError("Hubo un error al recuperar tu carrito");
      } finally {
        setLoading(false);
      }
    };

    recuperarCarrito();
  }, [params.sessionId, addToCart, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Recuperando tu carrito...
            </h2>
            <p className="text-gray-600">
              Estamos restaurando los productos que habías seleccionado
            </p>
          </div>
        )}

        {error && (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No pudimos recuperar tu carrito
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.push("/tienda")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ir a la Tienda
            </button>
          </div>
        )}

        {success && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              ¡Carrito recuperado!
            </h2>
            <p className="text-gray-600 mb-4">
              Tus productos han sido restaurados exitosamente
            </p>
            <p className="text-sm text-gray-500">
              Redirigiendo a la tienda...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
