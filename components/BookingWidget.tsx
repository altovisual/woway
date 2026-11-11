"use client";

import { useMemo, useState } from "react";
import type { TravelPackage } from "@/content/packages";
import { packageVariants } from "@/content/package-variants";
import { useCart } from "./cart/cart-context";
import { useLang } from "./lang/LangProvider";
import { Icon } from "./Icon";

type Currency = "MXN" | "USD";
const RATE = 16.5;

const fmt = (v: number, c: Currency) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: c,
    maximumFractionDigits: 0,
  }).format(v);

export function BookingWidget({ pkg }: { pkg: TravelPackage }) {
  const { add } = useCart();
  const { t } = useLang();
  const variants = packageVariants[pkg.slug];
  const [variantId, setVariantId] = useState(variants?.[0]?.id ?? "");
  const [currency, setCurrency] = useState<Currency>("MXN");
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const min = new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10);
  const variant = variants?.find((v) => v.id === variantId);

  const unitMxn = variant ? variant.mxn : pkg.adultPrice;
  const unitUsd = variant ? variant.usd : Math.round(pkg.adultPrice / RATE);

  const totals = useMemo(() => {
    const travelers = adults + children;
    const addonsMxn = pkg.addons
      .filter((a) => selected.includes(a.id))
      .reduce((sum, a) => sum + (a.unit === "persona" ? a.price * travelers : a.price), 0);
    const totalMxn = unitMxn * adults + Math.round(pkg.childPrice * 0.6) * children + addonsMxn;
    return { totalMxn, totalUsd: Math.round(totalMxn / RATE) };
  }, [pkg, unitMxn, adults, children, selected]);

  const submit = () => {
    if (!date) {
      setError(t("Elige la fecha del servicio.", "Choose your service date."));
      return;
    }
    setError(null);
    const chosen = pkg.addons.filter((a) => selected.includes(a.id)).map((a) => a.name);
    add({
      key: `package:${pkg.slug}:${variantId}:${date}:${adults}:${children}:${selected.join("-")}`,
      type: "package",
      id: pkg.slug,
      title: pkg.name,
      subtitle: `${variant ? variant.name + " · " : ""}${adults} ${t("adulto", "adult")}${adults > 1 ? "s" : ""}${
        children ? ` · ${children} ${t("niño", "child")}${children > 1 ? "s" : ""}` : ""
      }`,
      unitPrice: totals.totalMxn,
      qty: 1,
      meta: [date ? `${t("Fecha", "Date")} ${date}` : "", ...chosen].filter(Boolean),
      gradient: pkg.gradient,
      href: `/packages/${pkg.slug}`,
    });
  };

  return (
    <aside className="booking">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="package-card__from">{t("Precio", "Price")}</span>
        <div className="currency-toggle">
          {(["MXN", "USD"] as Currency[]).map((c) => (
            <button key={c} type="button" aria-pressed={currency === c} onClick={() => setCurrency(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, lineHeight: 1 }}>
        {currency === "MXN" ? fmt(unitMxn, "MXN") : fmt(unitUsd, "USD")}
        <span style={{ fontSize: "0.75rem", fontWeight: 400, color: "var(--ink-500)" }}>
          {" "}
          {currency} {t("/ persona", "/ person")}
        </span>
      </div>

      {variants && (
        <div className="option-group">
          <span className="option-group__label">{t("Elige tu opción", "Choose your option")}</span>
          <div className="variant-list">
            {variants.map((v) => (
              <button
                key={v.id}
                type="button"
                className="variant"
                aria-pressed={variantId === v.id}
                onClick={() => setVariantId(v.id)}
              >
                <span className="variant__name">{v.name}</span>
                <span className="variant__note">{v.note}</span>
                <span className="variant__price">
                  {currency === "MXN" ? fmt(v.mxn, "MXN") : fmt(v.usd, "USD")}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="booking__field">
        <label htmlFor="service-date">{t("Fecha del servicio", "Service date")}</label>
        <input id="service-date" type="date" min={min} value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div className="booking__row">
        <div className="booking__field">
          <label>{t("Adultos", "Adults")}</label>
          <div className="stepper">
            <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} aria-label="menos">−</button>
            <span>{adults}</span>
            <button type="button" onClick={() => setAdults(Math.min(15, adults + 1))} aria-label="más">+</button>
          </div>
        </div>
        <div className="booking__field">
          <label>{t("Niños", "Children")}</label>
          <div className="stepper">
            <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} aria-label="menos">−</button>
            <span>{children}</span>
            <button type="button" onClick={() => setChildren(Math.min(10, children + 1))} aria-label="más">+</button>
          </div>
        </div>
      </div>

      <div className="booking__addons">
        <span className="option-group__label">{t("Extras", "Extras")}</span>
        {pkg.addons.map((a) => (
          <label className="addon" key={a.id}>
            <input
              type="checkbox"
              checked={selected.includes(a.id)}
              onChange={(e) =>
                setSelected((prev) => (e.target.checked ? [...prev, a.id] : prev.filter((id) => id !== a.id)))
              }
            />
            <span>
              {a.name}
              <br />
              <span style={{ color: "var(--ink-500)", fontSize: "0.78rem" }}>{a.description}</span>
            </span>
            <span className="addon__price">
              +{currency === "MXN" ? fmt(a.price, "MXN") : fmt(Math.round(a.price / RATE), "USD")}
            </span>
          </label>
        ))}
      </div>

      <div className="booking__total">
        <div className="grand">
          <span>{t("Total", "Total")}</span>
          <span>{currency === "MXN" ? fmt(totals.totalMxn, "MXN") : fmt(totals.totalUsd, "USD")}</span>
        </div>
        <div style={{ fontSize: "0.8rem", color: "var(--ink-500)" }}>
          {currency === "MXN"
            ? `≈ ${fmt(totals.totalUsd, "USD")} · ${t("tipo de cambio referencial", "reference rate")}`
            : `≈ ${fmt(totals.totalMxn, "MXN")} · ${t("se cobra en MXN", "charged in MXN")}`}
        </div>
      </div>

      {error && <p style={{ color: "#c02626", fontSize: "0.875rem" }}>{error}</p>}

      <button className="btn" type="button" onClick={submit} style={{ width: "100%" }}>
        {t("Añadir al carrito", "Add to cart")}
        <Icon name="cart" size={17} />
      </button>
      <p style={{ fontSize: "0.75rem", color: "var(--ink-500)", textAlign: "center" }}>
        {t("Pago en MXN o USD · anticipo 10%", "Pay in MXN or USD · 10% deposit")}
      </p>
    </aside>
  );
}
