import type { Metadata } from "next";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { Icon } from "@/components/Icon";
import { CTABand, PageHero } from "@/components/ui";
import { models, rewardsFaq, rewardsHero, strategic, tiers } from "@/content/rewards";

export const metadata: Metadata = {
  title: "Customer Rewards — merch como beneficio",
  description:
    "Tres modelos comerciales para el merch de WoWay Black: venta directa, regalos a clientes y brand awareness. Niveles de regalo por reserva.",
};

export default function RewardsPage() {
  return (
    <>
      <PageHero
        eyebrow={rewardsHero.eyebrow}
        title={rewardsHero.title}
        body={rewardsHero.body}
        crumbs={[{ label: "Rewards" }]}
        actions={[
          { label: "Ver la tienda", href: "/shop" },
          { label: "Reservar un paquete", href: "/packages", variant: "ghost" },
        ]}
      />

      <section className="section">
        <div className="container">
          {models.map((m) => (
            <div className="model-block" key={m.id}>
              <div>
                <span className="model-block__num">{m.number}</span>
                <h2 className="h2" style={{ marginTop: 10 }}>
                  {m.title}
                </h2>
                <p className="eyebrow" style={{ marginTop: 8, marginBottom: 0 }}>
                  {m.subtitle}
                </p>
              </div>
              <div style={{ display: "grid", gap: 16 }}>
                <p className="lead" style={{ margin: 0 }}>
                  {m.body}
                </p>
                <ul className="detail-list">
                  {m.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <Link href={m.cta.href} className="link-arrow">
                  {m.cta.label}
                  <Icon name="arrow" size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--surface" id="niveles">
        <div className="container">
          <div className="section-head">
            <h2 className="h2">{tiers.title}</h2>
            <p className="lead" style={{ marginTop: 16 }}>
              {tiers.body}
            </p>
          </div>
          <div className="grid grid--3">
            {tiers.items.map((t) => (
              <div className={`tier${t.highlight ? " tier--highlight" : ""}`} key={t.name}>
                {t.highlight && <span className="tag">Más común</span>}
                <span className="tier__name">{t.name}</span>
                <span className="tier__threshold">{t.threshold}</span>
                <span className="tier__gift">
                  <Icon name="gift" size={18} />
                  {t.gift}
                </span>
                <p style={{ color: "var(--ink-600)", fontSize: "0.875rem" }}>{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h2" style={{ marginBottom: 28 }}>
            {strategic.title}
          </h2>
          <div className="grid grid--3">
            {strategic.items.map((s) => (
              <article className="card" key={s.title}>
                <h3 className="card__title" style={{ fontSize: "1.05rem" }}>
                  {s.title}
                </h3>
                <p className="card__body">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="feature-split">
            <div>
              <h2 className="h2">Preguntas sobre el programa</h2>
              <p className="lead" style={{ marginTop: 16 }}>
                Si tu caso no está aquí, escríbenos: los regalos corporativos se cotizan aparte.
              </p>
              <a href="https://wa.me/529980000000" className="btn btn--ghost mt-6" target="_blank" rel="noreferrer">
                Preguntar por WhatsApp
                <Icon name="arrow" size={16} className="btn__arrow" />
              </a>
            </div>
            <FAQ items={rewardsFaq} />
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <CTABand
          title="Reserva con merch incluido."
          body="Los paquetes de 5 días o más incluyen una pieza de la colección. Elige talla en el checkout."
          primary={{ label: "Ver paquetes", href: "/packages" }}
          secondary={{ label: "Ir a la tienda", href: "/shop" }}
        />
      </section>
    </>
  );
}
