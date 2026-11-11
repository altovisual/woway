"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

export type Quote = {
  text: string;
  author: string;
  role: string;
  company?: string;
  metric?: { value: string; label: string };
};

export function Testimonials({ quotes }: { quotes: Quote[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 600), behavior: "smooth" });
  };

  return (
    <div className="quotes">
      <div className="quotes__viewport" ref={trackRef}>
        {quotes.map((q) => (
          <figure className="quote-card" key={q.author}>
            <blockquote className="quote-card__text" style={{ margin: 0 }}>
              “{q.text}”
            </blockquote>
            {q.metric && (
              <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.7rem",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {q.metric.value}
                </span>
                <span style={{ color: "var(--ink-500)", fontSize: "0.85rem" }}>{q.metric.label}</span>
              </div>
            )}
            <figcaption className="quote-card__author">
              <span className="avatar" aria-hidden="true">
                {q.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <span>
                <span className="quote-card__name" style={{ display: "block" }}>
                  {q.author}
                </span>
                <span className="quote-card__role">
                  {q.role}
                  {q.company ? ` · ${q.company}` : ""}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="quotes__controls">
        <button
          type="button"
          className="quotes__btn"
          onClick={() => scrollBy(-1)}
          disabled={atStart}
          aria-label="Previous testimonial"
        >
          <Icon name="left" size={18} />
        </button>
        <button
          type="button"
          className="quotes__btn"
          onClick={() => scrollBy(1)}
          disabled={atEnd}
          aria-label="Next testimonial"
        >
          <Icon name="right" size={18} />
        </button>
      </div>
    </div>
  );
}
