/** Búsqueda de vuelos: Amadeus Flight Offers a través de proxy propio. */

export type FlightOffer = {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departAt: string;
  arriveAt: string;
  durationMinutes: number;
  stops: number;
  price: number;
  currency: string;
  cabin: string;
  bookingUrl?: string;
};

export type FlightSearchInput = {
  origin: string;
  destination: string;
  date: string;
  adults: number;
  returnDate?: string;
};

/**
 * Endpoint del proxy (serverless o Node) que guarda las credenciales de Amadeus.
 * Sin endpoint configurado se devuelven ofertas de demostración.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FLIGHTS_ENDPOINT ?? "";

export const AIRPORTS = [
  { code: "CUN", city: "Cancún", label: "Cancún (CUN)" },
  { code: "MEX", city: "Ciudad de México", label: "Ciudad de México (MEX)" },
  { code: "JFK", city: "Nueva York", label: "Nueva York (JFK)" },
  { code: "LAX", city: "Los Ángeles", label: "Los Ángeles (LAX)" },
  { code: "MIA", city: "Miami", label: "Miami (MIA)" },
  { code: "MAD", city: "Madrid", label: "Madrid (MAD)" },
  { code: "BOG", city: "Bogotá", label: "Bogotá (BOG)" },
  { code: "EZE", city: "Buenos Aires", label: "Buenos Aires (EZE)" },
  { code: "GRU", city: "São Paulo", label: "São Paulo (GRU)" },
  { code: "YYZ", city: "Toronto", label: "Toronto (YYZ)" },
];

const iso = (d: Date) => d.toISOString();

function demoOffers(input: FlightSearchInput): FlightOffer[] {
  const base = new Date(`${input.date}T09:00:00`);
  const build = (i: number, airline: string, code: string, num: string, hour: number, mins: number, price: number, stops: number) => {
    const dep = new Date(base);
    dep.setHours(hour, 0, 0, 0);
    const arr = new Date(dep.getTime() + mins * 60000);
    return {
      id: `demo-${i}`,
      airline,
      airlineCode: code,
      flightNumber: num,
      origin: input.origin,
      destination: input.destination,
      departAt: iso(dep),
      arriveAt: iso(arr),
      durationMinutes: mins,
      stops,
      price: price * Math.max(1, input.adults),
      currency: "MXN",
      cabin: "ECONOMY",
    } as FlightOffer;
  };

  return [
    build(1, "Aeroméxico", "AM", "AM-428", 8, 175, 5480, 0),
    build(2, "Volaris", "Y4", "Y4-207", 11, 190, 4320, 0),
    build(3, "Viva Aerobus", "VB", "VB-1123", 14, 205, 3890, 0),
    build(4, "American Airlines", "AA", "AA-1204", 7, 240, 6740, 0),
    build(5, "Copa Airlines", "CM", "CM-301", 6, 420, 5980, 1),
  ].sort((a, b) => a.price - b.price);
}

export async function searchFlights(input: FlightSearchInput): Promise<{ offers: FlightOffer[]; demo: boolean }> {
  if (!ENDPOINT) {
    await new Promise((r) => setTimeout(r, 450));
    return { offers: demoOffers(input), demo: true };
  }

  const qs = new URLSearchParams({
    origin: input.origin,
    destination: input.destination,
    date: input.date,
    adults: String(input.adults),
  });
  if (input.returnDate) qs.set("returnDate", input.returnDate);

  const res = await fetch(`${ENDPOINT}?${qs.toString()}`);
  if (!res.ok) throw new Error(`La búsqueda falló (${res.status})`);
  const json = (await res.json()) as { offers: FlightOffer[] };
  return { offers: json.offers ?? [], demo: false };
}

export const fmtDuration = (mins: number) => `${Math.floor(mins / 60)} h ${mins % 60 ? `${mins % 60} min` : ""}`.trim();

export const fmtTime = (isoDate: string) =>
  new Date(isoDate).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", hour12: false });

export const fmtDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("es-MX", { day: "2-digit", month: "short" });
