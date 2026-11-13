"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Icon } from "./Icon";
import { useLang } from "./lang/LangProvider";

export function FloatingContact() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("woway.contact.closed") === "1") setClosed(true);
    } catch {
      /* sin almacenamiento */
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hide = () => {
    setClosed(true);
    try {
      sessionStorage.setItem("woway.contact.closed", "1");
    } catch {
      /* sin almacenamiento */
    }
  };

  if (closed) return null;

  const raw = site.contact.phone.replace(/[^\d+]/g, "");

  return (
    <div className={`float-contact${visible ? " is-visible" : ""}`} role="complementary" aria-label={t("Contacto rápido", "Quick contact")}>
      <a className="float-contact__phone" href={`tel:${raw}`} aria-label={`${t("Llamar", "Call")} ${site.contact.phone}`}>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
          <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1z" />
        </svg>
        <span>{site.contact.phone}</span>
      </a>
      <span className="float-contact__divider" aria-hidden="true" />
      <a
        className="float-contact__cta"
        href={site.contact.whatsappHref}
        target="_blank"
        rel="noreferrer"
      >
        {t("Cotizar", "Inquire now")}
      </a>
      <button className="float-contact__close" type="button" onClick={hide} aria-label={t("Ocultar contacto", "Hide contact")}>
        <Icon name="close" size={14} />
      </button>
    </div>
  );
}
