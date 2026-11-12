"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "./Icon";

type Tab = "plan" | "combo" | "calendar";

const ZONES = ["Cancún Zona Hotelera", "Costa Mujeres", "Playa del Carmen", "Tulum"];
const SIZES = ["S", "M", "L", "XL"];
const EXPERIENCES = ["Todas", "Jetski & Lagoon", "Lancha/Yate Privado", "Cenotes & Aventura", "Nightlife"];
const DAY1 = ["Jetski Tour (1 h)", "Jet Ski 2 h", "Cenotes privados", "Tulum + ruinas"];
const DAY2 = ["Lancha a Isla Mujeres", "Yate privado 6 h", "Catamarán Dancer", "Cozumel El Cielo"];

export function SmartHeroWidget() {
  const [tab, setTab] = useState<Tab>("plan");

  // Plan
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [zone, setZone] = useState(ZONES[0]);
  const [pax, setPax] = useState(2);
  const [size, setSize] = useState("L");
  const [exp, setExp] = useState(EXPERIENCES[0]);

  // Combo
  const [day1, setDay1] = useState(DAY1[0]);
  const [day2, setDay2] = useState(DAY2[0]);

  // Reserva
  const [code, setCode] = useState("");

  const plansReady = Boolean(checkIn && checkOut) && checkOut > checkIn;
  const comboReady = Boolean(day1 && day2);

  const summary = useMemo(
    () =>
      plansReady
        ? `${checkIn} → ${checkOut} · ${zone} · ${pax} ${pax === 1 ? "viajero" : "viajeros"} · talla ${size} · ${exp}`
        : "",
    [plansReady, checkIn, checkOut, zone, pax, size, exp]
  );

  const applyFilters = () => {
    try {
      localStorage.setItem(
        "woway.tripPrefs",
        JSON.stringify({ checkIn, checkOut, zone, pax, size, exp, createdAt: new Date().toISOString() })
      );
    } catch {
      /* almacenamiento no disponible */
    }
    window.dispatchEvent(new CustomEvent("woway:filter", { detail: { exp } }));
    document.getElementById("paquetes-listado")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="lux smart-hero">
      <div className="smart-hero__card">
        <div className="smart-hero__tabs" role="tablist" aria-label="Planifica tu viaje">
          {[
            { id: "plan", label: "✈️ Planificar" },
            { id: "combo", label: "🎁 Armador 2×" },
            { id: "calendar", label: "📅 Mi calendario" },
          ].map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              className="smart-hero__tab"
              onClick={() => setTab(t.id as Tab)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "plan" && (
          <div role="tabpanel" id="panel-plan" aria-labelledby="tab-plan" className="smart-hero__panel">
            <div className="smart-hero__grid">
              <label className="lux-field">
                <span>Llegada (check-in)</span>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
              </label>
              <label className="lux-field">
                <span>Regreso (check-out)</span>
                <input type="date" min={checkIn || undefined} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
              </label>
              <label className="lux-field">
                <span>Zona de alojamiento</span>
                <select value={zone} onChange={(e) => setZone(e.target.value)}>
                  {ZONES.map((z) => (
                    <option key={z}>{z}</option>
                  ))}
                </select>
              </label>
              <label className="lux-field">
                <span>Viajeros</span>
                <div className="lux-stepper">
                  <button type="button" onClick={() => setPax(Math.max(1, pax - 1))} aria-label="menos">−</button>
                  <span>{pax}</span>
                  <button type="button" onClick={() => setPax(Math.min(15, pax + 1))} aria-label="más">+</button>
                </div>
              </label>
              <label className="lux-field">
                <span>Talla de merch de cortesía</span>
                <div className="lux-chips">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={size === s}
                      onClick={() => setSize(s)}
                      className="lux-chip"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </label>
              <label className="lux-field">
                <span>Experiencia favorita</span>
                <select value={exp} onChange={(e) => setExp(e.target.value)}>
                  {EXPERIENCES.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
            </div>

            <button className="lux-btn lux-btn--gold" type="button" onClick={applyFilters} disabled={!plansReady}>
              Ver paquetes para mis fechas
              <Icon name="arrow" size={16} />
            </button>
            {!plansReady && <p className="lux-hint">Elige fechas válidas para continuar.</p>}
            {summary && <p className="lux-hint">{summary}</p>}
          </div>
        )}

        {tab === "combo" && (
          <div role="tabpanel" id="panel-combo" aria-labelledby="tab-combo" className="smart-hero__panel">
            <div className="smart-hero__grid smart-hero__grid--2">
              <label className="lux-field">
                <span>Actividad Día 1</span>
                <select value={day1} onChange={(e) => setDay1(e.target.value)}>
                  {DAY1.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </label>
              <label className="lux-field">
                <span>Actividad Día 2</span>
                <select value={day2} onChange={(e) => setDay2(e.target.value)}>
                  {DAY2.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="combo-progress" aria-hidden="true">
              <span style={{ width: comboReady ? "100%" : "45%" }} />
            </div>
            <p className="combo-claim">
              {comboReady
                ? "¡Desbloqueaste 20% OFF en tu paquete + Gorra y Camiseta Oficial WoWay Black GRATIS!"
                : "Elige dos actividades para desbloquear el 20% y el merch de cortesía."}
            </p>

            <Link href="/checkout" className="lux-btn lux-btn--emerald">
              Añadir paquete a mi calendario y carrito
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        )}

        {tab === "calendar" && (
          <div role="tabpanel" id="panel-calendar" aria-labelledby="tab-calendar" className="smart-hero__panel">
            <p className="lux-hint">
              Entra con Google o usa tu código de reserva para ver vuelos, pickups y experiencias en el calendario.
            </p>
            <div className="smart-hero__grid smart-hero__grid--2">
              <Link href="/my-trip?demo=1" className="lux-btn lux-btn--light">
                Continuar con Google
              </Link>
              <label className="lux-field" style={{ margin: 0 }}>
                <span>Código de reserva</span>
                <input placeholder="WB-2026 o WOWAYVIP" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} />
              </label>
            </div>
            <Link
              href={code ? `/my-trip?code=${encodeURIComponent(code)}` : "/my-trip"}
              className="lux-btn lux-btn--gold"
            >
              Abrir Mi Viaje
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        )}

        <p className="smart-hero__trust">
          🛡️ Todo resuelto al aterrizar: traslados privados, seguro médico <strong>WoWay Safe</strong> y concierge 24/7 incluidos.
        </p>
      </div>
    </div>
  );
}
