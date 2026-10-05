"use client";

import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { waLink } from "@/lib/contact";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      {/* Botón flotante */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring" }}
        className="fixed bottom-20 right-5 z-50"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <motion.a
          href={waLink("¡Hola! Me gustaría consultar sobre sus productos.")}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-16 h-16 bg-whatsapp hover:bg-whatsapp-hover rounded-full shadow-2xl transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Pulso animado */}
          <motion.div
            className="absolute inset-0 rounded-full bg-whatsapp"
            animate={{
              scale: [1, 1.4, 1.4],
              opacity: [0.7, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {/* Icono */}
          <MessageCircle className="h-8 w-8 text-white relative z-10" />

          {/* Badge de notificación */}
          {/* <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.5, type: "spring" }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white"
          >
            <span className="text-white text-xs font-bold">1</span>
          </motion.div> */}
        </motion.a>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-20 bottom-0 mb-2 whitespace-nowrap"
            >
              <div className="bg-brand-text-primary text-white px-4 py-3 rounded-xl shadow-xl">
                <div className="font-semibold text-sm">¿Necesitás ayuda?</div>
                <div className="text-xs text-white/70">Chateá con nosotros</div>
              </div>
              {/* Flecha */}
              <div className="absolute top-1/2 -right-2 transform -translate-y-1/2">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-brand-text-primary"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
