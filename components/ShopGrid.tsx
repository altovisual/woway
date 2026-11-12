"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/content/shop";
import { collectionLabels, formatMXN } from "@/content/shop";
import { productPhotos, productTints } from "@/content/media";
import { EN_PRODUCTS } from "@/content/en-catalog";
import { useLang } from "./lang/LangProvider";

const filters = [
  { id: "todos", label: "Todo" },
  { id: "apparel", label: "Apparel" },
  { id: "accesorios", label: "Accesorios" },
  { id: "limited", label: "Edición limitada" },
  { id: "season", label: "Temporada" },
];

export function ShopGrid({ products }: { products: Product[] }) {
  const { lang } = useLang();
  const [active, setActive] = useState("todos");

  const list = useMemo(() => {
    if (active === "todos") return products;
    if (active === "limited" || active === "season") return products.filter((p) => p.collection === active);
    return products.filter((p) => p.category === active);
  }, [products, active]);

  return (
    <div>
      <div className="filter-bar">
        <div className="chips">
          {filters.map((f) => (
            <button key={f.id} className="chip" type="button" aria-pressed={active === f.id} onClick={() => setActive(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <span className="filter-count">
          {list.length} {list.length === 1 ? "pieza" : "piezas"}
        </span>
      </div>

      <div className="product-grid">
        {list.map((p) => (
          <Link key={p.slug} href={`/shop/${p.slug}`} className="product-card">
            <div className="product-card__media" style={{ background: p.gradient }}>
              {productPhotos[p.slug] && (
                <img
                  src={productPhotos[p.slug]}
                  alt={lang === "en" ? EN_PRODUCTS[p.slug]?.name ?? p.name : p.name}
                  loading="lazy"
                  style={{ filter: productTints[p.slug] }}
                />
              )}
              {p.badge && <span className="product-card__badge">{p.badge}</span>}
              <span className="product-card__mark">WoWay Black</span>
            </div>
            <div>
              <h3 className="product-card__name">{lang === "en" ? EN_PRODUCTS[p.slug]?.name ?? p.name : p.name}</h3>
              <div className="product-card__meta" style={{ marginTop: 4 }}>
                <span className="product-card__price">{formatMXN(p.price)}</span>
                <span style={{ color: "var(--ink-500)", fontSize: "0.8125rem" }}>{collectionLabels[p.collection]}</span>
              </div>
            </div>
            <p className="product-card__short">{lang === "en" ? EN_PRODUCTS[p.slug]?.short ?? p.short : p.short}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
