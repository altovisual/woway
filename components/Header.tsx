"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/content/site";
import { Icon } from "./Icon";
import { CartButton } from "./cart/CartDrawer";
import { useLang } from "./lang/LangProvider";

const MEGA_ICONS = ["ledger", "shield", "layers", "spark", "tag", "globe"] as const;

const MEGA_ICON_FILES: Record<string, string> = {
  Camisetas: "01_camisetas",
  Gorras: "02_gorras",
  "Hoodies y capas": "03_hoodies_capas",
  "Artículos de viaje": "04_articulos_viaje",
  "Uso cotidiano": "05_uso_cotidiano",
  "Ediciones especiales": "06_ediciones_especiales",
  Esenciales: "07_esenciales",
  Temporada: "08_temporada",
  "Edición limitada": "09_edicion_limitada",
  Aventura: "10_aventura",
  Cultura: "11_cultura",
  Naturaleza: "12_naturaleza",
  Premium: "13_premium",
  Cancún: "14_cancun",
  "Riviera Maya": "15_riviera_maya",
  "Isla Mujeres": "16_isla_mujeres",
  Tulum: "17_tulum",
  "Nuestra historia": "18_nuestra_historia",
  "Filosofía de producto": "19_filosofia_producto",
  Sostenibilidad: "20_sostenibilidad",
  Contacto: "21_contacto",
  "Envíos y devoluciones": "22_envios_devoluciones",
  "Preguntas frecuentes": "23_preguntas_frecuentes",
  "Regalos corporativos": "24_we_handle_everything",
  Colaboraciones: "24_we_handle_everything",
  Blog: "23_preguntas_frecuentes",
  "Case studies": "24_we_handle_everything",
  "Global hiring guides": "14_cancun",
  "Help center": "23_preguntas_frecuentes",
  "About us": "18_nuestra_historia",
  Careers: "24_we_handle_everything",
  Security: "20_sostenibilidad",
  Startups: "10_aventura",
  "Mid-market": "13_premium",
  Enterprise: "13_premium",
};

function megaIcon(label: string) {
  const file = MEGA_ICON_FILES[label] ?? "24_we_handle_everything";
  return `/icons/woway_icon_${file}.svg`;
}

const NAV_EN: Record<string, string> = {
  Tienda: "Shop",
  Paquetes: "Packages",
  Rewards: "Rewards",
  Nosotros: "About",
  Contacto: "Contact",
};

export function Header({ overHero }: { overHero?: boolean }) {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const isOverHero = overHero ?? pathname === "/";
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <header
      className={["header", scrolled ? "header--scrolled" : "", isOverHero && !scrolled ? "header--overHero" : ""]
        .filter(Boolean)
        .join(" ")}
      onMouseLeave={scheduleClose}
    >
      <div className="container header__inner">
        <Link href="/" className="logo" aria-label={`${site.brandName} inicio`}>
          <img src="/brand/woway_logotipo.svg" alt="WoWay" className="logo__img logo__img--onLight" />
          <img src="/brand/woway_logotipo.svg" alt="" aria-hidden="true" className="logo__img logo__img--onDark" />
        </Link>

        <nav className="nav" aria-label="Principal">
          {navigation.map((item) =>
            item.columns ? (
              <div
                className="nav__item"
                key={item.label}
                onMouseEnter={() => {
                  cancelClose();
                  setOpenMenu(item.label);
                }}
              >
                <button
                  type="button"
                  className="nav__trigger"
                  aria-expanded={openMenu === item.label}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                >
                  {t(item.label, NAV_EN[item.label] ?? item.label)}
                  <Icon name="chevron" size={14} className="nav__chevron" />
                </button>
              </div>
            ) : (
              <Link key={item.label} href={item.href} className="nav__trigger">
                {t(item.label, NAV_EN[item.label] ?? item.label)}
              </Link>
            )
          )}
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="lang-switch"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
          >
            <span data-active={lang === "es"}>ES</span>
            <span data-active={lang === "en"}>EN</span>
          </button>
          <a href={site.contact.whatsappHref} className="header__link" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <CartButton />
          <Link className="btn btn--sm" href={site.ctas.packages.href}>
            {t("Reservar", "Book now")}
            <Icon name="arrow" size={16} className="btn__arrow" />
          </Link>
        </div>

        <div className="header__mobile-actions">
          <CartButton />
          <button
            type="button"
            className="burger"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {navigation.map((item) =>
        item.columns ? (
          <div
            key={`panel-${item.label}`}
            className="mega"
            data-open={openMenu === item.label}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="mega__body">
              <div className="mega__main">
                {item.columns.map((col) => (
                  <div className="mega__section" key={col.title}>
                    <div className="mega__section-title">{t(col.title)}</div>
                    <div className="mega__items">
                      {col.links.map((link, i) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="mega__item"
                          onClick={() => setOpenMenu(null)}
                        >
                          <span className="mega__icon">
                            <img src={megaIcon(link.label)} alt="" />
                          </span>
                          <span>
                            <span className="mega__item-title">{t(link.label)}</span>
                            {link.description && <span className="mega__item-desc">{link.description}</span>}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {item.featured && (
                <Link href={item.featured.href} className="mega__promo" onClick={() => setOpenMenu(null)}>
                  <span className="mega__promo-eyebrow">{item.featured.eyebrow}</span>
                  <strong className="mega__promo-title">{item.featured.title}</strong>
                  <span className="mega__promo-body">{item.featured.body}</span>
                  <span className="mega__promo-cta">
                    {item.featured.cta}
                    <Icon name="arrow" size={15} />
                  </span>
                  <span className="mega__promo-art" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        ) : null
      )}

      <div className="drawer" data-open={mobileOpen} aria-hidden={!mobileOpen}>
        {navigation.map((item) =>
          item.columns ? (
            <details className="drawer__group" key={`drawer-${item.label}`}>
              <summary className="drawer__summary">
                {t(item.label)}
                <Icon name="plus" size={20} />
              </summary>
              <div className="drawer__links">
                {item.columns.flatMap((col) =>
                  col.links.map((link) => (
                    <Link
                      key={`${col.title}-${link.label}`}
                      href={link.href}
                      className="drawer__link"
                      onClick={() => setMobileOpen(false)}
                    >
                      <img src={megaIcon(link.label)} alt="" className="drawer__icon" />
                      {link.label}
                    </Link>
                  ))
                )}
              </div>
            </details>
          ) : (
            <div className="drawer__group" key={`drawer-${item.label}`}>
              <Link href={item.href} className="drawer__summary" onClick={() => setMobileOpen(false)}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                  <img src={megaIcon(item.label)} alt="" className="drawer__icon" />
                  {item.label}
                </span>
              </Link>
            </div>
          )
        )}
        <div className="drawer__actions">
          <a className="btn btn--ghost" href={site.contact.whatsappHref} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <Link className="btn" href="/checkout" onClick={() => setMobileOpen(false)}>
            {t("Ir al carrito", "Go to cart")}
            <Icon name="arrow" size={16} />
          </Link>
        </div>
        <div className="drawer__actions" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <button
            type="button"
            className={lang === "es" ? "btn btn--sm" : "btn btn--sm btn--ghost"}
            onClick={() => setLang("es")}
          >
            Español
          </button>
          <button
            type="button"
            className={lang === "en" ? "btn btn--sm" : "btn btn--sm btn--ghost"}
            onClick={() => setLang("en")}
          >
            English
          </button>
        </div>
      </div>
    </header>
  );
}
