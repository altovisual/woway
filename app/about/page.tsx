import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { CTABand, PageHero, Stats } from "@/components/ui";
import { about } from "@/content/about";
import { aboutPhoto } from "@/content/media";

export const metadata: Metadata = {
  title: "Nosotros — WoWay Black",
  description:
    "WoWay Black nació como operador de experiencias en Cancún y hoy desarrolla su propia línea de apparel y accesorios. Conoce la filosofía de producto.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        title={about.headline}
        body={about.subhead}
        crumbs={[{ label: "Nosotros" }]}
        actions={[
          { label: "Ver la colección", href: "/shop" },
          { label: "Paquetes", href: "/packages", variant: "ghost" },
        ]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="about-media">
            <img src={aboutPhoto} alt="Taller de impresión textil" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Stats items={about.stats} />
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="feature-split">
            <div>
              <h2 className="h2">{about.story.title}</h2>
              <p className="lead" style={{ marginTop: 16 }}>
                {about.story.body}
              </p>
            </div>
            <div className="visual">
              <div className="visual__row">
                <span>2019</span>
                <span style={{ color: "var(--ink-500)" }}>Primera van, primer grupo</span>
              </div>
              <div className="visual__row">
                <span>2022</span>
                <span style={{ color: "var(--ink-500)" }}>Primera camiseta impresa</span>
              </div>
              <div className="visual__row">
                <span>2024</span>
                <span style={{ color: "var(--ink-500)" }}>Tienda en línea</span>
              </div>
              <div className="visual__row">
                <span>2026</span>
                <span style={{ color: "var(--ink-500)" }}>Línea completa de 24 piezas</span>
              </div>
            </div>
          </div>

          <div className="prose mt-8" style={{ maxWidth: 720 }}>
            {about.story.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="filosofia">
        <div className="container">
          <div className="feature-split">
            <div>
              <p className="eyebrow">Filosofía</p>
              <h2 className="h2">{about.philosophy.title}</h2>
              <p className="lead" style={{ marginTop: 16 }}>
                {about.philosophy.body}
              </p>
              <ul className="detail-list mt-6">
                {about.philosophy.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid--2" style={{ gap: 16 }}>
              {about.values.map((v) => (
                <article className="card" key={v.title}>
                  <h3 className="card__title" style={{ fontSize: "1rem" }}>
                    {v.title}
                  </h3>
                  <p className="card__body">{v.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--surface" id="sostenibilidad">
        <div className="container">
          <div className="feature-split">
            <div>
              <h2 className="h2">{about.sustainability.title}</h2>
              <p className="lead" style={{ marginTop: 16 }}>
                {about.sustainability.body}
              </p>
            </div>
            <ul className="detail-list" style={{ fontSize: "1rem" }}>
              {about.sustainability.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div className="cta-band__inner">
              <div>
                <h2 className="cta-band__title">{about.contactBlock.title}</h2>
                <p className="cta-band__body">{about.contactBlock.body}</p>
              </div>
              <div className="cta-band__actions">
                <Link href="/contact-us" className="btn btn--light">
                  Ir a contacto
                  <Icon name="arrow" size={16} className="btn__arrow" />
                </Link>
                <a href="https://wa.me/529980000000" className="btn" style={{ background: "transparent", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.35)" }} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
