import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingWidget } from "@/components/BookingWidget";
import { Icon } from "@/components/Icon";
import { getPackage, packages } from "@/content/packages";
import { packagePhotos } from "@/content/media";
import { formatMXN } from "@/content/shop";
import { packageCopy } from "@/content/packages-copy";

type Params = { slug: string };

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return { title: "Paquete no encontrado" };
  return { title: `${pkg.name} — ${pkg.destination} | WoWay Black`, description: pkg.short };
}

export default async function PackagePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const related = packages.filter((p) => p.slug !== pkg.slug && p.category === pkg.category).slice(0, 3);
  const copy = packageCopy[pkg.slug];

  return (
    <>
      <section className="package-hero" style={{ background: pkg.gradient }}>
        <div className="hero__bg" aria-hidden="true">
          {packagePhotos[pkg.slug] && <img src={packagePhotos[pkg.slug]} alt="" />}
        </div>
        <div className="container">
          <nav className="breadcrumbs" aria-label="Ruta" style={{ color: "rgba(255,255,255,.7)" }}>
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link href="/packages">Paquetes</Link>
            <span aria-hidden="true">/</span>
            <span>{pkg.name}</span>
          </nav>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", color: "#fff" }}>
            <span className="tag" style={{ background: "rgba(255,255,255,.16)", color: "#fff" }}>
              {pkg.destination}
            </span>
            {pkg.badge && (
              <span className="tag" style={{ background: "#fff", color: "var(--ink-900)" }}>
                {pkg.badge}
              </span>
            )}
          </div>
          <h1 className="page-hero__title" style={{ color: "#fff", marginTop: 16, maxWidth: "18ch" }}>
            {pkg.name}
          </h1>
          <p style={{ color: "rgba(255,255,255,.82)", maxWidth: "52ch", marginTop: 14, fontSize: "1.05rem" }}>
            {pkg.short}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="pdp" style={{ alignItems: "start" }}>
            <div style={{ display: "grid", gap: 32 }}>
              {copy && (
                <div>
                  <h2 className="h3" style={{ marginBottom: 14 }}>
                    Sobre esta experiencia
                  </h2>
                  <div className="post-body">
                    {copy.map((par) => (
                      <p key={par.slice(0, 24)}>{par}</p>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2 className="h3" style={{ marginBottom: 14 }}>
                  Qué incluye
                </h2>
                <ul className="detail-list">
                  {pkg.includes.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="h3" style={{ marginBottom: 14 }}>
                  Lo mejor
                </h2>
                <div className="badges">
                  {pkg.highlights.map((h) => (
                    <span className="badge" key={h}>
                      <Icon name="pin" size={15} />
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="notice">
                <strong style={{ display: "block", marginBottom: 6 }}>Antes de reservar</strong>
                Precio en pesos mexicanos (MXN). El total se calcula en el checkout según viajeros y extras. Anticipo del
                10% para apartar; el saldo se cubre el día del servicio. Reembolso completo si el proveedor cancela; por
                mal clima se reprograma.
              </div>
            </div>

            <BookingWidget pkg={pkg} />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--surface">
          <div className="container">
            <div className="split-head">
              <h2 className="h2">También te puede interesar</h2>
              <Link href="/packages" className="link-arrow">
                Ver todos
                <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="package-grid">
              {related.map((p) => (
                <article className="package-card" key={p.slug}>
                  <div className="package-card__media" style={{ background: p.gradient }}>
                    {packagePhotos[p.slug] && <img src={packagePhotos[p.slug]} alt={p.name} loading="lazy" />}
                    <span className="package-card__place">{p.destination}</span>
                    <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>{p.name}</strong>
                  </div>
                  <div className="package-card__body">
                    <div className="package-card__foot">
                      <div>
                        <span className="package-card__from">Precio</span>
                        <span className="package-card__price">{formatMXN(p.adultPrice)} MXN</span>
                      </div>
                      <Link href={`/packages/${p.slug}`} className="btn btn--sm">
                        Ver
                        <Icon name="arrow" size={15} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
