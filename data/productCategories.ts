import { slugify } from "@/lib/slugify";

export type ProductUso = "Interior" | "Exterior";
export type ProductTamano = "Estándar" | "A medida";

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
   */
  material?: string[];
  uso?: ProductUso[];
  tamano?: ProductTamano[];
};

export type ProductCategory = {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  gradient: string;
  items: CategoryItem[];
};

export const productCategories: ProductCategory[] = [
  {
    slug: "banderas-flameo",
    name: "Banderas Flameo",
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
        name: "Personalizadas",
        description: "Banderas a medida con diseño propio, full color, tela vinílica o sublimada.",
        imageUrl: "/productos/flameo/personalizadas.jpg",
        material: ["Vinílica", "Sublimada"],
        uso: ["Exterior"],
        tamano: ["A medida"],
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
    ],
  },
  {
    slug: "banderas-extranjeras",
    name: "Banderas Extranjeras",
    tagline: "Banderas oficiales de países del mundo",
    heroImage: "/productos/banderas-extranjeras.jpg",
    gradient: "from-amber-400 to-amber-600",
    items: [
      {
        name: "Cualquier país",
        description:
          "Confeccionamos banderas oficiales de cualquier país del mundo, en distintos materiales y medidas. Para embajadas, eventos internacionales, hoteles y particulares.",
        notes: "Consultá disponibilidad y plazos según el país.",
        imageUrl: "/productos/banderas-extranjeras.jpg",
        material: ["Poliéster"],
        uso: ["Interior", "Exterior"],
        tamano: ["Estándar", "A medida"],
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
        name: "Ceremonia",
        description: "Mástiles para banderas de ceremonia, con moharra y regatón. Acordes a la reglamentación.",
        imageUrl: "/productos/astas/ceremonia.jpg",
        material: ["Madera"],
        uso: ["Interior"],
        tamano: ["Estándar"],
      },
    ],
  },
  {
    slug: "banderas-ceremonia",
    name: "Banderas Ceremonia",
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
