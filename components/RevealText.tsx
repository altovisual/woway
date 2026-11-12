"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/**
 * Revelado de titular por palabras al entrar en viewport
 * (equivalente ligero al ScrollReveal de ReactBits, sin GSAP).
 */
export function RevealText({
  text,
  className,
  delay = 0,
  style,
}: {
  text: string;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <h1
      ref={ref}
      className={`reveal ${shown ? "reveal--in" : ""} ${className ?? ""}`}
      style={style}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="reveal__word"
          style={{ transitionDelay: `${delay + i * 55}ms` }}
          aria-hidden="true"
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </h1>
  );
}
