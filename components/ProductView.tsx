"use client";

import Link from "next/link";
import { Icon } from "./Icon";
import { ProductBuy } from "./ProductBuy";
import { useLang } from "./lang/LangProvider";
import { collectionLabels, formatMXN, type Product } from "@/content/shop";
import { productPhotos, productTints } from "@/content/media";
import { enProducts } from "@/content/i18n-data";
import { RevealText } from "./RevealText";
import { EN_PRODUCTS } from "@/content/en-catalog";

export function ProductView({ product, related }: { product: Product; related: Product[] }) {
  const { lang, t } = useLang();
  const en = lang === "en";
  const name = en ? enProducts[product.slug]?.name ?? product.name : product.name;
  const short = en ? enProducts[product.slug]?.short ?? product.short : product.short;

  return (
    <>
      <div className="container" style={{ paddingTop: 24 }}>
        <nav className="breadcrumbs" aria-label={t("Ruta", "Breadcrumb")}>
          <Link href="/">{t("Inicio", "Home")}</Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop">{t("Tienda", "Shop")}</Link>
          <span aria-hidden="true">/</span>
          <span>{name}</span>
        </nav>
      </div>

      <section className="section" style={{ paddingTop: 8 }}>
        <div className="container">
          <div className="pdp">
            <div>
              <div className="pdp__media" style={{ background: product.gradient }}>
                {productPhotos[product.slug] && (
                  <img src={productPhotos[product.slug]} alt={name} style={{ filter: productTints[product.slug] }} />
                )}
                {product.badge && (
                  <span className="product-card__badge">
                    {t(product.badge, product.badge === "Best seller" ? "Best seller" : product.badge === "Edición limitada" ? "Limited edition" : product.badge)}
                  </span>
                )}
                <span>WoWay Black</span>
              </div>
              <div className="pdp__thumbs">
                {product.colors.map((c, i) => (
                  <span
                    key={c.name}
                    className="pdp__thumb"
                    aria-pressed={i === 0}
                    style={{ background: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gap: 18 }}>
              <div>
                <span className="tag">{t(collectionLabels[product.collection], collectionEn(product.collection))}</span>
                <RevealText
                  text={lang === "en" ? EN_PRODUCTS[product.slug]?.name ?? name : name}
                  className="h2"
                  style={{ fontSize: "clamp(1.8rem,1.4rem+1.6vw,2.4rem)", marginTop: 12 }}
                />
                <div className="pdp__price" style={{ marginTop: 10 }}>
                  {formatMXN(product.price)}
                  {product.compareAt && <s>{formatMXN(product.compareAt)}</s>}
                  <span style={{ fontSize: "0.8rem", color: "var(--ink-500)", fontWeight: 400 }}>
                    {t("IVA incluido", "Tax included")}
                  </span>
                </div>
              </div>

              <p className="pdp__desc">{en ? short : product.description}</p>

              <ProductBuy product={product} />

              <div className="pdp__specs">
                <details className="pdp-acc" open>
                  <summary>{t("Detalles", "Details")}</summary>
                  <ul className="detail-list">
                    {product.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </details>

                <details className="pdp-acc">
                  <summary>{t("Material y cuidado", "Material & care")}</summary>
                  <p style={{ color: "var(--ink-600)", fontSize: "0.9375rem" }}>
                    {product.material}. {product.care}
                  </p>
                </details>

                <details className="pdp-acc">
                  <summary>{t("Envíos y cambios", "Shipping & exchanges")}</summary>
                  <ul className="detail-list">
                    <li>{t("Envío gratis en compras superiores a $1,500 MXN.", "Free shipping over $1,500 MXN.")}</li>
                    <li>{t("Entrega en hotel o recogida en Cancún.", "Hotel delivery or pickup in Cancún.")}</li>
                    <li>{t("Cambio de talla gratis dentro de 30 días.", "Free size exchange within 30 days.")}</li>
                  </ul>
                </details>
              </div>

              <div className="pdp__trust">
                <span>
                  <Icon name="truck" size={16} /> {t("Envío 2–5 días", "Ships in 2–5 days")}
                </span>
                <span>
                  <Icon name="tag" size={16} /> {t("Cambio de talla gratis", "Free size exchange")}
                </span>
                <span>
                  <Icon name="gift" size={16} /> {t("Empaque de regalo", "Gift packaging")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--surface">
          <div className="container">
            <div className="split-head">
              <h2 className="h2">
                {t("También en", "More in")} {product.category === "apparel" ? t("apparel", "apparel") : t("accesorios", "accessories")}
              </h2>
              <Link href="/shop" className="link-arrow">
                {t("Ver todo", "See all")}
                <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="product-grid">
              {related.map((p) => (
                <Link key={p.slug} href={`/shop/${p.slug}`} className="product-card">
                  <div className="product-card__media" style={{ background: p.gradient }}>
                    {productPhotos[p.slug] && <img src={productPhotos[p.slug]} alt="" loading="lazy" style={{ filter: productTints[p.slug] }} />}
                    <span className="product-card__mark">WoWay Black</span>
                  </div>
                  <div>
                    <h3 className="product-card__name">{en ? enProducts[p.slug]?.name ?? p.name : p.name}</h3>
                    <div className="product-card__meta" style={{ marginTop: 4 }}>
                      <span className="product-card__price">{formatMXN(p.price)}</span>
                    </div>
                  </div>
                  <p className="product-card__short">{en ? enProducts[p.slug]?.short ?? p.short : p.short}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function collectionEn(c: string) {
  return ({ essentials: "Essentials", season: "Seasonal", limited: "Limited edition" } as Record<string, string>)[c] ?? c;
}
