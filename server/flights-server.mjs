/**
 * Proxy de vuelos — Amadeus Flight Offers Search.
 *
 * Ejecutar:  node server/flights-server.mjs
 * Variables: AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET, ALLOWED_ORIGIN (opcional)
 *
 * Endpoint: GET /api/flights?origin=MEX&destination=CUN&date=2026-11-15&adults=2
 */
import { createServer } from "node:http";

const PORT = Number(process.env.PORT ?? 8787);
const ORIGIN = process.env.ALLOWED_ORIGIN ?? "*";
const BASE = process.env.AMADEUS_BASE ?? "https://test.api.amadeus.com";

const CLIENT_ID = process.env.AMADEUS_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.AMADEUS_CLIENT_SECRET ?? "";

let cached = { token: "", expires: 0 };

async function token() {
  if (cached.token && Date.now() < cached.expires - 60000) return cached.token;

  const res = await fetch(`${BASE}/v1/security/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  if (!res.ok) throw new Error(`Amadeus auth ${res.status}`);
  const json = await res.json();
  cached = { token: json.access_token, expires: Date.now() + json.expires_in * 1000 };
  return cached.token;
}

function normalize(data, adults) {
  const dict = data.dictionaries?.carriers ?? {};
  return (data.data ?? []).map((offer) => {
    const itin = offer.itineraries[0];
    const seg = itin.segments[0];
    const last = itin.segments[itin.segments.length - 1];
    const carrier = seg.carrierCode;
    return {
      id: offer.id,
      airline: dict[carrier] ?? carrier,
      airlineCode: carrier,
      flightNumber: `${carrier}-${seg.number}`,
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

const parseDuration = (iso) => {
  const m = /PT(?:(\d+)H)?(?:(\d+)M)?/.exec(iso ?? "");
  return (Number(m?.[1] ?? 0) * 60) + Number(m?.[2] ?? 0);
};

const server = createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "OPTIONS") return res.writeHead(204).end();

  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname !== "/api/flights") return res.writeHead(404).end(JSON.stringify({ error: "not found" }));

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return res.writeHead(503).end(
      JSON.stringify({ error: "missing_credentials", detail: "Configura AMADEUS_CLIENT_ID y AMADEUS_CLIENT_SECRET." })
    );
  }

  const q = url.searchParams;
  const origin = (q.get("origin") ?? "").toUpperCase();
  const destination = (q.get("destination") ?? "").toUpperCase();
  const date = q.get("date") ?? "";
  const adults = Math.min(9, Math.max(1, Number(q.get("adults") ?? 1)));

  if (!origin || !destination || !date) {
    return res.writeHead(400).end(JSON.stringify({ error: "bad_request" }));
  }

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

    if (!r.ok) {
      return res.writeHead(r.status).end(JSON.stringify({ error: "amadeus_error", detail: json }));
    }

    res.writeHead(200).end(JSON.stringify({ offers: normalize(json, adults) }));
  } catch (err) {
    res.writeHead(502).end(JSON.stringify({ error: "upstream", detail: String(err) }));
  }
});

server.listen(PORT, () => {
  console.log(`Flights proxy en http://localhost:${PORT}/api/flights`);
});
