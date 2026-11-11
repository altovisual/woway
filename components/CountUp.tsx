"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Cuenta desde 0 hasta el número cuando entra en pantalla, conservando
 * prefijo y sufijo ("150+", "47%", "$599", "1,450").
 */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const parsed = useMemo(() => {
    const m = value.match(/^(\D*)([\d.,]+)(\D*)$/);
    if (!m) return null;
    const raw = m[2];
    return {
      prefix: m[1],
      suffix: m[3],
      target: Number(raw.replace(/[.,]/g, "")) || 0,
      grouping: /[.,]/.test(raw),
    };
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(parsed.target);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [parsed]);

  useEffect(() => {
    if (!started || !parsed) return;
    const { target } = parsed;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, parsed, duration]);

  if (!parsed) return <span ref={ref}>{value}</span>;

  const shown = parsed.grouping
    ? new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(count)
    : String(count);

  return (
    <span ref={ref} aria-label={value}>
      {parsed.prefix}
      {shown}
      {parsed.suffix}
    </span>
  );
}
