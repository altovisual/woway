"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "./Icon";

const ZONES = ["Cancún Zona Hotelera", "Costa Mujeres", "Playa del Carmen", "Tulum"];
const EXPERIENCES = ["Todas", "Jetski & Lagoon", "Lancha/Yate Privado", "Cenotes & Aventura", "Nightlife"];
const SIZES = ["S", "M", "L", "XL"];

export function HomeSearchBar() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [zone, setZone] = useState(ZONES[0]);
  const [pax, setPax] = useState(2);
  const [exp, setExp] = useState(EXPERIENCES[0]);
  const [size, setSize] = useState("L");

  const ready = Boolean(checkIn && checkOut && checkOut > checkIn);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) return;
    try {
      localStorage.setItem(
        "woway.tripPrefs",
        JSON.stringify({ checkIn, checkOut, zone, pax, size, exp })
      );
    } catch {
      /* sin almacenamiento */
    }
    router.push("/packages#paquetes-listado");
  };

  return (
    <form className="hsearch" onSubmit={submit} aria-label="Buscar paquetes por fechas">
      <div className="hsearch__row">
        <label className="hsearch__field">
          <span>Llegada</span>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            aria-label="Fecha de llegada"
          />
        </label>

        <label className="hsearch__field">
          <span>Regreso</span>
          <input
            type="date"
            min={checkIn || undefined}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            aria-label="Fecha de regreso"
          />
        </label>

        <label className="hsearch__field hsearch__field--grow">
          <span>Zona</span>
          <select value={zone} onChange={(e) => setZone(e.target.value)} aria-label="Zona de alojamiento">
            {ZONES.map((z) => (
              <option key={z}>{z}</option>
            ))}
          </select>
        </label>

        <div className="hsearch__field hsearch__field--pax">
          <span>Viajeros</span>
          <div className="hsearch__stepper">
            <button type="button" onClick={() => setPax(Math.max(1, pax - 1))} aria-label="Un viajero menos">
              −
            </button>
            <output>{pax}</output>
            <button type="button" onClick={() => setPax(Math.min(15, pax + 1))} aria-label="Un viajero más">
              +
            </button>
          </div>
        </div>

        <button className="btn hsearch__submit" type="submit" disabled={!ready}>
          Buscar
          <Icon name="arrow" size={16} className="btn__arrow" />
        </button>
      </div>

      <div className="hsearch__row hsearch__row--secondary">
        <label className="hsearch__field hsearch__field--grow">
          <span>Experiencia que buscas</span>
          <select value={exp} onChange={(e) => setExp(e.target.value)} aria-label="Tipo de experiencia">
            {EXPERIENCES.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>

        <div className="hsearch__field">
          <span>Talla de merch de cortesía</span>
          <div className="hsearch__sizes" role="group" aria-label="Talla de merch">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                className="hsearch__size"
                aria-pressed={size === s}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <p className="hsearch__note">
          🛡️ Traslados privados, seguro <strong>WoWay Safe</strong> y concierge 24/7 incluidos.
        </p>
      </div>
    </form>
  );
}
