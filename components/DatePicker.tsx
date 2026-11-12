"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./Icon";

const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const WEEK = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"];

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function parseISO(v: string) {
  if (!v) return null;
  const [y, m, d] = v.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

export function DatePicker({
  value,
  onChange,
  min,
  label,
  placeholder = "dd/mm/aaaa",
}: {
  value: string;
  onChange: (v: string) => void;
  min?: string;
  label: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(() => parseISO(value) ?? new Date());
  const box = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const days = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const startIdx = (first.getDay() + 6) % 7; // lunes primero
    const total = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = Array(startIdx).fill(null);
    for (let d = 1; d <= total; d++) cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    return cells;
  }, [cursor]);

  const minDate = parseISO(min ?? "");
  const selected = parseISO(value);
  const today = new Date();
  const shown = selected ? `${pad(selected.getDate())}/${pad(selected.getMonth() + 1)}/${selected.getFullYear()}` : "";

  const pick = (d: Date) => {
    onChange(toISO(d));
    setOpen(false);
  };

  const move = (delta: number) => {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1));
  };

  return (
    <div className="dp" ref={box}>
      <button
        type="button"
        className="dp__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={label}
      >
        <span className={shown ? "" : "dp__placeholder"}>{shown || placeholder}</span>
        <Icon name="calendar" size={17} />
      </button>

      {open && (
        <div className="dp__pop" role="dialog" aria-label={label}>
          <div className="dp__head">
            <button type="button" className="dp__nav" onClick={() => move(-1)} aria-label="Mes anterior">
              ‹
            </button>
            <span className="dp__month">
              {MONTHS[cursor.getMonth()]} de {cursor.getFullYear()}
            </span>
            <button type="button" className="dp__nav" onClick={() => move(1)} aria-label="Mes siguiente">
              ›
            </button>
          </div>

          <div className="dp__week" aria-hidden="true">
            {WEEK.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="dp__grid">
            {days.map((d, i) => {
              if (!d) return <span key={`e-${i}`} className="dp__empty" />;
              const iso = toISO(d);
              const disabled = minDate ? d < minDate : false;
              const isSelected = value === iso;
              const isToday = iso === toISO(today);
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  className={`dp__day${isSelected ? " dp__day--on" : ""}${isToday ? " dp__day--today" : ""}`}
                  onClick={() => pick(d)}
                  aria-pressed={isSelected}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          <div className="dp__foot">
            <button type="button" onClick={() => { onChange(""); setOpen(false); }}>
              Borrar
            </button>
            <button type="button" onClick={() => pick(today)}>
              Hoy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
