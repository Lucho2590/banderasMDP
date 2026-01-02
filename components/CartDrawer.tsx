"use client";

import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { trackViewCart, trackBeginCheckout } from "@/lib/analytics";
import { trackCheckoutStarted, trackProductPurchase } from "@/lib/analyticsHelpers";
import {
  createEcommerceOrder,
  createOrderMetadata,
  getOrCreateSessionId,
} from "@/lib/ecommerceOrderHelpers";
import { EcommerceOrderItem } from "@/types/ecommerceOrder";
import { markCartAsConverted } from "@/lib/abandonedCartHelpers";
import CustomerInfoDialog, {
  CustomerInfo,
  getCustomerInfo,
  saveCustomerInfo,
} from "@/components/CustomerInfoDialog";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartItemsCount, clearCart } = useCart();

  const total = getCartTotal();
  const itemsCount = getCartItemsCount();

  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);

  // Cargar información del cliente al montar
  useEffect(() => {
    const savedInfo = getCustomerInfo();
    if (savedInfo) {
      setCustomerInfo(savedInfo);
    }
  }, []);

  // Verificar si necesita mostrar el diálogo cuando se abre el drawer
  useEffect(() => {
    if (isOpen && cart.length > 0 && !customerInfo) {
      // Si hay productos en el carrito pero no hay información del cliente, mostrar diálogo
      setShowCustomerDialog(true);
    }
  }, [isOpen, cart.length, customerInfo]);

  // Bloquear scroll cuando el drawer está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handler para cuando se guarda la información del cliente
  const handleSaveCustomerInfo = (info: CustomerInfo) => {
    setCustomerInfo(info);
    saveCustomerInfo(info);
    setShowCustomerDialog(false);
  };

  // ==========================================
  // ANALYTICS TRACKING
  // ==========================================

  // Track view_cart cuando se abre el drawer
  useEffect(() => {
    if (isOpen && cart.length > 0) {
      trackViewCart(total, itemsCount);
    }
  }, [isOpen]); // Solo cuando cambia isOpen, no cuando cambia el total

  // Generar mensaje de WhatsApp con el carrito
  const generateWhatsAppMessage = (orderNumber?: string) => {
    let message = "¡Hola! Me interesa realizar el siguiente pedido:\n\n";

    // Si tenemos número de orden, incluirlo
    if (orderNumber) {
      message += `*Pedido N°: ${orderNumber}*\n\n`;
    }

    cart.forEach((item, index) => {
      const variant = item.selectedVariant ? ` (${item.selectedVariant.size})` : "";
      const price = item.selectedVariant ? item.selectedVariant.price : item.product.price;
      message += `${index + 1}. ${item.product.name}${variant}\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio: $${typeof price === 'number' ? price.toLocaleString('es-AR') : price}\n\n`;
    });

    message += `*Total: $${total.toLocaleString('es-AR')}*\n\n`;
    message += "¿Podrían confirmarme disponibilidad y tiempos de entrega?";

    return encodeURIComponent(message);
  };

  const handleWhatsAppCheckout = async () => {
    if (cart.length === 0 || isProcessingOrder) return;

    try {
      setIsProcessingOrder(true);

      // Track Analytics: Iniciar checkout
      trackBeginCheckout(total, itemsCount);

      // Firestore Analytics para dashboard
      trackCheckoutStarted();

      // Convertir items del carrito a EcommerceOrderItem
      const orderItems: EcommerceOrderItem[] = cart.map((item) => {
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
      });

      // Crear metadata del pedido
      const metadata = createOrderMetadata();

      // Crear el pedido en Firestore
      const { id: orderId, orderNumber } = await createEcommerceOrder({
        customer: {
          name: customerInfo?.name,
          email: customerInfo?.email,
          phone: customerInfo?.phone,
        },
        items: orderItems,
        subtotal: total,
        shippingCost: 0,
        discount: 0,
        total: total,
        status: "pending",
        source: "web",
        metadata,
        whatsappMessageSent: true,
        internalNotes: `Pedido creado desde la web. Cliente: ${customerInfo?.name || "Sin nombre"}. Esperando confirmación por WhatsApp.`,
      });

      console.log("✅ Pedido creado:", orderNumber, "(ID:", orderId, ")");

      // Track Analytics: Compra completada (cada producto)
      for (const item of cart) {
        const price = item.selectedVariant
          ? typeof item.selectedVariant.price === "number"
            ? item.selectedVariant.price
            : parseFloat(item.selectedVariant.price.toString())
          : typeof item.product.price === "number"
          ? item.product.price
          : parseFloat(item.product.price.toString());

        const revenue = price * item.quantity;
        await trackProductPurchase(item.product, item.quantity, revenue);
      }

      // Marcar carrito como convertido (NO abandonado)
      const sessionId = getOrCreateSessionId();
      await markCartAsConverted(sessionId, orderId);

      // Generar mensaje de WhatsApp con el número de orden
      const message = generateWhatsAppMessage(orderNumber);

      // Abrir WhatsApp
      window.open(`https://wa.me/5492235416600?text=${message}`, "_blank");

      // Opcional: Limpiar carrito después de enviar
      // clearCart();
      // onClose();
    } catch (error) {
      console.error("❌ Error creando el pedido:", error);
      alert("Hubo un error al procesar tu pedido. Por favor, intentá nuevamente.");
    } finally {
      setIsProcessingOrder(false);
    }
  };

  return (
    <>
      {/* Customer Info Dialog */}
      <CustomerInfoDialog
        open={showCustomerDialog}
        onSave={handleSaveCustomerInfo}
      />

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
        />
      )}

      {/* Drawer */}
      {isOpen && (
        <div className="fixed right-0 top-0 h-screen w-full sm:w-[450px] bg-white shadow-2xl z-[101] flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-sky-reflection flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-brand-text-primary">
                    Tu Carrito
                  </h2>
                  <p className="text-sm text-brand-text-secondary">
                    {cart.length} {cart.length === 1 ? "producto" : "productos"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl hover:bg-brand-bg-secondary transition-colors flex items-center justify-center"
              >
                <X className="h-6 w-6 text-brand-text-secondary" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-auto h-full p-6 bg-gray-50">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 rounded-full bg-brand-bg-secondary flex items-center justify-center mb-4">
                    <ShoppingBag className="h-12 w-12 text-brand-text-tertiary" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-text-primary mb-2">
                    Tu carrito está vacío
                  </h3>
                  <p className="text-brand-text-secondary mb-6">
                    Agregá productos para comenzar tu pedido
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-sky-reflection text-white rounded-xl hover:bg-sky-reflection-600 transition-all font-semibold"
                  >
                    Ver Productos
                  </button>
                </div>
              ) : (
                <div>
                  {cart.map((item) => {
                    const variant = item.selectedVariant;
                    const price = variant ? variant.price : item.product.price;
                    const displayPrice = typeof price === 'number' ? price : parseFloat(price.toString());
                    const subtotal = displayPrice * item.quantity;
                    const image = item.product.imageUrls && item.product.imageUrls.length > 0
                      ? item.product.imageUrls[0]
                      : null;

                    // Obtener stock disponible
                    const availableStock = variant?.stock ?? item.product.stock ?? 999;
                    const maxQuantity = typeof availableStock === 'number' ? availableStock : 999;

                  return (
                    <div
                      key={`${item.product.id}-${variant?.id || 'no-variant'}`}
                      className="mb-4 last:mb-0"
                    >
                      <div className="flex gap-3 bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                        {/* Image */}
                        <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                          {image ? (
                            <img
                              src={image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">
                              🏴
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Product Name */}
                          <h4 className="font-semibold text-sm text-gray-900 mb-0.5 line-clamp-1">
                            {item.product.name}
                          </h4>

                          {/* Variant */}
                          {variant && (
                            <p className="text-xs text-gray-500 mb-2">
                              {variant.size}
                            </p>
                          )}

                          {/* Price Info */}
                          <div className="mb-2">
                            <p className="text-xs text-gray-500">
                              ${displayPrice.toLocaleString('es-AR')} c/u
                            </p>
                            <p className="text-base font-bold text-sky-reflection-600">
                              ${subtotal.toLocaleString('es-AR')}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, variant?.id)}
                              className="w-7 h-7 rounded-md bg-gray-100 border border-gray-300 hover:bg-gray-200 transition-colors flex items-center justify-center"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="h-3 w-3 text-gray-700" />
                            </button>
                            <span className="text-sm font-semibold w-8 text-center text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => {
                                if (item.quantity < maxQuantity) {
                                  updateQuantity(item.product.id, item.quantity + 1, variant?.id);
                                }
                              }}
                              disabled={item.quantity >= maxQuantity}
                              className={`w-7 h-7 rounded-md border transition-colors flex items-center justify-center ${
                                item.quantity >= maxQuantity
                                  ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50'
                                  : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                              }`}
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="h-3 w-3 text-gray-700" />
                            </button>
                            {item.quantity >= maxQuantity && (
                              <span className="text-xs text-orange-600 ml-1">Stock máx.</span>
                            )}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.product.id, variant?.id)}
                          className="w-8 h-8 flex-shrink-0 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors flex items-center justify-center self-start"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-brand-border p-6 space-y-4 bg-white">
                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Vaciar carrito
                </button>

                {/* Total */}
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold text-brand-text-primary">Total:</span>
                  <span className="text-2xl font-bold text-sky-reflection-600">
                    ${total.toLocaleString('es-AR')}
                  </span>
                </div>

                {/* WhatsApp Checkout Button */}
                <button
                  onClick={handleWhatsAppCheckout}
                  disabled={isProcessingOrder}
                  className={`w-full py-4 text-white rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center space-x-2 ${
                    isProcessingOrder
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:shadow-xl hover:bg-green-700"
                  }`}
                >
                  {isProcessingOrder ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                      <span>Procesando pedido...</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <span>Finalizar por WhatsApp</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-brand-text-tertiary">
                  Te contactaremos para confirmar tu pedido
                </p>
              </div>
            )}
        </div>
      )}
    </>
  );
}
