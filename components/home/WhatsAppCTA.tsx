"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_DISPLAY, waLink } from "@/lib/contact";

/** Banda de cierre de la home con el CTA a WhatsApp. */
export default function WhatsAppCTA() {
  return (
    <section id="contacto-whatsapp" className="bg-brand-bg-primary pb-16 pt-9 scroll-mt-24 lg:pb-[86px] lg:pt-[70px]">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="gradient-whatsapp-band flex flex-col gap-5 rounded-[20px] px-6 py-7 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-9"
        >
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-sky-reflection-600">
              ¿No encontrás lo que buscás?
            </p>
            <h3 className="mt-2 font-sans text-2xl font-extrabold tracking-[-0.03em] text-brand-text-primary lg:text-[27px]">
              Consultanos por WhatsApp
            </h3>
            <p className="mt-1.5 text-brand-text-secondary">Te asesoramos sin compromiso.</p>
          </div>

          <a
            href={waLink("Hola, quería hacerles una consulta.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-shrink-0 items-center justify-center self-start whitespace-nowrap rounded-full bg-whatsapp px-6 py-4 text-[15px] font-extrabold text-white transition-colors hover:bg-whatsapp-hover lg:self-auto"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            WhatsApp · {WHATSAPP_DISPLAY}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
