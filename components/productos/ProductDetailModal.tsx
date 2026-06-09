"use client";

import Image from "next/image";
import { MessageCircle, FileText, Ruler, Tag, Layers, MapPin, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { CatalogProduct } from "@/data/productCategories";

const WHATSAPP_PHONE = "542235416600";

function buildWhatsAppLink(product: CatalogProduct) {
  const text = `Hola! Quería consultar por ${product.name} (${product.categoryName}).`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

function ChipRow({
  icon: Icon,
  label,
  values,
}: {
  icon: typeof Tag;
  label: string;
  values?: string[];
}) {
  if (!values || values.length === 0) return null;
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-text-secondary mb-1.5">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {values.map((v) => (
          <span
            key={v}
            className="px-2.5 py-1 text-xs rounded-md bg-brand-bg-secondary text-brand-text-primary border border-brand-border"
          >
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

type Props = {
  product: CatalogProduct | null;
  onClose: () => void;
};

export default function ProductDetailModal({ product, onClose }: Props) {
  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden gap-0 max-h-[90vh] overflow-y-auto">
        {product && (
          <div className="grid md:grid-cols-2">
            {/* Imagen */}
            <div className="relative aspect-square md:aspect-auto md:min-h-[420px] bg-brand-bg-secondary">
              {product.imageUrl && (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
              <span className="absolute top-3 left-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-sky-reflection-700 backdrop-blur-sm shadow-sm">
                {product.categoryName}
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-col p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-brand-text-primary text-left">
                  {product.name}
                </DialogTitle>
                {product.description && (
                  <DialogDescription className="text-sm text-brand-text-secondary text-left leading-relaxed">
                    {product.description}
                  </DialogDescription>
                )}
              </DialogHeader>

              <div className="mt-5 space-y-4">
                <ChipRow icon={Layers} label="Material" values={product.material} />
                <ChipRow icon={MapPin} label="Uso" values={product.uso} />
                <ChipRow icon={Maximize2} label="Tamaño" values={product.tamano} />
                <ChipRow icon={Ruler} label="Medidas" values={product.sizes} />
                <ChipRow icon={Tag} label="Variantes" values={product.variants} />
                {product.notes && (
                  <p className="text-xs text-brand-text-secondary italic">{product.notes}</p>
                )}
              </div>

              <div className="mt-auto pt-6 flex flex-col gap-2.5">
                <a
                  href={buildWhatsAppLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-success text-white rounded-xl font-semibold hover:bg-success-hover transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  Consultar por WhatsApp
                </a>
                <a
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-sky-reflection text-white rounded-xl font-semibold hover:bg-sky-reflection-hover transition-colors"
                >
                  <FileText className="h-5 w-5" />
                  Solicitar presupuesto
                </a>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
