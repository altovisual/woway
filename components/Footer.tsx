"use client";

import Link from "next/link";
import { footerColumns, legalLinks, site } from "@/content/site";
import { Icon } from "./Icon";
import { useLang } from "./lang/LangProvider";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <Link href="/" className="logo" style={{ marginBottom: 12 }}>
              <img src="/brand/woway_logotipo.svg" alt="WoWay Black" className="logo__img" />
            </Link>
            <p style={{ color: "var(--ink-600)", fontSize: "0.9rem", maxWidth: "30ch" }}>
              {t(
                "Merchandise & lifestyle del Caribe mexicano. Piezas para el viaje y para después.",
                "Merchandise & lifestyle from the Mexican Caribbean. Pieces for the trip and for after."
              )}
            </p>
            <p style={{ color: "var(--ink-500)", fontSize: "0.85rem", marginTop: 12 }}>{site.contact.address}</p>
            <div className="footer__social" style={{ marginTop: 16 }}>
              {site.social.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
                  <span style={{ fontSize: 11, fontWeight: 700 }}>{s.label.slice(0, 2)}</span>
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <div className="footer__title">{t(col.title, colEn(col.title))}</div>
              <ul className="footer__links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{t(link.label, linkEn(link.label))}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <span>
            {t(
              `© 2026 ${site.legalName}. Todos los derechos reservados.`,
              `© 2026 ${site.legalName}. All rights reserved.`
            )}
          </span>
          <nav className="footer__legal" aria-label="Legal">
            {legalLinks.map((l) => (
              <Link key={l.label} href={l.href}>
                {t(l.label, legalEn(l.label))}
              </Link>
            ))}
          </nav>
          <a href={site.contact.whatsappHref} style={{ display: "inline-flex", alignItems: "center", gap: 6 }} target="_blank" rel="noreferrer">
            <Icon name="mail" size={15} />
            {site.contact.whatsapp}
          </a>
        </div>
      </div>
    </footer>
  );
}

function colEn(title: string) {
  return ({ Tienda: "Shop", Experiencias: "Experiences", Programa: "Programme", Compañía: "Company" } as Record<string, string>)[title] ?? title;
}

function linkEn(label: string) {
  const map: Record<string, string> = {
    Apparel: "Apparel",
    Accesorios: "Accessories",
    "Ediciones limitadas": "Limited editions",
    "Toda la colección": "Shop all",
    Paquetes: "Packages",
    Aventura: "Adventure",
    Cultura: "Culture",
    Premium: "Premium",
    "Customer Rewards": "Customer rewards",
    "Regalos corporativos": "Corporate gifts",
    Colaboraciones: "Collaborations",
    Carrito: "Cart",
    Nosotros: "About us",
    Contacto: "Contact",
    WhatsApp: "WhatsApp",
  };
  return map[label] ?? label;
}

function legalEn(label: string) {
  const map: Record<string, string> = {
    "Aviso de privacidad": "Privacy notice",
    "Términos y condiciones": "Terms & conditions",
    Cookies: "Cookies",
    "Envíos y devoluciones": "Shipping & returns",
  };
  return map[label] ?? label;
}
