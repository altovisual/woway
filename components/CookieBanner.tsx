"use client";

import { useEffect, useState } from "react";
import { useLang } from "./lang/LangProvider";

const KEY = "woway.cookie-consent.v1";

export function CookieBanner() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (next: { analytics: boolean; marketing: boolean }) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ essential: true, ...next, decidedAt: new Date().toISOString() }));
    } catch {
      /* storage unavailable */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie" role="dialog" aria-live="polite" aria-label="Aviso de cookies">
      <div className="cookie__inner">
        <div>
          <div className="cookie__title">{t("Cookies en este sitio", "Cookies on this site")}</div>
          <p className="cookie__body">
            {t("Usamos cookies esenciales para el carrito y la sesión, y cookies opcionales para entender qué páginas se usan y medir campañas. Puedes aceptarlas o rechazarlas.", "We use essential cookies for your cart and session, plus optional cookies to understand which pages are used and measure campaigns. You can accept or reject them.")}
          </p>
          {settings && (
            <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
              <label className="checkbox">
                <input type="checkbox" checked disabled /> Esenciales — siempre activas
              </label>
              <label className="checkbox">
                <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} /> Analítica —
                qué páginas y productos se consultan
              </label>
              <label className="checkbox">
                <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} /> Marketing —
                medición de campañas
              </label>
            </div>
          )}
        </div>
        <div className="cookie__actions">
          <button className="btn btn--sm" onClick={() => save({ analytics: true, marketing: true })}>
            {t("Aceptar todas", "Accept all")}
          </button>
          <button className="btn btn--sm btn--ghost" onClick={() => save({ analytics: false, marketing: false })}>
            {t("Rechazar opcionales", "Reject optional")}
          </button>
          {!settings ? (
            <button className="btn btn--sm btn--ghost" onClick={() => setSettings(true)}>
              {t("Configurar", "Settings")}
            </button>
          ) : (
            <button className="btn btn--sm btn--ghost" onClick={() => save({ analytics, marketing })}>
              {t("Guardar", "Save")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
