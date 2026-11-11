import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { FAQ } from "@/components/FAQ";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/ui";
import { contact } from "@/content/about";
import { faq } from "@/content/home";

export const metadata: Metadata = {
  title: "Contacto — pedidos, tallas y grupos",
  description:
    "Escríbenos por WhatsApp, correo o formulario. Pedidos de tienda, cambios de talla, reservas de paquetes y regalos corporativos.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contact.eyebrow}
        title={contact.headline}
        body={contact.subhead}
        crumbs={[{ label: "Contacto" }]}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--4">
            {contact.channels.map((c) => (
              <a className="card card--hover" key={c.title} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                <span className="card__icon">
                  <Icon name={c.title.includes("WhatsApp") ? "mail" : "tag"} size={20} />
                </span>
                <h3 className="card__title" style={{ fontSize: "1.05rem" }}>
                  {c.title}
                </h3>
                <p className="card__body">{c.body}</p>
                <span className="card__link">{c.action}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="feature-split">
            <div>
              <h2 className="h2">{contact.formTitle}</h2>
              <p className="lead" style={{ marginTop: 16 }}>
                {contact.formBody}
              </p>
              <div className="stack mt-8" style={{ display: "grid", gap: 10, color: "var(--ink-600)", fontSize: "0.9375rem" }}>
                {contact.hours.map((h) => (
                  <div key={h.label} style={{ display: "flex", justifyContent: "space-between", maxWidth: 340 }}>
                    <span>{h.label}</span>
                    <strong style={{ color: "var(--ink-900)", fontWeight: 600 }}>{h.value}</strong>
                  </div>
                ))}
                <p style={{ display: "flex", gap: 8, alignItems: "flex-start", marginTop: 8 }}>
                  <Icon name="pin" size={18} />
                  {contact.address}
                </p>
              </div>
            </div>
            <div className="card" style={{ padding: "clamp(1.5rem, 1rem + 2vw, 2.5rem)" }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <div className="feature-split">
            <div>
              <h2 className="h2">{faq.title}</h2>
            </div>
            <FAQ items={faq.items} />
          </div>
        </div>
      </section>
    </>
  );
}
