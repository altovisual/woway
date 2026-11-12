/** Traducciones al inglés del catálogo real (por slug). */

export const EN_PACKAGES: Record<string, { name: string; short: string }> = {
  "jetski-1-hora": {
    name: "Jet Ski · 1 hour",
    short: "One hour on a jet ski across the Nichupté lagoon with a guide and life vests included.",
  },
  "jetski-2-horas": {
    name: "Jet Ski · 2 hours",
    short: "Two hours of jet ski with a guide, snorkel stop and time to explore the lagoon.",
  },
  "traslado-aeropuerto-zona-hotelera": {
    name: "Airport ⇄ Hotel Zone",
    short: "Private transfer between Cancún airport and the Hotel Zone. Executive sedan for up to 3 passengers.",
  },
  "traslado-aeropuerto-playa-mujeres": {
    name: "Airport ⇄ Playa Mujeres",
    short: "Private transfer to Playa Mujeres with a bilingual driver and flight tracking.",
  },
  "traslado-aeropuerto-costa-mujeres": {
    name: "Airport ⇄ Costa Mujeres",
    short: "Private door-to-door transfer to Costa Mujeres, air conditioning and bottled water.",
  },
  "traslado-aeropuerto-puerto-morelos": {
    name: "Airport ⇄ Puerto Morelos",
    short: "Private transfer to Puerto Morelos, ideal for smaller hotels and dive resorts.",
  },
  "traslado-aeropuerto-playa-del-carmen": {
    name: "Airport ⇄ Playa del Carmen",
    short: "Private transfer to Playa del Carmen with hotel or condo drop-off.",
  },
  "traslado-aeropuerto-tulum": {
    name: "Airport ⇄ Tulum",
    short: "Private transfer to Tulum with a driver waiting at arrivals.",
  },
  "playa-del-carmen-ida": {
    name: "Playa del Carmen · one way",
    short: "One-way private transfer between Cancún and Playa del Carmen.",
  },
  "playa-del-carmen-redondo": {
    name: "Playa del Carmen · round trip",
    short: "Round-trip private transfer between Cancún and Playa del Carmen.",
  },
  "chichen-itza-traslado": {
    name: "Chichén Itzá · private transfer",
    short: "Full-day private transfer to Chichén Itzá with stops at your own pace.",
  },
  "tulum-traslado": {
    name: "Tulum · private transfer",
    short: "Private transfer to the Tulum ruins with free time at the beach.",
  },
  "las-coloradas-traslado": {
    name: "Las Coloradas · private transfer",
    short: "Private transfer to the pink lagoons of Las Coloradas with a local guide.",
  },
  "chichen-itza-all-inclusive": {
    name: "Chichén Itzá All Inclusive",
    short: "Chichén Itzá with a certified guide, Ik Kil cenote and buffet lunch. Price per person.",
  },
  "las-coloradas-all-inclusive": {
    name: "Las Coloradas All Inclusive",
    short: "Pink lagoons, boat ride and Yucatecan lunch in one full-day experience.",
  },
  "tulum-all-inclusive": {
    name: "Tulum All Inclusive",
    short: "Tulum ruins, cenote and beach club with guide, tickets and lunch included.",
  },
  "dancer-cruise-isla-mujeres": {
    name: "Dancer Cruise · Isla Mujeres",
    short: "Full-day catamaran: snorkel, open bar, lunch, DJ and two free hours on the island.",
  },
  "cozumel-el-cielo": {
    name: "Cozumel · El Cielo",
    short: "Snorkel at El Cielo and El Cielito with a certified guide, gear, lunch and margaritas.",
  },
  "yate-jackie": {
    name: "Yacht Jackie",
    short: "Private yacht with crew, snorkel and open bar. Half or full day.",
  },
  "yate-agave": {
    name: "Yacht Agave",
    short: "Private yacht for groups with captain, snorkel gear and drinks on board.",
  },
  "helicoptero-riviera": {
    name: "Riviera helicopter flight",
    short: "Aerial view of the Cancún hotel zone, Isla Mujeres and the reef from the air.",
  },
  "la-noria-adrenaline": {
    name: "La Noria Adrenaline",
    short: "Off-road adventure with ATVs, zip lines and a cenote swim.",
  },
  "black-pass": {
    name: "WoWay Black Pass",
    short: "Membership with priority transfers, concierge and perks across the whole catalogue.",
  },
};

export const EN_PRODUCTS: Record<string, { name: string; short: string }> = {
  "camiseta-woway-classic": {
    name: "WoWay Classic Tee",
    short: "Heavyweight 240 g cotton, relaxed fit, logo embroidered on the chest.",
  },
  "camiseta-woway-sunset": {
    name: "WoWay Sunset Tee",
    short: "Faded print inspired by sunset over the lagoon.",
  },
  "gorra-woway-trucker": {
    name: "WoWay Trucker Cap",
    short: "Cotton front, breathable mesh and adjustable closure.",
  },
  "hoodie-woway-nights": {
    name: "WoWay Nights Hoodie",
    short: "Light fleece for breezy nights and the flight home.",
  },
  "tote-woway-canvas": {
    name: "WoWay Canvas Tote",
    short: "Thick canvas tote for the beach, the market or the airport.",
  },
  "botella-woway-thermal": {
    name: "WoWay Thermal Bottle",
    short: "Keeps drinks cold for 24 hours in Caribbean heat.",
  },
  "dry-bag-woway-10l": {
    name: "WoWay Dry Bag 10 L",
    short: "Waterproof bag for boat days, cenotes and the reef.",
  },
  "funda-pasaporte-woway": {
    name: "WoWay Passport Holder",
    short: "Compact holder for passport, boarding pass and cards.",
  },
  "toalla-woway-microfiber": {
    name: "WoWay Microfibre Towel",
    short: "Quick-dry towel that folds into its own pouch.",
  },
  "stickers-woway-pack": {
    name: "WoWay Sticker Pack",
    short: "Six vinyl stickers for the laptop, bottle or board.",
  },
  "sudadera-woway-crew": {
    name: "WoWay Crew Sweatshirt",
    short: "Mid-weight crew neck with a small chest print.",
  },
  "gorra-woway-black-edition": {
    name: "WoWay Black Edition Cap",
    short: "All-black cap with tone-on-tone embroidery.",
  },
};

export function enPackage(slug: string, fallback: { name: string; short: string }) {
  return EN_PACKAGES[slug] ?? fallback;
}

export function enProduct(slug: string, fallback: { name: string; short: string }) {
  return EN_PRODUCTS[slug] ?? fallback;
}
