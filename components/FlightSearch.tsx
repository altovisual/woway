"use client";

import Link from "next/link";
import { useState } from "react";
import { AIRPORTS, fmtDuration, fmtTime, fmtDate, searchFlights, type FlightOffer } from "@/lib/flights";
import { Icon } from "./Icon";

const today = new Date();
const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

export function FlightSearch() {
  const [origin, setOrigin] = useState("MEX");
  const [destination, setDestination] = useState("CUN");
  const [date, setDate] = useState(minDate);
  const [adults, setAdults] = useState(2);
  const [offers, setOffers] = useState<FlightOffer[] | null>(null);
  const [demo, setDemo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await searchFlights({ origin, destination, date, adults });
      setOffers(res.offers);
      setDemo(res.demo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos buscar vuelos.");
      setOffers(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flights">
      <form className="flights__form" onSubmit={run}>
        <div className="flights__row">
          <label className="flights__field">
            <span>Origen</span>
            <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
              {AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flights__field">
            <span>Destino</span>
            <select value={destination} onChange={(e) => setDestination(e.target.value)}>
              {AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flights__field">
            <span>Fecha de ida</span>
            <input type="date" min={minDate} value={date} onChange={(e) => setDate(e.target.value)} />
          </label>

          <div className="flights__field flights__field--pax">
            <span>Viajeros</span>
            <div className="flights__stepper">
              <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} aria-label="Menos viajeros">−</button>
              <output>{adults}</output>
              <button type="button" onClick={() => setAdults(Math.min(9, adults + 1))} aria-label="Más viajeros">+</button>
            </div>
          </div>

          <button className="btn flights__submit" type="submit" disabled={loading}>
            {loading ? "Buscando…" : "Buscar vuelos"}
            {!loading && <Icon name="arrow" size={16} className="btn__arrow" />}
          </button>
        </div>

        {demo && (
          <p className="flights__notice">
            Modo demostración: conecta el proxy de Amadeus (<code>NEXT_PUBLIC_FLIGHTS_ENDPOINT</code>) para
            tarifas en vivo. Las ofertas mostradas son de ejemplo con estructura real.
          </p>
        )}
        {error && <p className="flights__error">{error}</p>}
      </form>

      {offers && (
        <div className="flights__results">
          <header className="flights__results-head">
            <strong>{offers.length} vuelos</strong> {origin} → {destination} · {fmtDate(`${date}T12:00:00`)} ·{" "}
            {adults} {adults === 1 ? "viajero" : "viajeros"}
          </header>

          {offers.length === 0 && <p className="flights__empty">No hay vuelos para esa fecha. Prueba otro día.</p>}

          {offers.map((f) => (
            <article className="flight" key={f.id}>
              <div className="flight__airline">
                <span className="flight__code">{f.airlineCode}</span>
                <span>
                  <strong>{f.airline}</strong>
                  <span className="flight__num">{f.flightNumber}</span>
                </span>
              </div>

              <div className="flight__times">
                <span>
                  <strong>{fmtTime(f.departAt)}</strong>
                  <small>{f.origin}</small>
                </span>
                <span className="flight__leg">
                  <small>{fmtDuration(f.durationMinutes)}</small>
                  <span className="flight__line" aria-hidden="true" />
                  <small>{f.stops === 0 ? "Directo" : `${f.stops} escala${f.stops > 1 ? "s" : ""}`}</small>
                </span>
                <span>
                  <strong>{fmtTime(f.arriveAt)}</strong>
                  <small>{f.destination}</small>
                </span>
              </div>

              <div className="flight__price">
                <strong>
                  ${f.price.toLocaleString("es-MX")} <small>{f.currency}</small>
                </strong>
                <span>Total {adults} {adults === 1 ? "viajero" : "viajeros"}</span>
                <Link href="/packages" className="btn btn--sm flight__cta">
                  Ver paquetes
                  <Icon name="arrow" size={14} className="btn__arrow" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
