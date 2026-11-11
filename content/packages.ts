export type PackageCategory = "traslados" | "tours" | "mar" | "premium";
export type PackageKind = "servicio" | "experiencia";

export type AddOn = {
  id: string;
  name: string;
  price: number;
  unit: "persona" | "reserva";
  description: string;
};

export type TravelPackage = {
  slug: string;
  name: string;
  tagline: string;
  destination: string;
  category: PackageCategory;
  kind: PackageKind;
  days: number;
  nights: number;
  adultPrice: number;
  childPrice: number;
  rating: number;
  reviews: number;
  short: string;
  description: string;
  includes: string[];
  highlights: string[];
  itinerary: { day: string; title: string; body: string }[];
  addons: AddOn[];
  pickupZones: string[];
  badge?: string;
  featured?: boolean;
  gradient: string;
};

export const packageCategories: { id: PackageCategory | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "traslados", label: "Traslados" },
  { id: "tours", label: "Tours" },
  { id: "mar", label: "Mar & yates" },
  { id: "premium", label: "Premium" },
];

export const destinationZones = [
  "Cancún · Zona Hotelera",
  "Cancún · Centro",
  "Puerto Juárez",
  "Playa Mujeres",
  "Costa Mujeres",
  "Puerto Morelos",
  "Playa del Carmen",
  "Tulum",
  "Aeropuerto CUN",
];

const addons: AddOn[] = [
  {
    id: "drone",
    name: "Pack drone (foto + video)",
    price: 1950,
    unit: "reserva",
    description: "Material aéreo de tu experiencia, editado y entregado en 72 h.",
  },
  {
    id: "merch",
    name: "Pack WoWay Black (gorra + camiseta)",
    price: 790,
    unit: "persona",
    description: "Se entrega en el hotel o al inicio del servicio.",
  },
  {
    id: "photo",
    name: "Sesión fotográfica",
    price: 2500,
    unit: "reserva",
    description: "45 minutos con fotógrafo local, 25 imágenes editadas.",
  },
];

const G = {
  black: "linear-gradient(135deg,#0b0b0c 0%,#1f2022 100%)",
  sea: "linear-gradient(135deg,#0b2f2c 0%,#0e8a80 55%,#bfe9df 100%)",
  sand: "linear-gradient(135deg,#3a2410 0%,#8a5a2b 55%,#e8d3ae 100%)",
  night: "linear-gradient(135deg,#101012 0%,#1d4741 55%,#b9a887 100%)",
  sky: "linear-gradient(135deg,#0b3b46 0%,#1a8fa3 60%,#cdeef2 100%)",
};

/** [slug, nombre, destino, categoría, precio MXN, precio niño, resumen, incluye, gradiente, badge?, featured?] */
type Row = [
  string, string, string, PackageCategory, number, number, string, string[], string, string?, boolean?,
];

const rows: Row[] = [
  // ── Traslados aeropuerto ────────────────────────────────────────────────
  ["traslado-aeropuerto-zona-hotelera", "Aeropuerto ⇄ Zona Hotelera", "Cancún", "traslados", 800, 0,
    "Traslado privado entre el aeropuerto de Cancún y la Zona Hotelera. Sedán ejecutivo hasta 3 pasajeros.",
    ["100% privado", "Chofer bilingüe", "Vehículo con aire", "Soporte 24/7"], G.black, "Más pedido", true],
  ["traslado-aeropuerto-playa-mujeres", "Aeropuerto ⇄ Playa Mujeres", "Playa Mujeres", "traslados", 999, 0,
    "Traslado privado al aeropuerto desde Playa Mujeres, sin paradas ni esperas compartidas.",
    ["100% privado", "Chofer bilingüe", "Hasta 3 pasajeros", "Wi-Fi Starlink"], G.black],
  ["traslado-aeropuerto-costa-mujeres", "Aeropuerto ⇄ Costa Mujeres", "Costa Mujeres", "traslados", 1150, 0,
    "Traslado privado aeropuerto–Costa Mujeres en vehículo con aire acondicionado.",
    ["100% privado", "Chofer bilingüe", "Hasta 3 pasajeros", "Wi-Fi Starlink"], G.black],
  ["traslado-aeropuerto-puerto-morelos", "Aeropuerto ⇄ Puerto Morelos", "Puerto Morelos", "traslados", 1150, 0,
    "Traslado privado entre el aeropuerto y Puerto Morelos, ida o vuelta.",
    ["100% privado", "Chofer bilingüe", "Hasta 3 pasajeros", "Wi-Fi Starlink"], G.black],
  ["traslado-aeropuerto-playa-del-carmen", "Aeropuerto ⇄ Playa del Carmen", "Playa del Carmen", "traslados", 1900, 0,
    "Traslado privado aeropuerto–Playa del Carmen, con recogida personalizada.",
    ["100% privado", "Chofer bilingüe", "Hasta 3 pasajeros", "Wi-Fi Starlink"], G.black],
  ["traslado-aeropuerto-tulum", "Aeropuerto ⇄ Tulum", "Tulum", "traslados", 3800, 0,
    "Traslado privado entre Cancún y Tulum, con espacio para equipaje.",
    ["100% privado", "Chofer bilingüe", "Hasta 3 pasajeros", "Wi-Fi Starlink"], G.black],

  // ── Traslados privados de día ───────────────────────────────────────────
  ["playa-del-carmen-ida", "Playa del Carmen · ida", "Playa del Carmen", "traslados", 2500, 0,
    "Traslado privado de una sola dirección entre Cancún y Playa del Carmen, hasta 6 pasajeros.",
    ["SUV privada", "Hasta 6 pasajeros", "Recogida a medida", "Wi-Fi Starlink"], G.night],
  ["playa-del-carmen-redondo", "Playa del Carmen · redondo", "Playa del Carmen", "traslados", 4500, 0,
    "Ida y vuelta el mismo día, con horario flexible coordinado contigo.",
    ["SUV privada", "Hasta 6 pasajeros", "Regreso incluido", "Wi-Fi Starlink"], G.night],
  ["chichen-itza-traslado", "Chichén Itzá · traslado privado", "Yucatán", "traslados", 1800, 0,
    "Traslado privado de día completo a Chichén Itzá, con paradas a tu ritmo (cenote o Valladolid).",
    ["SUV privada", "Hasta 6 pasajeros", "Paradas flexibles", "Wi-Fi Starlink"], G.sand, "Favorito", true],
  ["tulum-traslado", "Tulum · traslado privado", "Tulum", "traslados", 1600, 0,
    "Traslado privado de ida y vuelta a Tulum, con libertad para armar tu propio día.",
    ["SUV privada", "Hasta 6 pasajeros", "Paradas flexibles", "Wi-Fi Starlink"], G.sea],
  ["las-coloradas-traslado", "Las Coloradas · traslado privado", "Yucatán", "traslados", 2150, 0,
    "Traslado privado a Las Coloradas, con opción de parar en Río Lagartos.",
    ["SUV privada", "Hasta 6 pasajeros", "Paradas flexibles", "Wi-Fi Starlink"], G.sand],

  // ── Tours todo incluido ────────────────────────────────────────────────
  ["chichen-itza-all-inclusive", "Chichén Itzá All Inclusive", "Yucatán", "tours", 3550, 0,
    "Chichén Itzá con guía certificado, cenote Ik Kil, comida buffet y Valladolid. Precio por persona en grupo de 6.",
    ["Entrada a Chichén", "Guía certificado", "Cenote Ik Kil", "Buffet y Valladolid"], G.sand, "Todo incluido", true],
  ["las-coloradas-all-inclusive", "Las Coloradas All Inclusive", "Yucatán", "tours", 4300, 0,
    "Aguas rosas, Ría Lagartos en lancha y cenote Ik Kil, con guía y comida. Precio por persona en grupo de 6.",
    ["Entrada", "Paseo en lancha", "Cenote Ik Kil", "Comida buffet"], G.sand],
  ["tulum-all-inclusive", "Tulum All Inclusive", "Tulum", "tours", 3900, 0,
    "Ruinas de Tulum con guía, cenote Casa Tortugas, tirolesa, kayak y buffet. Precio por persona en grupo de 6.",
    ["Entrada y guía", "Cenote", "Tirolesa y kayak", "Buffet"], G.sea, "Todo incluido", true],
  ["dancer-cruise-isla-mujeres", "Dancer Cruise · Isla Mujeres", "Isla Mujeres", "mar", 1970, 1470,
    "Catamarán de día completo: snorkel, barra libre, comida, DJ y dos horas libres en la isla.",
    ["Catamarán", "Barra libre", "Snorkel", "Comida y DJ"], G.sky, "Best seller", true],
  ["cozumel-el-cielo", "Cozumel · El Cielo", "Cozumel", "mar", 2250, 0,
    "Snorkel en El Cielo y El Cielito con guía certificado, equipo, comida y margaritas.",
    ["Ferry Xcaret", "Catamarán", "Guía y equipo", "Comida y bebidas"], G.sky],
  ["jetski-1-hora", "Jet Ski · 1 hora", "Cancún", "mar", 3750, 0,
    "Una hora de moto de agua para hasta 2 personas, con transporte privado y cuotas de muelle incluidas.",
    ["Hasta 2 personas", "Transporte privado", "Cuotas de muelle", "Chalecos y lockers"], G.sky],
  ["jetski-2-horas", "Jet Ski · 2 horas", "Cancún", "mar", 5900, 0,
    "Dos horas de moto de agua, mismo formato privado con traslado y muelle incluidos.",
    ["Hasta 2 personas", "Transporte privado", "Cuotas de muelle", "Chalecos y lockers"], G.sky],

  // ── Premium ────────────────────────────────────────────────────────────
  ["yate-jackie", "Yate Jackie · 48 ft", "Isla Mujeres", "premium", 22350, 0,
    "Sea Ray Flybridge de 48 pies, 6 horas, capitán y tripulación. Hasta 15 invitados.",
    ["Capitán y 2 tripulantes", "Snorkel", "Bebidas a bordo", "Ruta a Isla Mujeres"], G.black, "Premium", true],
  ["yate-agave", "Yate Agavero · 46 ft", "Isla Mujeres", "premium", 22350, 0,
    "Sunseeker de 46 pies, 6 horas con tripulación, para hasta 15 invitados.",
    ["Capitán y 2 tripulantes", "Snorkel", "Bebidas a bordo", "Ruta a Isla Mujeres"], G.black],
  ["helicoptero-riviera", "Helicóptero · Riviera Maya", "Playa del Carmen", "premium", 19500, 0,
    "Vuelo privado de 15 minutos sobre la costa de Playa del Carmen, hasta 3 pasajeros.",
    ["Vuelo privado", "Hasta 3 pasajeros", "Salida en Playa del Carmen", "Concierge"], G.night, "Premium"],
  ["la-noria-adrenaline", "La Noria Adrenaline Park", "Cancún", "premium", 2150, 0,
    "Aventura privada en la selva: ATV, caballos, cenote, tirolesa y tacos. Precio por persona en grupo de 6.",
    ["ATV", "Cabalgata", "Cenote y tirolesa", "Tacos y agua fresca"], G.night],
  ["black-pass", "Black Pass · membresía de traslados", "Cancún", "premium", 2805, 0,
    "Traslados privados ilimitados durante tu estancia, con concierge y crédito de tours.",
    ["Rides ilimitados", "Hasta 6 por vehículo", "Wi-Fi Starlink", "Crédito de tour"], G.black, "Membresía", true],
];

function gradientOf(g: string) {
  return g;
}

export const packages: TravelPackage[] = rows.map(([slug, name, destination, category, adultPrice, childPrice, short, includes, gradient, badge, featured]) => ({
  slug,
  name,
  tagline: destination,
  destination,
  category,
  kind: category === "traslados" ? "servicio" : "experiencia",
  days: 1,
  nights: 0,
  adultPrice,
  childPrice,
  rating: 4.9,
  reviews: 0,
  short,
  description: `${short} Precio en pesos mexicanos; el total se ajusta al número de viajeros en el checkout.`,
  includes,
  highlights: includes,
  itinerary: [],
  addons,
  pickupZones: destinationZones,
  badge,
  featured,
  gradient: gradientOf(gradient),
}));

export function getPackage(slug: string) {
  return packages.find((p) => p.slug === slug);
}
