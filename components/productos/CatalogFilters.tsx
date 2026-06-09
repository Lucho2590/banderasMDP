"use client";

import { X } from "lucide-react";

export type FilterGroup = "tipo" | "material" | "uso" | "tamano";

export type FacetOption = { value: string; label: string; count: number };

export type Facets = Record<FilterGroup, FacetOption[]>;
export type Selected = Record<FilterGroup, Set<string>>;

const GROUP_LABELS: Record<FilterGroup, string> = {
  tipo: "Tipo de producto",
  tamano: "Tamaño",
  material: "Material",
  uso: "Uso",
};

const GROUP_ORDER: FilterGroup[] = ["tipo", "tamano", "material", "uso"];

type Props = {
  facets: Facets;
  selected: Selected;
  onToggle: (group: FilterGroup, value: string) => void;
  onClear: () => void;
  activeCount: number;
};

export default function CatalogFilters({ facets, selected, onToggle, onClear, activeCount }: Props) {
  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-brand-text-primary">
          Filtros
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-reflection-600 hover:text-sky-reflection-700 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Limpiar ({activeCount})
          </button>
        )}
      </div>

      {GROUP_ORDER.map((group) => {
        const options = facets[group];
        if (!options || options.length === 0) return null;
        return (
          <fieldset key={group} className="border-t border-brand-border pt-5">
            <legend className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-3">
              {GROUP_LABELS[group]}
            </legend>
            <ul className="space-y-2">
              {options.map((option) => {
                const checked = selected[group].has(option.value);
                return (
                  <li key={option.value}>
                    <label
                      className={`flex items-center gap-2.5 cursor-pointer group select-none ${
                        option.count === 0 && !checked ? "opacity-40" : ""
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                          checked
                            ? "bg-sky-reflection border-sky-reflection"
                            : "border-brand-border-dark bg-white group-hover:border-sky-reflection-400"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => onToggle(group, option.value)}
                        />
                        {checked && (
                          <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" fill="none">
                            <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span className="flex-1 text-sm text-brand-text-primary group-hover:text-sky-reflection-700 transition-colors">
                        {option.label}
                      </span>
                      <span className="text-xs text-brand-text-tertiary tabular-nums">
                        {option.count}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        );
      })}
    </div>
  );
}
