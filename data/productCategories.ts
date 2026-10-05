import { slugify } from "@/lib/slugify";

export type ProductUso = "Interior" | "Exterior";
export type ProductTamano = "Estándar" | "A medida";

/**
 * Slugs de las categorías del catálogo. `productCategories` es una PARTICIÓN
 * ESTRICTA: cada ítem pertenece a exactamente una categoría, nunca a dos.
 * Es la fuente de verdad de la faceta `tipo` de /productos y de `catalogProducts`.
 */
export const CATEGORY_SLUGS = [
  "banderas",
  "ceremonia",
  "estandartes",
  "astas-y-bases",
  "accesorios",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export type CategoryItem = {
  name: string;
  description?: string;
  sizes?: string[];
  variants?: string[];
  notes?: string;
  imageUrl?: string;
  /**
   * Campos de filtrado del catálogo (/productos).
   * INFERIDOS a partir de las descripciones/categoría. EDITABLES: ajustar
   * libremente según la realidad de cada producto. Si un producto no tiene
   * valor, simplemente no aparecerá en ese filtro.
   *
   * ⚠️ LOAD-BEARING: `tamano: ["A medida"]` alimenta la tarjeta PERSONALIZADOS de
   * la home (ver `homeCollections` más abajo), que es una colección DERIVADA de
   * este campo y no una categoría real. Si se edita un `tamano`, el contenido de
   * esa tarjeta cambia.
   */
  material?: string[];
  uso?: ProductUso[];
  tamano?: ProductTamano[];
};

export type ProductCategory = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  heroImage: string;
  gradient: string;
  items: CategoryItem[];
};

export const productCategories: ProductCategory[] = [
  {
    slug: "banderas",
    name: "Banderas",
    tagline: "Banderas para izar al viento, en distintos materiales y medidas",
    heroImage: "/productos/banderas-flameo.jpg",
    gradient: "from-sky-reflection-500 to-sky-reflection-700",
    items: [
      {
        name: "Argentinas",
        description: "Bandera oficial argentina en distintas medidas y calidades de tela.",
        imageUrl: "/productos/flameo/argentinas.jpg",
        material: ["Poliéster"],
        uso: ["Exterior"],
        tamano: ["Estándar"],
      },
      {
        // Antes era la categoría "Banderas Extranjeras" (un solo ítem, "Cualquier país").
        // Mismo producto, reubicado como ítem de Banderas según la taxonomía de marca.
        name: "Extranjeras",
        description:
          "Confeccionamos banderas oficiales de cualquier país del mundo, en distintos materiales y medidas. Para embajadas, eventos internacionales, hoteles y particulares.",
        notes: "Consultá disponibilidad y plazos según el país.",
        imageUrl: "/productos/banderas-extranjeras.jpg",
        material: ["Poliéster"],
        uso: ["Interior", "Exterior"],
        tamano: ["Estándar", "A medida"],
      },
      {
        name: "Institucionales",
        description: "Banderas para empresas, organismos y entidades, con escudo o logotipo.",
        imageUrl: "/productos/flameo/institucionales.jpg",
        material: ["Poliéster"],
        uso: ["Exterior"],
        tamano: ["Estándar", "A medida"],
      },
      {
        name: "Deportivas",
        description: "Banderas de clubes, equipos y selecciones para hinchas y eventos.",
        imageUrl: "/productos/flameo/deportivas.jpg",
        material: ["Poliéster"],
        uso: ["Exterior"],
        tamano: ["Estándar"],
      },
      {
        name: "Señalización",
        description: "Banderas de seguridad y señalización: peligro, obras, banderas de playa, etc.",
        imageUrl: "/productos/flameo/senializacion.jpg",
        material: ["Poliéster"],
        uso: ["Exterior"],
        tamano: ["Estándar"],
      },
      {
        name: "Automovilismo",
        description: "Banderas de pista y rally: largada, llegada, bandera a cuadros, banderas de seguridad.",
        imageUrl: "/productos/flameo/automovilismo.jpg",
        material: ["Poliéster"],
        uso: ["Exterior"],
        tamano: ["Estándar"],
      },
      {
        name: "Personalizadas",
        description: "Banderas a medida con diseño propio, full color, tela vinílica o sublimada.",
        imageUrl: "/productos/flameo/personalizadas.jpg",
        material: ["Vinílica", "Sublimada"],
        uso: ["Exterior"],
        tamano: ["A medida"],
      },
    ],
  },
  {
    slug: "ceremonia",
    name: "Ceremonia",
    tagline: "Banderas reglamentarias y accesorios para escoltas y abanderados",
    heroImage: "/productos/banderas-ceremonia.jpg",
    gradient: "from-sky-reflection-600 to-sky-reflection-800",
    items: [
      {
        name: "Bandera Argentina y Bonaerense",
        description:
          "Banderas de ceremonia reglamentarias confeccionadas en tela gros de seda. Doble paño, frente bordado, tapa lisa. Refuerzo y 4 cintas distribuidas en su lado izquierdo.",
        sizes: ["45 x 70 cm (Jardín)", "90 x 1,40 m (Primaria / Secundaria / Adultos)"],
        imageUrl: "/productos/ceremonia/argentina-bonaerense.jpg",
        material: ["Gros de seda"],
        uso: ["Interior"],
        tamano: ["Estándar"],
      },
      {
        name: "Banderas Personalizadas",
        description:
          "Mismo material y confección que las reglamentarias, con diseño a medida.",
        variants: ["Institucionales", "Papales", "Extranjeras", "Clubes", "Colegios"],
        sizes: ["45 x 70 cm (Jardín)", "90 x 1,40 m (Primaria / Secundaria / Adultos)"],
        imageUrl: "/productos/ceremonia/personalizadas.jpg",
        material: ["Gros de seda"],
        uso: ["Interior"],
        tamano: ["Estándar", "A medida"],
      },
      {
        name: "Moño",
        description:
          "Confeccionado en tela gros de seda doble. Terminación con flecos dorados tipo gusanillos.",
        sizes: ["Jardín", "Adultos"],
        imageUrl: "/productos/ceremonia/monio.jpg",
        material: ["Gros de seda"],
        uso: ["Interior"],
        tamano: ["Estándar"],
      },
      {
        name: "Tahalí",
        description:
          "Banda con cuja (donde se coloca el mástil) confeccionado en cuero forrado en tela gros de seda. Para abanderados.",
        sizes: ["Jardín", "Adultos", "Medidas especiales"],
        imageUrl: "/productos/ceremonia/tahali.jpg",
        material: ["Cuero", "Gros de seda"],
        uso: ["Interior"],
        tamano: ["Estándar", "A medida"],
      },
      {
        name: "Bandas (escoltas)",
        description:
          "Confeccionadas en tela gros de seda doble. Terminación con flecos dorados tipo gusanillos.",
        notes: "Medidas variables según necesidad.",
        imageUrl: "/productos/ceremonia/bandas.jpg",
        material: ["Gros de seda"],
        uso: ["Interior"],
        tamano: ["A medida"],
      },
    ],
  },
  {
    slug: "estandartes",
    name: "Estandartes",
    tagline: "Estandartes, banners, gallardetes y lonas para eventos y publicidad",
    heroImage: "/productos/estandartes.jpg",
    gradient: "from-rose-500 to-rose-700",
    items: [
      {
        name: "Estandartes",
        description:
          "En medidas personalizadas, en tela vinílica full color. Disponibles solo con material o junto a barrales pintados.",
        imageUrl: "/productos/estandartes/estandartes.jpg",
        material: ["Vinílica"],
        uso: ["Interior", "Exterior"],
        tamano: ["A medida"],
      },
      {
        name: "Banners",
        description:
          "Desarmables. Impresión en lona vinílica full color. Distintas estructuras para elegir según conveniencia.",
        sizes: ["Medida estándar 90 x 1,90 m"],
        imageUrl: "/productos/estandartes/banners.jpg",
        material: ["Lona"],
        uso: ["Interior", "Exterior"],
        tamano: ["Estándar"],
      },
      {
        name: "Gallardetes",
        description:
          "Impresión en tela vinílica full color con vaina, palito, puntera y sogas.",
        notes: "Medida estándar 20 x 15 cm: mínimo 25 unidades. También a medida.",
        imageUrl: "/productos/estandartes/gallardetes.jpg",
        material: ["Vinílica"],
        uso: ["Exterior"],
        tamano: ["Estándar", "A medida"],
      },
      {
        name: "Lona Vinílica",
        description:
          "Impresión en lona vinílica blackout o frontlight, full color. Con vaina para soporte u ojales para tensado.",
        imageUrl: "/productos/estandartes/lona-vinilica.jpg",
        material: ["Lona"],
        uso: ["Interior", "Exterior"],
        tamano: ["A medida"],
      },
    ],
  },
  {
    slug: "astas-y-bases",
    name: "Astas y Bases",
    tagline: "Mástiles y bases para banderas de flameo, escritorio y ceremonia",
    heroImage: "/productos/astas-y-bases.jpg",
    gradient: "from-slate-500 to-slate-700",
    items: [
      {
        name: "Hierro",
        description: "Astas de hierro para banderas de flameo. Robustas y duraderas, ideales para uso exterior.",
        imageUrl: "/productos/astas/hierro.jpg",
        material: ["Metal"],
        uso: ["Exterior"],
        tamano: ["Estándar"],
      },
      {
        name: "Escritorio",
        description: "Mástiles y bases de escritorio para banderas pequeñas. En distintos materiales y terminaciones.",
        imageUrl: "/productos/astas/escritorio.jpg",
        material: ["Metal", "Madera"],
        uso: ["Interior"],
        tamano: ["Estándar"],
      },
      {
        name: "Astas de ceremonia",
        description: "Mástiles para banderas de ceremonia, con moharra y regatón. Acordes a la reglamentación.",
        imageUrl: "/productos/astas/ceremonia.jpg",
        material: ["Madera"],
        uso: ["Interior"],
        tamano: ["Estándar"],
      },
    ],
  },
  {
    slug: "accesorios",
    name: "Accesorios",
    tagline: "Escarapelas, cintas, pines, escudos, domes y calcomanías",
    heroImage: "/productos/accesorios.jpg",
    gradient: "from-emerald-500 to-emerald-700",
    items: [
      {
        name: "Escarapelas",
        description:
          "Artículos circulares, moños o en formato cinta. Se comercializan por unidad o en plancha de 24 unidades.",
        imageUrl: "/productos/accesorios/escarapelas.jpg",
        material: ["Falletina"],
        uso: ["Interior"],
        tamano: ["Estándar"],
      },
      {
        name: "Cintas",
        description:
          "Bandas decorativas de falletina estampada. Por metro o rollo de 10 metros.",
        sizes: [
          "0,5 cm (Nº1)",
          "1 cm (Nº2)",
          "1,5 cm (Nº3)",
          "2,5 cm (Nº5)",
          "3,5 cm (Nº9)",
          "5 cm (Nº12)",
          "6 cm (Nº22)",
          "7,5 cm (Nº60)",
          "9 cm (Nº80)",
        ],
        imageUrl: "/productos/accesorios/cintas.jpg",
        material: ["Falletina"],
        uso: ["Interior"],
        tamano: ["Estándar"],
      },
      {
        name: "Domes",
        description:
          "Calcos impresas en vinilo adhesivo con tratamiento de resina superficial que genera protección y efecto de piezas infladas.",
        imageUrl: "/productos/accesorios/domes.jpg",
        material: ["Vinilo"],
        uso: ["Interior", "Exterior"],
        tamano: ["Estándar", "A medida"],
      },
      {
        name: "Pines",
        description:
          "Accesorios metálicos con pintura y acabado de resina, disponibles en múltiples modelos.",
        imageUrl: "/productos/accesorios/pines.jpg",
        material: ["Metal"],
        uso: ["Interior", "Exterior"],
        tamano: ["Estándar"],
      },
      {
        name: "Escudos",
        description:
          "Parches bordados con pegamento para adherir con el calor de la plancha a la ropa o mochila. Diseños estándar y personalizados.",
        imageUrl: "/productos/accesorios/escudos.jpg",
        material: ["Bordado"],
        uso: ["Interior"],
        tamano: ["Estándar", "A medida"],
      },
      {
        name: "Calcomanías",
        description:
          "Stickers en distintas medidas y modelos, impresión full color en vinilo adhesivo. También personalizadas.",
        imageUrl: "/productos/accesorios/calcomanias.jpg",
        material: ["Vinilo"],
        uso: ["Interior", "Exterior"],
        tamano: ["Estándar", "A medida"],
      },
    ],
  },
];

/**
 * Producto del catálogo "aplanado": cada item con la info de su categoría.
 * Se usa en la grilla y los filtros de /productos.
 */
export type CatalogProduct = CategoryItem & {
  id: string;
  categorySlug: string;
  categoryName: string;
  categoryGradient: string;
};

export const catalogProducts: CatalogProduct[] = productCategories.flatMap((category) =>
  category.items.map((item) => ({
    ...item,
    id: `${category.slug}__${slugify(item.name)}`,
    categorySlug: category.slug,
    categoryName: category.name,
    categoryGradient: category.gradient,
  }))
);

if (process.env.NODE_ENV !== "production") {
  const ids = catalogProducts.map((p) => p.id);
  if (new Set(ids).size !== ids.length) {
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    console.error(
      `[productCategories] ids duplicados en catalogProducts: ${[...new Set(dupes)].join(", ")}`
    );
  }
}

/**
 * Preset de filtros al que resuelve una tarjeta de la home.
 * - `tipo`: preselecciona una o más categorías reales.
 * - `facet`: preselecciona un valor de otra faceta del catálogo (colección derivada).
 *
 * El `group` se escribe como union literal en vez de importar `FilterGroup` desde
 * `components/productos/CatalogFilters.tsx` para no acoplar la capa de datos a un
 * componente cliente. Es type-compatible con `Exclude<FilterGroup, "tipo">`.
 */
export type CollectionPreset =
  | { kind: "tipo"; slugs: CategorySlug[] }
  | { kind: "facet"; group: "material" | "uso" | "tamano"; value: string };

/**
 * Las 6 tarjetas de categoría de la home. Capa de PRESENTACIÓN: no es la
 * taxonomía. Permite mostrar 6 tarjetas sobre 5 categorías reales sin duplicar
 * ítems ni inflar los conteos de las facetas.
 */
export type HomeCollection = {
  /** Se usa en `/productos#<slug>`. */
  slug: string;
  /** En Title Case; la home lo muestra en mayúsculas por CSS. */
  name: string;
  description: string;
  heroImage: string;
  preset: CollectionPreset;
};

export const homeCollections: HomeCollection[] = [
  {
    slug: "banderas",
    name: "Banderas",
    description: "Argentinas · Extranjeras · Institucionales · Deportivas · Flameo",
    heroImage: "/productos/banderas-flameo.jpg",
    preset: { kind: "tipo", slugs: ["banderas"] },
  },
  {
    slug: "ceremonia",
    name: "Ceremonia",
    description: "Banderas de ceremonia · Moños · Tahalíes · Bandas",
    heroImage: "/productos/banderas-ceremonia.jpg",
    preset: { kind: "tipo", slugs: ["ceremonia"] },
  },
  {
    slug: "estandartes",
    name: "Estandartes",
    description: "Estandartes · Banners · Gallardetes · Lonas",
    heroImage: "/productos/estandartes.jpg",
    preset: { kind: "tipo", slugs: ["estandartes"] },
  },
  {
    slug: "astas-y-bases",
    name: "Astas y Bases",
    description: "Astas de hierro · Escritorio · Ceremonia",
    heroImage: "/productos/astas-y-bases.jpg",
    preset: { kind: "tipo", slugs: ["astas-y-bases"] },
  },
  {
    slug: "accesorios",
    name: "Accesorios",
    description: "Escarapelas · Cintas · Pines · Escudos · Calcos",
    heroImage: "/productos/accesorios.jpg",
    preset: { kind: "tipo", slugs: ["accesorios"] },
  },
  {
    // Colección DERIVADA: no es una categoría. Resuelve a `tamano: "A medida"`,
    // que hoy matchea 12 productos reales repartidos en las 5 categorías.
    // TODO: pedir al cliente una foto propia para esta tarjeta.
    slug: "personalizados",
    name: "Personalizados",
    description: "Tu diseño · Tu logo · Tu bandera",
    heroImage: "/productos/flameo/personalizadas.jpg",
    preset: { kind: "facet", group: "tamano", value: "A medida" },
  },
];

/**
 * Slugs de categoría anteriores al rediseño. Links externos y bookmarks del tipo
 * `/productos#banderas-flameo` siguen funcionando gracias a este mapa.
 */
export const LEGACY_CATEGORY_HASHES: Record<string, string> = {
  "banderas-flameo": "banderas",
  "banderas-extranjeras": "banderas",
  "banderas-ceremonia": "ceremonia",
};
