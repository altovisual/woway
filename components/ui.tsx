import Link from "next/link";
import { Icon } from "./Icon";
import { RevealText } from "./RevealText";
import { CountUp } from "./CountUp";

export function SectionHead({
  eyebrow,
  title,
  body,
  center,
  actions,
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  center?: boolean;
  actions?: { label: string; href: string; variant?: "solid" | "ghost" }[];
  as?: "h1" | "h2";
}) {
  const Tag = as;
  return (
    <div className={`section-head${center ? " section-head--center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className={as === "h1" ? "h1" : "h2"}>{title}</Tag>
      {body && <p className="lead" style={{ marginTop: 16 }}>{body}</p>}
      {actions && (
        <div className={`section-head__actions${center ? " " : ""}`} style={center ? { justifyContent: "center" } : undefined}>
          {actions.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className={`btn ${a.variant === "ghost" ? "btn--ghost" : ""}`}
            >
              {a.label}
              <Icon name="arrow" size={16} className="btn__arrow" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="stats">
      {items.map((s) => (
        <div key={s.label}>
          <div className="stat__value">
            <CountUp value={s.value} />
          </div>
          <div className="stat__label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function Logos({ items }: { items: string[] }) {
  return (
    <div className="logos" aria-label="Trusted by">
      {items.map((l) => (
        <span className="logos__item" key={l}>
          {l}
        </span>
      ))}
    </div>
  );
}

export function Badges({ items }: { items: string[] }) {
  return (
    <div className="badges">
      {items.map((b) => (
        <span className="badge" key={b}>
          <Icon name="shield" size={16} />
          {b}
        </span>
      ))}
    </div>
  );
}

export function CTABand({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <div className="container">
      <div className="cta-band">
        <div className="cta-band__inner">
          <div>
            <h2 className="cta-band__title">{title}</h2>
            {body && <p className="cta-band__body">{body}</p>}
          </div>
          <div className="cta-band__actions">
            <Link href={primary.href} className="btn btn--light">
              {primary.label}
              <Icon name="arrow" size={16} className="btn__arrow" />
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="btn"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,.35)", background: "transparent" }}
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  body,
  crumbs,
  actions,
  children,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  crumbs?: { label: string; href?: string }[];
  actions?: { label: string; href: string; variant?: "solid" | "ghost" }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        {crumbs && (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span aria-hidden="true">/</span>
                {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        <div className="page-hero__inner">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <RevealText text={title} className="page-hero__title" />
          </div>
          {(body || actions) && (
            <div className="page-hero__side">
              {body && <p className="lead" style={{ margin: 0 }}>{body}</p>}
              {actions && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  {actions.map((a) => (
                    <Link
                      key={a.label}
                      href={a.href}
                      className={`btn ${a.variant === "ghost" ? "btn--ghost" : ""}`}
                    >
                      {a.label}
                      <Icon name="arrow" size={16} className="btn__arrow" />
                    </Link>
                  ))}
                </div>
              )}
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
