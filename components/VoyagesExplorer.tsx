"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { packages } from "@/content/packages";
import { packagePhotos } from "@/content/media";
import { Icon } from "./Icon";
import { useLang } from "./lang/LangProvider";
import { EN_PACKAGES } from "@/content/en-catalog";
import { VoyagesSelect } from "./VoyagesSelect";

const mxn = (v: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(v);

const DESTINOS = [
  { id: "todos", es: "Todos los destinos", en: "All destinations" },
  { id: "cancun", es: "Cancún", en: "Cancún" },
  { id: "isla", es: "Isla Mujeres", en: "Isla Mujeres" },
  { id: "tulum", es: "Tulum", en: "Tulum" },
  { id: "cozumel", es: "Cozumel", en: "Cozumel" },
  { id: "yucatan", es: "Yucatán", en: "Yucatán" },
];

const PRESUPUESTOS = [
  { id: "todos", es: "Cualquier presupuesto", en: "Any budget" },
  { id: "bajo", es: "Hasta $1,000", en: "Up to $1,000" },
  { id: "medio", es: "$1,000 – $3,000", en: "$1,000 – $3,000" },
  { id: "alto", es: "Más de $3,000", en: "Over $3,000" },
];

const VISIBLE = 3;

export function VoyagesExplorer() {
  const { t, lang } = useLang();
  const rail = useRef<HTMLDivElement | null>(null);
  const [destino, setDestino] = useState("todos");
  const [presupuesto, setPresupuesto] = useState("todos");
  const [favs, setFavs] = useState<string[]>([]);

  const list = useMemo(() => {
    let out = packages.filter((p) => p.category !== "traslados" || destino === "todos");
    if (destino !== "todos") {
      out = out.filter((p) => {
        const hay = `${p.name} ${p.destination}`.toLowerCase();
        if (destino === "cancun") return hay.includes("cancún") || hay.includes("cancun");
        if (destino === "isla") return hay.includes("isla mujeres");
        if (destino === "tulum") return hay.includes("tulum");
        if (destino === "cozumel") return hay.includes("cozumel");
        return hay.includes("chich") || hay.includes("coloradas") || hay.includes("valladolid");
      });
    }
    if (presupuesto !== "todos") {
      out = out.filter((p) => {
        if (presupuesto === "bajo") return p.adultPrice < 1000;
        if (presupuesto === "medio") return p.adultPrice >= 1000 && p.adultPrice <= 3000;
        return p.adultPrice > 3000;
      });
    }
    return out.slice(0, 9);
  }, [destino, presupuesto]);

  const scroll = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const toggleFav = (slug: string) =>
    setFavs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));

  return (
    <section className="voyages">
      <div className="container">
        <h2 className="voyages__title">
          {t("Próximas salidas", "Explore upcoming departures")}
        </h2>

        <div className="voyages__controls">
          <label className="voyages__field">
            <span>{t("Destino", "Destination")}</span>
            <div className="voyages__control">
              <VoyagesSelect
                value={destino}
                onChange={setDestino}
                options={DESTINOS}
                icon="globe"
                label={t("Destino", "Destination")}
              />
            </div>
          </label>

          <label className="voyages__field">
            <span>{t("Presupuesto", "Budget")}</span>
            <div className="voyages__control">
              <VoyagesSelect
                value={presupuesto}
                onChange={setPresupuesto}
                options={PRESUPUESTOS}
                icon="calendar"
                label={t("Presupuesto", "Budget")}
              />
            </div>
          </label>

          <Link href="/packages" className="voyages__all">
            {t("Ver los 23 paquetes", "View all 23 packages")}
          </Link>
        </div>

        <div className="voyages__nav">
          <button type="button" onClick={() => scroll(-1)} aria-label={t("Anterior", "Previous")}>
            ‹
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label={t("Siguiente", "Next")}>
            ›
          </button>
        </div>

        <div className="voyages__rail" ref={rail}>
          {list.map((p) => {
            const en = EN_PACKAGES[p.slug];
            const name = lang === "en" ? en?.name ?? p.name : p.name;
            const short = lang === "en" ? en?.short ?? p.short : p.short;
            const fav = favs.includes(p.slug);
            return (
              <article className="voyage" key={p.slug}>
                <Link href={`/packages/${p.slug}`} className="voyage__media">
                  <img src={packagePhotos[p.slug]} alt={name} loading="lazy" />
                  <span
                    className={`voyage__fav${fav ? " is-on" : ""}`}
                    role="button"
                    tabIndex={0}
                    aria-pressed={fav}
                    aria-label={t("Guardar en favoritos", "Save to favourites")}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFav(p.slug);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleFav(p.slug);
                      }
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7">
                      <path d="M12 20s-7-4.4-7-9.3A4 4 0 0 1 12 7a4 4 0 0 1 7 3.7C19 15.6 12 20 12 20z" />
                    </svg>
                  </span>
                </Link>

                <div className="voyage__body">
                  <h3 className="voyage__name">
                    <Link href={`/packages/${p.slug}`}>{name}</Link>
                  </h3>
                  <p className="voyage__short">{short}</p>
                  <ul className="voyage__meta">
                    <li>
                      <Icon name="pin" size={15} />
                      {p.destination}
                    </li>
                    <li>
                      <Icon name="check" size={15} />
                      {p.category === "traslados" ? t("Traslado privado", "Private transfer") : t("Guía certificado", "Certified guide")}
                    </li>

                  </ul>
                  <div className="voyage__foot">
                    <span className="voyage__price">{mxn(p.adultPrice)} MXN</span>
                    <Link href={`/packages/${p.slug}`} className="voyage__cta">
                      {t("Ver detalle", "View detail")}
                      <Icon name="arrow" size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
          {list.length === 0 && <p className="voyages__empty">{t("No hay paquetes con ese filtro.", "No packages match that filter.")}</p>}
        </div>
      </div>
    </section>
  );
}
