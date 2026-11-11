/** Fotografía del sitio. Catálogo real en /public/img/catalog. */

export const heroPhoto = "/img/hero-beach.jpg";
export const aboutPhoto = "/img/about-textile.jpg";

export const productPhotos: Record<string, string> = {
  "camiseta-woway-classic": "/img/prod-tee.jpg",
  "camiseta-woway-sunset": "/img/prod-tee-sunset.jpg",
  "gorra-woway-trucker": "/img/prod-cap.jpg",
  "gorra-woway-black-edition": "/img/prod-cap.jpg",
  "hoodie-woway-nights": "/img/prod-hoodie.jpg",
  "camiseta-cenote-limited": "/img/prod-tee-limited.jpg",
  "tote-woway-canvas": "/img/prod-tote.jpg",
  "botella-termica-woway": "/img/prod-bottle.jpg",
  "funda-pasaporte-woway": "/img/prod-passport.jpg",
  "dry-bag-woway": "/img/pkg-isla.jpg",
  "toalla-woway-playa": "/img/pkg-cancun.jpg",
  "pack-stickers-woway": "/img/prod-stickers.jpg",
};

export const productTints: Record<string, string> = {
  "gorra-woway-black-edition": "grayscale(1) contrast(1.15) brightness(0.82)",
  "toalla-woway-playa": "saturate(0.9) brightness(1.05)",
};

export const packagePhotos: Record<string, string> = {
  "jetski-1-hora": "/img/catalog/jetski-1-hora.jpg",
  "jetski-2-horas": "/img/catalog/jetski-2-horas.jpg",
  "traslado-aeropuerto-zona-hotelera": "/img/catalog/traslado-aeropuerto-zona-hotelera.jpg",
  "traslado-aeropuerto-playa-mujeres": "/img/catalog/traslado-aeropuerto-playa-mujeres.jpg",
  "traslado-aeropuerto-costa-mujeres": "/img/catalog/traslado-aeropuerto-costa-mujeres.jpg",
  "traslado-aeropuerto-puerto-morelos": "/img/catalog/traslado-aeropuerto-puerto-morelos.jpg",
  "traslado-aeropuerto-playa-del-carmen": "/img/catalog/traslado-aeropuerto-playa-del-carmen.jpg",
  "traslado-aeropuerto-tulum": "/img/catalog/traslado-aeropuerto-tulum.jpg",
  "playa-del-carmen-ida": "/img/catalog/playa-del-carmen-ida.jpg",
  "playa-del-carmen-redondo": "/img/catalog/playa-del-carmen-redondo.jpg",
  "chichen-itza-traslado": "/img/catalog/chichen-itza-traslado.jpg",
  "tulum-traslado": "/img/catalog/tulum-traslado.jpg",
  "las-coloradas-traslado": "/img/catalog/las-coloradas-traslado.jpg",
  "chichen-itza-all-inclusive": "/img/catalog/chichen-itza-all-inclusive.jpg",
  "las-coloradas-all-inclusive": "/img/catalog/las-coloradas-all-inclusive.jpg",
  "tulum-all-inclusive": "/img/catalog/tulum-all-inclusive.jpg",
  "dancer-cruise-isla-mujeres": "/img/catalog/dancer-cruise-isla-mujeres.jpg",
  "cozumel-el-cielo": "/img/catalog/cozumel-el-cielo.jpg",
  "yate-jackie": "/img/catalog/yate-jackie.jpg",
  "yate-agave": "/img/catalog/yate-agave.jpg",
  "helicoptero-riviera": "/img/catalog/helicoptero-riviera.jpg",
  "la-noria-adrenaline": "/img/catalog/la-noria-adrenaline.jpg",
  "black-pass": "/img/catalog/black-pass.jpg",
};

/** Wordmarks del marquee. Sustituir por logos reales cuando estén disponibles. */
export const partnerLogos = [
  { name: "Nómada Travel", style: "serif" },
  { name: "Caribe Luxury", style: "wide" },
  { name: "Wander Collective", style: "sans" },
  { name: "Casa Akumal", style: "serif" },
  { name: "Mérida Business Travel", style: "small" },
  { name: "Riviera Escapes", style: "wide" },
  { name: "Tulum Retreats", style: "sans" },
  { name: "Cancún DMC", style: "small" },
];
