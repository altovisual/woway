/**
 * Handler serverless (Vercel) del proxy de vuelos.
 * Ruta pública: /api/flights?origin=MEX&destination=CUN&date=2026-11-15&adults=2
 *
 * Variables de entorno en el proyecto:
 *   AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET, ALLOWED_ORIGIN
 */
const BASE = process.env.AMADEUS_BASE ?? "https://test.api.amadeus.com";

let cached = { token: "", expires: 0 };

async function token() {
  if (cached.token && Date.now() < cached.expires - 60000) return cached.token;

  const res = await fetch(`${BASE}/v1/security/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_CLIENT_ID ?? "",
      client_secret: process.env.AMADEUS_CLIENT_SECRET ?? "",
    }),
  });
  if (!res.ok) throw new Error(`auth ${res.status}`);

  const json = await res.json();
  cached = { token: json.access_token, expires: Date.now() + json.expires_in * 1000 };
  return cached.token;
}

const parseDuration = (iso) => {
  const m = /PT(?:(\d+)H)?(?:(\d+)M)?/.exec(iso ?? "");
  return Number(m?.[1] ?? 0) * 60 + Number(m?.[2] ?? 0);
};

function normalize(data, adults) {
  const carriers = data.dictionaries?.carriers ?? {};
  return (data.data ?? []).map((offer) => {
    const itin = offer.itineraries[0];
    const seg = itin.segments[0];
    const last = itin.segments[itin.segments.length - 1];
    const code = seg.carrierCode;
    return {
      id: offer.id,
      airline: carriers[code] ?? code,
      airlineCode: code,
      flightNumber: `${code}-${seg.number}`,
      origin: seg.departure.iataCode,
      destination: last.arrival.iataCode,
      departAt: seg.departure.at,
      arriveAt: last.arrival.at,
      durationMinutes: parseDuration(itin.duration),
      stops: itin.segments.length - 1,
      price: Number(offer.price.grandTotal ?? offer.price.total),
      currency: offer.price.currency,
      cabin: offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin ?? "ECONOMY",
      adults,
    };
  });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN ?? "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "OPTIONS") return res.status(204).end();

  if (!process.env.AMADEUS_CLIENT_ID || !process.env.AMADEUS_CLIENT_SECRET) {
    return res.status(503).json({ error: "missing_credentials" });
  }

  const origin = String(req.query.origin ?? "").toUpperCase();
  const destination = String(req.query.destination ?? "").toUpperCase();
  const date = String(req.query.date ?? "");
  const adults = Math.min(9, Math.max(1, Number(req.query.adults ?? 1)));

  if (!origin || !destination || !date) return res.status(400).json({ error: "bad_request" });

  try {
    const t = await token();
    const search = new URL(`${BASE}/v2/shopping/flight-offers`);
    search.searchParams.set("originLocationCode", origin);
    search.searchParams.set("destinationLocationCode", destination);
    search.searchParams.set("departureDate", date);
    search.searchParams.set("adults", String(adults));
    search.searchParams.set("currencyCode", "MXN");
    search.searchParams.set("max", "12");

    const r = await fetch(search, { headers: { Authorization: `Bearer ${t}` } });
    const json = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: "amadeus_error", detail: json });

    res.status(200).json({ offers: normalize(json, adults) });
  } catch (err) {
    res.status(502).json({ error: "upstream", detail: String(err) });
  }
}
