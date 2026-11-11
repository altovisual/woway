export type Variant = {
  id: string;
  name: string;
  mxn: number;
  usd: number;
  note: string;
};

/** Variantes por servicio, tal como aparecen en el catálogo. */
export const packageVariants: Record<string, Variant[]> = {
  "traslado-aeropuerto-zona-hotelera": [
    { id: "sedan", name: "Sedán ejecutivo", mxn: 800, usd: 49, note: "Hasta 3 pasajeros · 3 maletas" },
    { id: "suv-comfort", name: "SUV Comfort", mxn: 999, usd: 59, note: "Hasta 4 pasajeros · 4 maletas" },
    { id: "suv-premium", name: "SUV Premium", mxn: 1150, usd: 69, note: "Hasta 5 pasajeros · 5 maletas" },
  ],
  "traslado-aeropuerto-playa-mujeres": [
    { id: "sedan", name: "Sedán ejecutivo", mxn: 999, usd: 59, note: "Hasta 3 pasajeros · 3 maletas" },
    { id: "suv-comfort", name: "SUV Comfort", mxn: 1150, usd: 69, note: "Hasta 4 pasajeros · 4 maletas" },
    { id: "suv-premium", name: "SUV Premium", mxn: 1300, usd: 79, note: "Hasta 5 pasajeros · 5 maletas" },
  ],
  "traslado-aeropuerto-costa-mujeres": [
    { id: "sedan", name: "Sedán ejecutivo", mxn: 1150, usd: 69, note: "Hasta 3 pasajeros · 3 maletas" },
    { id: "suv-comfort", name: "SUV Comfort", mxn: 1300, usd: 79, note: "Hasta 4 pasajeros · 4 maletas" },
    { id: "suv-premium", name: "SUV Premium", mxn: 1500, usd: 89, note: "Hasta 5 pasajeros · 5 maletas" },
  ],
  "traslado-aeropuerto-puerto-morelos": [
    { id: "sedan", name: "Sedán ejecutivo", mxn: 1150, usd: 69, note: "Hasta 3 pasajeros · 3 maletas" },
    { id: "suv-comfort", name: "SUV Comfort", mxn: 1300, usd: 79, note: "Hasta 4 pasajeros · 4 maletas" },
    { id: "suv-premium", name: "SUV Premium", mxn: 1500, usd: 89, note: "Hasta 5 pasajeros · 5 maletas" },
  ],
  "traslado-aeropuerto-playa-del-carmen": [
    { id: "sedan", name: "Sedán ejecutivo", mxn: 1900, usd: 115, note: "Hasta 3 pasajeros · 3 maletas" },
    { id: "suv-comfort", name: "SUV Comfort", mxn: 2200, usd: 135, note: "Hasta 4 pasajeros · 4 maletas" },
    { id: "suv-premium", name: "SUV Premium", mxn: 2500, usd: 155, note: "Hasta 5 pasajeros · 5 maletas" },
  ],
  "traslado-aeropuerto-tulum": [
    { id: "sedan", name: "Sedán ejecutivo", mxn: 3800, usd: 230, note: "Hasta 3 pasajeros · 3 maletas" },
    { id: "suv-comfort", name: "SUV Comfort", mxn: 4400, usd: 269, note: "Hasta 4 pasajeros · 4 maletas" },
    { id: "suv-premium", name: "SUV Premium", mxn: 5000, usd: 299, note: "Hasta 5 pasajeros · 5 maletas" },
  ],
  "chichen-itza-all-inclusive": [
    { id: "g4", name: "Grupo de 4", mxn: 4400, usd: 267, note: "Precio por persona" },
    { id: "g5", name: "Grupo de 5", mxn: 3850, usd: 233, note: "Precio por persona" },
    { id: "g6", name: "Grupo de 6", mxn: 3550, usd: 215, note: "Precio por persona" },
  ],
  "las-coloradas-all-inclusive": [
    { id: "g4", name: "Grupo de 4", mxn: 5700, usd: 345, note: "Precio por persona" },
    { id: "g5", name: "Grupo de 5", mxn: 4850, usd: 294, note: "Precio por persona" },
    { id: "g6", name: "Grupo de 6", mxn: 4300, usd: 261, note: "Precio por persona" },
  ],
  "tulum-all-inclusive": [
    { id: "g4", name: "Grupo de 4", mxn: 4750, usd: 288, note: "Precio por persona" },
    { id: "g5", name: "Grupo de 5", mxn: 4240, usd: 257, note: "Precio por persona" },
    { id: "g6", name: "Grupo de 6", mxn: 3900, usd: 236, note: "Precio por persona" },
  ],
  "helicoptero-riviera": [
    { id: "15", name: "Vuelo 15 min", mxn: 19500, usd: 1182, note: "Hasta 3 pasajeros" },
    { id: "30", name: "Vuelo 30 min", mxn: 23500, usd: 1424, note: "Hasta 3 pasajeros" },
    { id: "tulum", name: "Tulum 1 h 15", mxn: 42500, usd: 2576, note: "Sin aterrizaje" },
    { id: "chichen", name: "Chichén Itzá VIP", mxn: 90000, usd: 5455, note: "Hasta 3 pasajeros · día completo" },
  ],
  "black-pass": [
    { id: "2d", name: "2 días", mxn: 2805, usd: 170, note: "Crédito de tour $50 USD" },
    { id: "3d", name: "3 días", mxn: 3630, usd: 220, note: "Crédito de tour $75 USD" },
    { id: "5d", name: "5 días", mxn: 4933, usd: 299, note: "Crédito de tour $100 USD" },
  ],
};
