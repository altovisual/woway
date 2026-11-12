/** Utilidades de calendario: enlaces de Google, .ics y API de Google Calendar. */

export type TripEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location: string;
  details: string;
  kind: "flight" | "experience" | "merch" | "transfer" | "free";
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Formato local de Google: YYYYMMDDTHHmmss (sin Z, con ctz). */
export function toGoogleDate(d: Date) {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(
    d.getMinutes()
  )}00`;
}

/** Formato UTC para .ics: YYYYMMDDTHHmmssZ */
export function toIcsDate(d: Date) {
  return (
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")
  );
}

export function googleCalendarUrl(e: TripEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${toGoogleDate(e.start)}/${toGoogleDate(e.end)}`,
    details: e.details,
    location: e.location,
    ctz: "America/Cancun",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function icsEscape(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/** Genera un .ics completo con alarmas a 2 h y 30 min. */
export function buildIcs(events: TripEvent[], calendarName = "WoWay Black — Mi Viaje") {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WoWay Black//Trip Calendar//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${icsEscape(calendarName)}`,
    "X-WR-TIMEZONE:America/Cancun",
  ];

  for (const e of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${e.id}@wowayblack`,
      `DTSTAMP:${toIcsDate(new Date())}`,
      `DTSTART:${toIcsDate(e.start)}`,
      `DTEND:${toIcsDate(e.end)}`,
      `SUMMARY:${icsEscape(e.title)}`,
      `DESCRIPTION:${icsEscape(e.details)}`,
      `LOCATION:${icsEscape(e.location)}`,
      "BEGIN:VALARM",
      "TRIGGER:-PT2H",
      "ACTION:DISPLAY",
      `DESCRIPTION:${icsEscape(`En 2 h: ${e.title}`)}`,
      "END:VALARM",
      "BEGIN:VALARM",
      "TRIGGER:-PT30M",
      "ACTION:DISPLAY",
      `DESCRIPTION:${icsEscape(`En 30 min: ${e.title}`)}`,
      "END:VALARM",
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadIcs(events: TripEvent[], filename = "woway-mi-viaje.ics") {
  const blob = new Blob([buildIcs(events)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/**
 * Inserción real vía Google Calendar API.
 * Requiere un access_token con scope https://www.googleapis.com/auth/calendar.events
 */
export async function syncWithGoogleCalendarAPI(events: TripEvent[], accessToken: string) {
  const endpoint = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
  const results = [];

  for (const e of events) {
    const body = {
      summary: e.title,
      location: e.location,
      description: e.details,
      start: { dateTime: e.start.toISOString(), timeZone: "America/Cancun" },
      end: { dateTime: e.end.toISOString(), timeZone: "America/Cancun" },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "popup", minutes: 120 },
          { method: "popup", minutes: 30 },
        ],
      },
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    results.push({ id: e.id, ok: res.ok, status: res.status });
  }

  return results;
}
