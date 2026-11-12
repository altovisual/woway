"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "./Icon";
import { downloadIcs, googleCalendarUrl, syncWithGoogleCalendarAPI, type TripEvent } from "@/lib/calendar";

type Traveler = { name: string; email: string; photo: string; policy: string };

const DEMO: Traveler = {
  name: "Ana Martínez",
  email: "ana.martinez@gmail.com",
  photo: "AM",
  policy: "SAFE-WB-9920",
};

const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

/** Crea un Date a partir de una fecha base (YYYY-MM-DD) y una hora HH:mm. */
function at(base: string, hhmm: string, offsetDays = 0) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(`${base}T00:00:00`);
  d.setDate(d.getDate() + offsetDays);
  d.setHours(h, m, 0, 0);
  return d;
}

const fmtTime = (d: Date) => d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", hour12: false });
const fmtDay = (d: Date) => `${DAY_NAMES[d.getDay()]} ${d.getDate()}`;
const iso = (d: Date) => d.toISOString().slice(0, 10);

export function MyTrip() {
  const [traveler, setTraveler] = useState<Traveler | null>(null);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<TripEvent | null>(null);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);

  // Datos del viaje
  const [arrivalDate, setArrivalDate] = useState("2026-11-15");
  const [arrivalTime, setArrivalTime] = useState("14:30");
  const [arrivalFlight, setArrivalFlight] = useState("AA-1204");
  const [hotel, setHotel] = useState("Hotel Xcaret Arte · Cancún Zona Hotelera");
  const [departureDate, setDepartureDate] = useState("2026-11-21");
  const [departureTime, setDepartureTime] = useState("17:45");
  const [departureFlight, setDepartureFlight] = useState("AA-1209");
  const [kitSize] = useState("L");
  const [extraDays, setExtraDays] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("demo") === "1" || params.get("code")) {
      setTraveler(DEMO);
      if (params.get("code")) setCode(params.get("code")!.toUpperCase());
    }
  }, []);

  const events = useMemo<TripEvent[]>(() => {
    const list: TripEvent[] = [];
    const arrival = at(arrivalDate, arrivalTime);

    list.push({
      id: "flight-in",
      title: `Llegada a Cancún · ${arrivalFlight}`,
      start: arrival,
      end: new Date(arrival.getTime() + 90 * 60000),
      location: "Aeropuerto Internacional de Cancún (CUN) · Terminal 3",
      details: `Recepción VIP con cartel WoWay Black. Chofer: Miguel Canul · Van Sprinter blanca. Concierge 24/7: +52 993 436 9007.`,
      kind: "flight",
    });

    list.push({
      id: "merch",
      title: `Kit WoWay Black (talla ${kitSize})`,
      start: at(arrivalDate, "08:45", 1),
      end: at(arrivalDate, "09:10", 1),
      location: "Lobby del hotel · entrega con el concierge",
      details: "Gorra oficial + camiseta de la colección + stickers. Talla confirmada en tu reserva.",
      kind: "merch",
    });

    list.push({
      id: "jetski",
      title: "Jetski & Nichupté Lagoon Adrenaline",
      start: at(arrivalDate, "10:00", 1),
      end: at(arrivalDate, "12:00", 1),
      location: "Marina Vela · Cancún",
      details: "Pickup 09:15 AM en lobby. Guía: Luis Pacheco · SUV gris placas UUU-123. Incluye chalecos, muelle y lockers.",
      kind: "experience",
    });

    list.push({
      id: "yacht",
      title: "Lancha privada · Isla Mujeres",
      start: at(arrivalDate, "09:30", 2),
      end: at(arrivalDate, "15:30", 2),
      location: "Puerto Juárez · muelle 4",
      details: "Pickup 08:45 AM en lobby. Capitán: Jorge Poot · Lancha 32 ft. Snorkel, bebidas y comida a bordo.",
      kind: "experience",
    });

    list.push({
      id: "cenotes",
      title: "Ruta de cenotes privados & beach club",
      start: at(arrivalDate, "11:00", 3),
      end: at(arrivalDate, "17:00", 3),
      location: "Cenote Saamal · Valladolid",
      details: "Pickup 10:15 AM. Guía certificado, comida yucateca y acceso al beach club al regreso.",
      kind: "experience",
    });

    const departure = at(departureDate, departureTime);
    list.push({
      id: "pickup-out",
      title: `Pickup hacia el aeropuerto · ${departureFlight}`,
      start: new Date(departure.getTime() - 4 * 3600000),
      end: new Date(departure.getTime() - 3 * 3600000),
      location: hotel,
      details: "4 horas antes del vuelo internacional. Chofer: Miguel Canul · Van Sprinter blanca.",
      kind: "transfer",
    });
    list.push({
      id: "flight-out",
      title: `Vuelo de regreso · ${departureFlight}`,
      start: departure,
      end: new Date(departure.getTime() + 180 * 60000),
      location: "Aeropuerto Internacional de Cancún (CUN)",
      details: "Check-in sugerido 3 h antes. Documento: pasaporte vigente.",
      kind: "flight",
    });

    return list.sort((a, b) => a.start.getTime() - b.start.getTime());
  }, [arrivalDate, arrivalTime, arrivalFlight, departureDate, departureTime, departureFlight, hotel, kitSize, extraDays]);

  const days = useMemo(() => {
    const start = new Date(`${arrivalDate}T00:00:00`);
    const end = new Date(`${departureDate}T00:00:00`);
    const out: Date[] = [];
    for (let d = new Date(start); d <= end && out.length < 8; d.setDate(d.getDate() + 1)) {
      out.push(new Date(d));
    }
    return out;
  }, [arrivalDate, departureDate]);

  const dayEvents = (d: Date) => events.filter((e) => iso(e.start) === iso(d));

  const addActivity = (d: Date) => {
    const key = iso(d);
    setExtraDays((prev) => (prev.includes(key) ? prev : [...prev, key]));
    setSyncMsg(`Actividad agregada el ${fmtDay(d)} con 20% OFF de miembro. Te escribimos para confirmar el horario.`);
  };

  if (!traveler) {
    return (
      <div className="lux trip-login">
        <div className="trip-login__card">
          <p className="lux-eyebrow">Mi viaje</p>
          <h1 className="trip-login__title">Tu semana en el Caribe, en un solo lugar.</h1>
          <p className="lux-hint">
            Vuelos, pickups, experiencias y tu kit WoWay Black. Sincroniza todo con el calendario de tu celular.
          </p>

          <button className="lux-btn lux-btn--light" onClick={() => setTraveler(DEMO)}>
            Continuar con Google
          </button>
          <p className="lux-hint lux-hint--xs">
            Demo funcional sin OAuth. En producción se conecta con Google Identity Services.
          </p>

          <div className="trip-login__divider"><span>o usa tu reserva</span></div>

          <div className="trip-login__row">
            <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="Código (WB-2026)" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo de la reserva" type="email" />
          </div>
          {error && <p className="lux-error">{error}</p>}
          <button
            className="lux-btn lux-btn--gold"
            onClick={() => {
              if (!code || !email.includes("@")) {
                setError("Necesitamos código de reserva y un correo válido.");
                return;
              }
              setTraveler({ ...DEMO, email });
            }}
          >
            Entrar a Mi Viaje
            <Icon name="arrow" size={16} />
          </button>
          <p className="lux-hint lux-hint--xs">Prueba con WB-2026 o WOWAYVIP.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lux trip">
      <div className="container">
        <header className="trip__head">
          <div className="trip__user">
            <span className="trip__avatar">{traveler.photo}</span>
            <span>
              <strong>{traveler.name}</strong>
              <span className="lux-hint lux-hint--xs">{traveler.email} · Póliza {traveler.policy}</span>
            </span>
          </div>
          <div className="trip__actions">
            <button className="lux-btn lux-btn--ghost" onClick={() => downloadIcs(events)}>
              📲 Sincronizar toda mi semana (.ics)
            </button>
            <button
              className="lux-btn lux-btn--ghost"
              onClick={async () => {
                const token = window.prompt("Pega el access_token de Google (scope calendar.events):");
                if (!token) return;
                const res = await syncWithGoogleCalendarAPI(events, token.trim());
                setSyncMsg(`Eventos enviados a Google Calendar: ${res.filter((r) => r.ok).length}/${res.length}.`);
              }}
            >
              Conectar Google Calendar API
            </button>
          </div>
        </header>

        {syncMsg && <p className="trip__note">{syncMsg}</p>}

        <section className="trip__flightbar">
          <label className="lux-field">
            <span>Vuelo de llegada</span>
            <div className="trip__inline">
              <input type="date" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />
              <input type="time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
              <input value={arrivalFlight} onChange={(e) => setArrivalFlight(e.target.value.toUpperCase())} placeholder="AA-1204" />
            </div>
          </label>
          <label className="lux-field">
            <span>Hotel base</span>
            <input value={hotel} onChange={(e) => setHotel(e.target.value)} />
          </label>
          <label className="lux-field">
            <span>Vuelo de regreso</span>
            <div className="trip__inline">
              <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
              <input type="time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
              <input value={departureFlight} onChange={(e) => setDepartureFlight(e.target.value.toUpperCase())} placeholder="AA-1209" />
            </div>
          </label>
        </section>

        <div className="trip__peace">
          <span>🛡️ Seguro médico & climático <strong>WoWay Safe: ACTIVO</strong></span>
          <span>🚐 Transporte privado verificado en cada actividad</span>
          <span>👕 Kit Lifestyle <strong>talla {kitSize}</strong> para entrega en hotel</span>
        </div>

        <div className="trip__calendar">
          {days.map((d) => {
            const evts = dayEvents(d);
            const isFree = evts.length === 0;
            return (
              <article className="trip__day" key={iso(d)}>
                <header className="trip__day-head">
                  <strong>{fmtDay(d)}</strong>
                  <span>{d.toLocaleDateString("es-MX", { month: "short" })}</span>
                </header>
                <div className="trip__slots">
                  {evts.map((e) => (
                    <button
                      key={e.id}
                      className={`trip__event trip__event--${e.kind}`}
                      onClick={() => setSelected(e)}
                    >
                      <span className="trip__event-time">{fmtTime(e.start)}</span>
                      <span className="trip__event-title">{e.title}</span>
                    </button>
                  ))}
                  {isFree && (
                    <button className="trip__free" onClick={() => addActivity(d)}>
                      + Agregar actividad este día · −20% miembro
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <p className="lux-hint lux-hint--xs">
          Las horas de pickup se calculan automáticamente: 4 h antes del vuelo internacional y 45 min antes de cada experiencia.
        </p>
      </div>

      {selected && (
        <div className="trip-drawer" role="dialog" aria-modal="true" aria-label={selected.title}>
          <button className="trip-drawer__backdrop" onClick={() => setSelected(null)} aria-label="Cerrar" />
          <aside className="trip-drawer__panel">
            <header>
              <span className={`tag trip__kind trip__kind--${selected.kind}`}>{selected.kind}</span>
              <button className="icon-btn" onClick={() => setSelected(null)} aria-label="Cerrar">
                <Icon name="close" size={18} />
              </button>
            </header>
            <h2 className="trip-drawer__title">{selected.title}</h2>
            <p className="lux-hint">{fmtDay(selected.start)} · {fmtTime(selected.start)} – {fmtTime(selected.end)}</p>
            <p className="trip-drawer__loc"><Icon name="pin" size={16} /> {selected.location}</p>
            <p className="trip-drawer__details">{selected.details}</p>

            <ul className="trip-drawer__check">
              <li>Pasaporte o identificación</li>
              <li>Toalla y traje de baño</li>
              <li>Protector solar biodegradable</li>
            </ul>

            <div className="trip-drawer__qr" aria-hidden="true">QR · {selected.id.toUpperCase()}</div>

            <div className="trip-drawer__actions">
              <a className="lux-btn lux-btn--gold" href={googleCalendarUrl(selected)} target="_blank" rel="noreferrer">
                + Añadir a Google Calendar
              </a>
              <a className="lux-btn lux-btn--ghost" href="https://wa.me/5219934369007" target="_blank" rel="noreferrer">
                WhatsApp Concierge
              </a>
            </div>
          </aside>
        </div>
      )}

      <div className="trip__footer">
        <Link href="/packages" className="lux-btn lux-btn--ghost">Agregar más experiencias</Link>
        <button className="lux-btn lux-btn--emerald" onClick={() => downloadIcs(events)}>
          📲 Sincronizar toda mi semana
        </button>
      </div>
    </div>
  );
}
