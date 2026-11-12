"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

const POP_W = 300;
const POP_H = 380;

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
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [cursor, setCursor] = useState(() => parseISO(value) ?? new Date());
  const trigger = useRef<HTMLButtonElement | null>(null);
  const pop = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  const place = () => {
    const btn = trigger.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w = Math.min(POP_W, vw - 24);
    let left = r.left;
    if (left + w > vw - 12) left = Math.max(12, vw - w - 12);
    const below = vh - r.bottom;
    const top = below < POP_H && r.top > POP_H ? r.top - POP_H - 8 : r.bottom + 8;
    setPos({ top: Math.max(8, top), left });
  };

  useLayoutEffect(() => {
    if (!open) return;
    place();
    const onScroll = () => place();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (pop.current?.contains(t) || trigger.current?.contains(t)) return;
      setOpen(false);
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
    const startIdx = (first.getDay() + 6) % 7;
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
  const move = (delta: number) => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1));

  const panel = open && mounted && (
    <div
      ref={pop}
      className="dp__pop"
      role="dialog"
      aria-label={label}
      style={{ position: "fixed", top: pos.top, left: pos.left, width: Math.min(POP_W, 320) }}
    >
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
  );

  return (
    <div className="dp">
      <button
        ref={trigger}
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

      {mounted && panel ? createPortal(panel, document.body) : null}
    </div>
  );
}
