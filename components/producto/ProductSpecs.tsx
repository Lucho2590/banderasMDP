"use client";

import { Layers, Scissors, MapPin, ShieldCheck } from "lucide-react";
import type { TProductSpecs } from "@/types/product";

type Props = {
  specs?: TProductSpecs;
};

export default function ProductSpecs({ specs }: Props) {
  if (!specs) return null;

  const rows = [
    { icon: Layers, label: "Material", value: specs.material },
    { icon: Scissors, label: "Terminación", value: specs.terminacion },
    { icon: MapPin, label: "Uso recomendado", value: specs.usoRecomendado },
    { icon: ShieldCheck, label: "Garantía", value: specs.garantia },
  ].filter((row) => row.value && row.value.trim() !== "");

  if (rows.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-text-primary mb-6">
        Especificaciones técnicas
      </h2>
      <div className="overflow-hidden rounded-2xl border border-brand-border bg-brand-bg-primary shadow-sm">
        <dl className="divide-y divide-brand-border">
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <div
                key={row.label}
                className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:gap-6"
              >
                <dt className="flex items-center gap-2.5 text-sm font-semibold text-brand-text-secondary sm:w-56 sm:flex-shrink-0">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-bg-tertiary text-sky-reflection-600">
                    <Icon className="h-4 w-4" />
                  </span>
                  {row.label}
                </dt>
                <dd className="text-sm text-brand-text-primary sm:flex-1">{row.value}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
