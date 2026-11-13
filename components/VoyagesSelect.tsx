"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./lang/LangProvider";

type Opt = { id: string; es: string; en: string };

export function VoyagesSelect({
  value,
  onChange,
  options,
  icon,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Opt[];
  icon: "globe" | "calendar";
  label: string;
}) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const box = useRef<HTMLDivElement | null>(null);
  const current = options.find((o) => o.id === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (id: string) => {
    onChange(id);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault();
      setActive(Math.max(0, options.findIndex((o) => o.id === value)));
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(options[active].id);
    }
  };

  return (
    <div className="vselect" ref={box}>
      <button
        type="button"
        className="vselect__trigger"
        onClick={() => {
          setActive(Math.max(0, options.findIndex((o) => o.id === value)));
          setOpen((o) => !o);
        }}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
      >
        {icon === "globe" ? (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3C9.5 5.6 9.5 18.4 12 21" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="5" width="18" height="16" rx="1.5" />
            <path d="M3 10h18M8 3v4M16 3v4" />
          </svg>
        )}
        <span className="vselect__value">{t(current.es, current.en)}</span>
        <svg
          className={`vselect__caret${open ? " is-open" : ""}`}
          viewBox="0 0 24 24"
          width="14"
          height="14"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul className="vselect__pop" role="listbox" aria-label={label}>
          {options.map((o, i) => (
            <li key={o.id} role="option" aria-selected={o.id === value}>
              <button
                type="button"
                className={`vselect__opt${o.id === value ? " is-on" : ""}${i === active ? " is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(o.id)}
              >
                {t(o.es, o.en)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
