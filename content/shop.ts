export type ProductCategory = "apparel" | "accesorios";
export type Collection = "essentials" | "season" | "limited";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  collection: Collection;
  price: number;
  compareAt?: number;
  short: string;
  description: string;
  details: string[];
  sizes?: string[];
  colors: { name: string; hex: string }[];
  badge?: string;
  featured?: boolean;
  gradient: string;
  material: string;
  care: string;
};

export const categoryLabels: Record<ProductCategory, string> = {
  apparel: "Apparel",
  accesorios: "Branded accessories",
};

export const collectionLabels: Record<Collection, string> = {
  essentials: "Esenciales",
  season: "Temporada",
  limited: "Edición limitada",
};

export const products: Product[] = [
  {
    slug: "camiseta-woway-classic",
    name: "Camiseta WoWay Classic",
    category: "apparel",
    collection: "essentials",
    price: 690,
    short: "Algodón pesado 240 g, corte relajado, logo bordado en el pecho.",
    description:
      "La pieza con la que empezó todo. Algodón orgánico peinado de 240 g, corte recto y costuras reforzadas para que aguante lavada tras lavada el mismo viaje y los siguientes.",
    details: [
      "100% algodón orgánico peinado, 240 g/m²",
      "Corte relajado unisex, hombro caído",
      "Logo WoWay bordado en el pecho izquierdo",
      "Etiqueta interior impresa (sin rascado)",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#111112" },
      { name: "Bone", hex: "#efe9dd" },
      { name: "Caribe", hex: "#0e8a80" },
    ],
    badge: "Best seller",
    featured: true,
    gradient: "linear-gradient(135deg,#1b1b1d 0%,#3a3a3d 100%)",
    material: "Algodón orgánico 240 g",
    care: "Lavar en frío, secar a la sombra, planchar del revés.",
  },
  {
    slug: "camiseta-woway-sunset",
    name: "Camiseta WoWay Sunset",
    category: "apparel",
    collection: "season",
    price: 740,
    short: "Estampado degradado inspirado en el atardecer de la laguna.",
    description:
      "Serigrafía a base de agua sobre algodón ligero de 180 g. El degradado se imprime pieza por pieza, así que ninguna camiseta queda exactamente igual.",
    details: [
      "Algodón orgánico 180 g/m²",
      "Serigrafía a base de agua, tacto suave",
      "Corte regular unisex",
      "Tirada de temporada: 300 piezas",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Bone", hex: "#efe9dd" },
      { name: "Black", hex: "#111112" },
    ],
    badge: "Temporada",
    featured: true,
    gradient: "linear-gradient(135deg,#f0d9c4 0%,#e08a6b 55%,#7b3f57 100%)",
    material: "Algodón orgánico 180 g",
    care: "Lavar del revés en frío. No usar secadora.",
  },
  {
    slug: "gorra-woway-trucker",
    name: "Gorra WoWay Trucker",
    category: "apparel",
    collection: "essentials",
    price: 590,
    short: "Frontal de algodón, malla transpirable y cierre ajustable.",
    description:
      "La gorra de todos los días: frontal estructurado con bordado 3D, malla posterior para el calor de la península y cierre de plástico reciclado.",
    details: [
      "Frontal de algodón, malla de poliéster reciclado",
      "Bordado 3D frontal y parche lateral",
      "Cierre ajustable de 6 posiciones",
      "Talla única (54–60 cm)",
    ],
    colors: [
      { name: "Black / Bone", hex: "#111112" },
      { name: "Caribe / Bone", hex: "#0e8a80" },
    ],
    badge: "Best seller",
    featured: true,
    gradient: "linear-gradient(135deg,#243b39 0%,#0c1514 100%)",
    material: "Algodón y malla reciclada",
    care: "Lavar a mano, secar al aire.",
  },
  {
    slug: "gorra-woway-black-edition",
    name: "Gorra WoWay Black Edition",
    category: "apparel",
    collection: "limited",
    price: 690,
    short: "Bordado tonal, etiqueta metálica y tirada numerada.",
    description:
      "Todo negro, incluso el logo. Bordado tonal sobre sarga de algodón, etiqueta metálica cosida a mano y numeración interior del 1 al 150.",
    details: [
      "Sarga de algodón 100%",
      "Bordado tonal, etiqueta metálica",
      "Tirada numerada de 150 piezas",
      "Incluye bolsa de algodón reutilizable",
    ],
    colors: [{ name: "All black", hex: "#0b0b0c" }],
    badge: "Edición limitada",
    featured: false,
    gradient: "linear-gradient(135deg,#0b0b0c 0%,#1f2022 100%)",
    material: "Sarga de algodón",
    care: "Limpieza local con paño húmedo.",
  },
  {
    slug: "hoodie-woway-nights",
    name: "Hoodie WoWay Nights",
    category: "apparel",
    collection: "season",
    price: 1290,
    short: "Fleece ligero para las noches de brisa y el vuelo de vuelta.",
    description:
      "Fleece de algodón de 320 g con capucha forrada, bolsillo canguro y puños acanalados. Pensado para el avión, la terraza y el aire acondicionado.",
    details: [
      "Fleece de algodón 320 g/m²",
      "Capucha forrada con cordón plano",
      "Bolsillo canguro con costura interior",
      "Corte unisex ligeramente oversize",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#111112" },
      { name: "Arena", hex: "#cdbba4" },
    ],
    featured: true,
    gradient: "linear-gradient(135deg,#2b2b2e 0%,#111112 100%)",
    material: "Fleece de algodón 320 g",
    care: "Lavar en frío, secar en horizontal.",
  },
  {
    slug: "camiseta-cenote-limited",
    name: "Camiseta Cenote (limitada)",
    category: "apparel",
    collection: "limited",
    price: 890,
    short: "Ilustración original de un cenote, impresa en dos tintas.",
    description:
      "Ilustración encargada a un artista de Yucatán, impresa a dos tintas sobre algodón pesado. Cada pieza incluye el número de tirada en la etiqueta.",
    details: [
      "Algodón orgánico 240 g/m²",
      "Ilustración original, dos tintas",
      "Tirada de 120 piezas numeradas",
      "10% de la venta apoya proyectos de conservación de cenotes",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Bone", hex: "#efe9dd" }],
    badge: "Edición limitada",
    gradient: "linear-gradient(135deg,#0d3b38 0%,#1b6b63 60%,#a7d8cf 100%)",
    material: "Algodón orgánico 240 g",
    care: "Lavar del revés en frío.",
  },
  {
    slug: "tote-woway-canvas",
    name: "Tote WoWay Canvas",
    category: "accesorios",
    collection: "essentials",
    price: 490,
    short: "Lona de 16 oz con bolsillo interior y asas reforzadas.",
    description:
      "La bolsa que acaba yendo a la playa, al mercado y al avión. Lona gruesa, base reforzada y un bolsillo interior donde siempre encuentras las llaves.",
    details: [
      "Lona de algodón 16 oz",
      "Asas reforzadas con remache",
      "Bolsillo interior con cierre",
      "38 × 42 cm, base de 12 cm",
    ],
    colors: [
      { name: "Bone", hex: "#efe9dd" },
      { name: "Black", hex: "#111112" },
    ],
    featured: true,
    gradient: "linear-gradient(135deg,#e7ded0 0%,#c8b9a4 100%)",
    material: "Lona de algodón 16 oz",
    care: "Lavar a mano, secar al aire.",
  },
  {
    slug: "botella-termica-woway",
    name: "Botella térmica WoWay",
    category: "accesorios",
    collection: "essentials",
    price: 690,
    short: "Acero inoxidable 500 ml, 12 horas de frío garantizado.",
    description:
      "Doble pared al vacío, tapa de bambú y grabado láser del logo. Aguanta el sol de la playa y el agua del cenote sin sudar en la mochila.",
    details: [
      "Acero inoxidable 18/8, doble pared",
      "500 ml · 12 h frío / 6 h calor",
      "Tapa de bambú con sello de silicona",
      "Libre de BPA",
    ],
    colors: [
      { name: "Black", hex: "#111112" },
      { name: "Acero", hex: "#c9ccce" },
    ],
    gradient: "linear-gradient(135deg,#3a3d3f 0%,#18191a 100%)",
    material: "Acero inoxidable",
    care: "Lavar a mano. No apta para microondas.",
  },
  {
    slug: "funda-pasaporte-woway",
    name: "Funda de pasaporte WoWay",
    category: "accesorios",
    collection: "essentials",
    price: 450,
    short: "Piel vegetal curtida, bolsillo para tarjetas y banda elástica.",
    description:
      "Piel vegetal de curtido lento que se oscurece con el uso. Dos bolsillos para tarjetas, uno para el boleto y una banda elástica que mantiene todo junto.",
    details: [
      "Piel vegetal de curtido vegetal",
      "2 bolsillos para tarjetas, 1 para boleto",
      "Banda elástica y cierre por presión",
      "Grabado del logo en la portada",
    ],
    colors: [
      { name: "Coñac", hex: "#8a5a3b" },
      { name: "Black", hex: "#111112" },
    ],
    gradient: "linear-gradient(135deg,#8a5a3b 0%,#4a2e1f 100%)",
    material: "Piel vegetal",
    care: "Limpiar con paño seco. Hidratar cada 6 meses.",
  },
  {
    slug: "dry-bag-woway",
    name: "Dry bag WoWay 10 L",
    category: "accesorios",
    collection: "season",
    price: 890,
    short: "Impermeable 10 L para cenotes, snorkel y lancha.",
    description:
      "Cierre por enrollado y costuras selladas. Flota, así que si se cae al agua la ves. Correa ajustable para llevarla cruzada.",
    details: [
      "TPU laminado, costuras selladas",
      "Cierre por enrollado, flota",
      "10 litros, correa ajustable",
      "Compatible con snorkel y toalla",
    ],
    colors: [
      { name: "Caribe", hex: "#0e8a80" },
      { name: "Black", hex: "#111112" },
    ],
    gradient: "linear-gradient(135deg,#0e8a80 0%,#064c46 100%)",
    material: "TPU laminado",
    care: "Enjuagar con agua dulce después de cada uso.",
  },
  {
    slug: "toalla-woway-playa",
    name: "Toalla WoWay de playa",
    category: "accesorios",
    collection: "season",
    price: 790,
    short: "Algodón turco 100%, seca rápido y ocupa poco.",
    description:
      "Tejida en telar con algodón turco de hilo largo. Absorbe más que una toalla de hotel y se seca en la mitad del tiempo.",
    details: [
      "Algodón turco 100%, 400 g",
      "90 × 170 cm",
      "Tejido jacquard con logo",
      "Incluye bolsa de transporte",
    ],
    colors: [
      { name: "Bone / Caribe", hex: "#efe9dd" },
      { name: "Black / Arena", hex: "#111112" },
    ],
    gradient: "linear-gradient(135deg,#efe9dd 0%,#9ecfc7 100%)",
    material: "Algodón turco",
    care: "Lavar en frío, secar al aire.",
  },
  {
    slug: "pack-stickers-woway",
    name: "Pack de stickers WoWay",
    category: "accesorios",
    collection: "limited",
    price: 190,
    short: "12 stickers resistentes al agua: mochila, laptop, hielera.",
    description:
      "Doce diseños inspirados en cenotes, lanchas, palmeras y letreros de carretera. Vinilo mate resistente al agua y a los rayos UV.",
    details: [
      "12 diseños diferentes",
      "Vinilo mate resistente al agua",
      "Tamaños de 4 a 7 cm",
      "Diseños de edición limitada",
    ],
    colors: [{ name: "Multicolor", hex: "#0e8a80" }],
    badge: "Edición limitada",
    gradient: "linear-gradient(135deg,#f2c14e 0%,#0e8a80 60%,#5c2a3f 100%)",
    material: "Vinilo mate",
    care: "Uso exterior e interior.",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatMXN(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
