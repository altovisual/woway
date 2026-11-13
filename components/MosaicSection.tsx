"use client";

import Link from "next/link";
import { packagePhotos } from "@/content/media";
import { useLang } from "./lang/LangProvider";

type Tile = {
  slug: string;
  eyebrow: string;
  eyebrowEn: string;
  title: string;
  titleEn: string;
  href: string;
  size?: "lg";
  fallback: string;
};

const IMGS: Record<string, string> = {
  "chichen-itza-all-inclusive": "/img/mosaic/destinos.jpg",
  "traslado-aeropuerto-zona-hotelera": "/img/mosaic/traslados.jpg",
  "yate-jackie": "/img/mosaic/yates.jpg",
  "jetski-1-hora": "/img/mosaic/experiencias.jpg",
  "black-pass": "/img/mosaic/concierge.jpg",
};
const TILES: Tile[] = [
  {
    slug: "chichen-itza-all-inclusive",
    eyebrow: "Destinos",
    eyebrowEn: "Destinations",
    title: "Acceso sin filas",
    titleEn: "Unparalleled access",
    href: "/packages?c=tours",
    size: "lg",
    fallback: "/img/catalog/chichen-itza-all-inclusive.jpg",
  },
  {
    slug: "traslado-aeropuerto-zona-hotelera",
    eyebrow: "Traslados",
    eyebrowEn: "Transfers",
    title: "Llegas y ya está resuelto",
    titleEn: "Welcome home",
    href: "/packages?c=traslados",
    fallback: "/img/catalog/traslado-aeropuerto-zona-hotelera.jpg",
  },
  {
    slug: "yate-jackie",
    eyebrow: "Yates",
    eyebrowEn: "Yachts",
    title: "El mar, en privado",
    titleEn: "Our yachts",
    href: "/packages?c=mar",
    fallback: "/img/catalog/yate-jackie.jpg",
  },
  {
    slug: "jetski-1-hora",
    eyebrow: "Experiencias",
    eyebrowEn: "Experiences",
    title: "Diseñado para ti",
    titleEn: "Inspired for you",
    href: "/packages?c=mar",
    fallback: "/img/catalog/jetski-1-hora.jpg",
  },
  {
    slug: "black-pass",
    eyebrow: "Concierge",
    eyebrowEn: "Concierge",
    title: "Todo en un WhatsApp",
    titleEn: "One thread, everything handled",
    href: "/packages/black-pass",
    fallback: "/img/catalog/black-pass.jpg",
  },
];

export function MosaicSection() {
  const { t } = useLang();

  return (
    <section className="section section--tight">
      <div className="container">
        <div className="mosaic">
          {TILES.map((tile) => (
            <Link
              key={tile.slug}
              href={tile.href}
              className={`mosaic__tile${tile.size === "lg" ? " mosaic__tile--lg" : ""}`}
            >
              <img src={IMGS[tile.slug] ?? tile.fallback} alt="" loading="lazy" />
              <span className="mosaic__shade" aria-hidden="true" />
              <span className="mosaic__body">
                <span className="mosaic__eyebrow">{t(tile.eyebrow, tile.eyebrowEn)}</span>
                <span className="mosaic__title">{t(tile.title, tile.titleEn)}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
