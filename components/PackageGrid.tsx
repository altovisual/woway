"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { TravelPackage } from "@/content/packages";
import { packageCategories } from "@/content/packages";
import { packagePhotos } from "@/content/media";
import { Icon } from "./Icon";

function mxn(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function PackageGrid({ packages }: { packages: TravelPackage[] }) {
  const [active, setActive] = useState<string>("todos");

  const list = useMemo(
    () => (active === "todos" ? packages : packages.filter((p) => p.category === active)),
    [packages, active]
  );

  return (
    <div className="pkg-layout">
      <div className="pkg-mobile-filter" role="group" aria-label="Filtrar paquetes">
        {packageCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            className="chip"
            aria-pressed={active === c.id}
            onClick={() => setActive(c.id)}
          >
            {c.label}
            <span className="chip__count">
              {c.id === "todos" ? packages.length : packages.filter((p) => p.category === c.id).length}
            </span>
          </button>
        ))}
      </div>

      <aside className="pkg-side" aria-label="Categorías de paquetes">
        <div className="pkg-side__head">Paquetes</div>
        <nav className="pkg-side__nav">
          {packageCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              className="pkg-side__item"
              aria-current={active === c.id}
              onClick={() => setActive(c.id)}
            >
              {c.label}
              <span className="pkg-side__count">
                {c.id === "todos" ? packages.length : packages.filter((p) => p.category === c.id).length}
              </span>
            </button>
          ))}
        </nav>
        <div className="pkg-side__note">
          ¿No encuentras lo que buscas? Escríbenos por WhatsApp y lo armamos contigo.
        </div>
      </aside>

      <div className="pkg-list">
        {list.map((p) => (
          <article className="pkg-row" key={p.slug}>
            <Link href={`/packages/${p.slug}`} className="pkg-row__media" aria-hidden="true" tabIndex={-1}>
              {packagePhotos[p.slug] ? (
                <img src={packagePhotos[p.slug]} alt="" loading="lazy" />
              ) : (
                <span style={{ background: p.gradient, display: "block", width: "100%", height: "100%" }} />
              )}
            </Link>

            <div className="pkg-row__body">
              <span className="pkg-row__eyebrow">{p.destination}</span>
              <h2 className="pkg-row__title">
                <Link href={`/packages/${p.slug}`}>{p.name}</Link>
              </h2>
              <p className="pkg-row__desc">{p.short}</p>

              <ul className="pkg-row__meta">
                {p.includes.slice(0, 4).map((inc) => (
                  <li key={inc}>
                    <Icon name="check" size={15} />
                    {inc}
                  </li>
                ))}
              </ul>

              <Link href={`/packages/${p.slug}`} className="pkg-row__more">
                Ver más detalles
                <Icon name="arrow" size={15} />
              </Link>
            </div>

            <div className="pkg-row__buy">
              <span className="pkg-row__tag">{p.kind === "servicio" ? "Servicio privado" : "Experiencia guiada"}</span>
              <div className="pkg-row__price">
                <span className="pkg-row__from">Desde</span>
                <strong>{mxn(p.adultPrice)}</strong>
                <span className="pkg-row__currency">MXN</span>
              </div>
              <span className="pkg-row__note">Precio por persona · impuestos incluidos</span>
              <Link href={`/packages/${p.slug}`} className="btn pkg-row__cta">
                Reservar
                <Icon name="arrow" size={16} className="btn__arrow" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
