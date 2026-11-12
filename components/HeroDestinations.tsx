"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { packages } from "@/content/packages";
import { packagePhotos } from "@/content/media";

const mxn = (v: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(v);

/** Tarjetas de destino del hero: profundidad y paralaje con CSS 3D. */
const SLUGS = [
  "dancer-cruise-isla-mujeres",
  "chichen-itza-all-inclusive",
  "traslado-aeropuerto-zona-hotelera",
  "jetski-1-hora",
  "yate-jackie",
  "tulum-all-inclusive",
  "cozumel-el-cielo",
];

const LAYOUT = [
  { x: -118, y: 26, z: -140, ry: 22, scale: 0.86, delay: 0.2 },
  { x: -62, y: 8, z: -40, ry: 14, scale: 0.94, delay: 0.1 },
  { x: -18, y: -10, z: 40, ry: 6, scale: 1, delay: 0 },
  { x: 0, y: 0, z: 70, ry: 0, scale: 1.04, delay: 0.05 },
  { x: 26, y: -12, z: 40, ry: -6, scale: 1, delay: 0.15 },
  { x: 70, y: 10, z: -40, ry: -14, scale: 0.94, delay: 0.25 },
  { x: 126, y: 28, z: -140, ry: -22, scale: 0.86, delay: 0.3 },
];

export function HeroDestinations() {
  const stage = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let frame = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--px", px.toFixed(3));
        el.style.setProperty("--py", py.toFixed(3));
      });
    };
    const onLeave = () => {
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const items = SLUGS.map((s) => packages.find((p) => p.slug === s)).filter(Boolean);

  return (
    <div className="hero-dest" ref={stage}>
      <div className="hero-dest__stage">
        {items.map((pkg, i) => {
          const cfg = LAYOUT[i] ?? LAYOUT[3];
          const photo = packagePhotos[pkg!.slug];
          return (
            <Link
              key={pkg!.slug}
              href={`/packages/${pkg!.slug}`}
              className="hero-dest__card"
              style={{
                transform: `translate3d(calc(${cfg.x}px + var(--px, 0) * ${28 - ai(i)}px), calc(${cfg.y}px + var(--py, 0) * ${18 - ai(i)}px), ${cfg.z}px) rotateY(${cfg.ry}deg) scale(${cfg.scale})`,
                animationDelay: `${cfg.delay}s`,
              }}
            >
              {photo && <img src={photo} alt={pkg!.name} loading="lazy" />}
              <span className="hero-dest__shade" aria-hidden="true" />
              <span className="hero-dest__body">
                <span className="hero-dest__place">{pkg!.destination}</span>
                <strong className="hero-dest__name">{pkg!.name}</strong>
                <span className="hero-dest__price">Desde {mxn(pkg!.adultPrice)}</span>
              </span>
            </Link>
          );
        })}
      </div>
      <p className="hero-dest__note">7 destinos · traslados, tours y yates privados</p>
    </div>
  );
}

function ai(i: number) {
  return Math.abs(i - 3) * 4;
}
