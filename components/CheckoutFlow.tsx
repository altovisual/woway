"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { money, useCart } from "./cart/cart-context";
import { useLang } from "./lang/LangProvider";
import { Icon } from "./Icon";

const STEPS = ["Carrito", "Tus datos", "Entrega", "Pago"];

const PROMOS: Record<string, { label: string; type: "percent"; value: number; scope: "all" | "products" }> = {
  WOWAY10: { label: "10% en todo el pedido", type: "percent", value: 0.1, scope: "all" },
  MERCH15: { label: "15% solo en merch", type: "percent", value: 0.15, scope: "products" },
};

type Form = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  notes: string;
  delivery: "ship" | "pickup" | "hotel";
  address: string;
  city: string;
  zip: string;
  hotel: string;
  payment: "card" | "paypal" | "transfer";
  cardName: string;
  cardNumber: string;
  cardExp: string;
  cardCvc: string;
  terms: boolean;
};

const initialForm: Form = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "México",
  notes: "",
  delivery: "ship",
  address: "",
  city: "",
  zip: "",
  hotel: "",
  payment: "card",
  cardName: "",
  cardNumber: "",
  cardExp: "",
  cardCvc: "",
  terms: false,
};

export function CheckoutFlow() {
  const { lines, subtotal, setQty, remove, clear, ready } = useCart();
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(initialForm);
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [order, setOrder] = useState<{ code: string; total: number } | null>(null);

  const hasProducts = lines.some((l) => l.type === "product");
  const hasPackages = lines.some((l) => l.type === "package");

  const discount = useMemo(() => {
    if (!promo) return 0;
    const p = PROMOS[promo];
    if (p.scope === "all") return Math.round(subtotal * p.value);
    const merch = lines.filter((l) => l.type === "product").reduce((n, l) => n + l.unitPrice * l.qty, 0);
    return Math.round(merch * p.value);
  }, [promo, subtotal, lines]);

  const shipping = useMemo(() => {
    if (!hasProducts || form.delivery !== "ship") return 0;
    const merch = lines.filter((l) => l.type === "product").reduce((n, l) => n + l.unitPrice * l.qty, 0);
    return merch >= 1500 ? 0 : 149;
  }, [hasProducts, form.delivery, lines]);

  const total = Math.max(0, subtotal - discount + shipping);

  const set = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target instanceof HTMLInputElement && e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (PROMOS[code]) {
      setPromo(code);
      setPromoError(null);
    } else {
      setPromoError("Ese código no es válido o ya expiró.");
      setPromo(null);
    }
  };

  const validateStep1 = () => {
    const next: Record<string, string> = {};
    if (!form.firstName.trim()) next.firstName = "Escribe tu nombre.";
    if (!form.lastName.trim()) next.lastName = "Escribe tus apellidos.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = "Necesitamos un correo válido.";
    if (form.phone.replace(/\D/g, "").length < 8) next.phone = "Incluye un teléfono de contacto.";
    if (form.delivery === "ship" && hasProducts) {
      if (!form.address.trim()) next.address = "Falta la calle y número.";
      if (!form.city.trim()) next.city = "Falta la ciudad.";
      if (form.zip.replace(/\D/g, "").length < 4) next.zip = "Falta el código postal.";
    }
    if (form.delivery === "hotel" && hasProducts && !form.hotel.trim()) next.hotel = "Indica el hotel o número de reserva.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validatePayment = () => {
    const next: Record<string, string> = {};
    if (form.payment === "card") {
      if (!form.cardName.trim()) next.cardName = "Nombre del titular.";
      if (form.cardNumber.replace(/\s/g, "").length < 15) next.cardNumber = "Número de tarjeta incompleto.";
      if (!/^\d{2}\s?\/\s?\d{2}$/.test(form.cardExp)) next.cardExp = "Formato MM/AA.";
      if (form.cardCvc.length < 3) next.cardCvc = "CVC incompleto.";
    }
    if (!form.terms) next.terms = "Acepta los términos para continuar.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const next = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2) {
      if (form.delivery === "ship" && hasProducts) {
        const nextErrors: Record<string, string> = {};
        if (!form.address.trim()) nextErrors.address = "Falta la calle y número.";
        if (!form.city.trim()) nextErrors.city = "Falta la ciudad.";
        if (form.zip.replace(/\D/g, "").length < 4) nextErrors.zip = "Falta el código postal.";
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) return;
      }
      if (form.delivery === "hotel" && hasProducts && !form.hotel.trim()) {
        setErrors({ hotel: "Indica el hotel o número de reserva." });
        return;
      }
    }
    if (step === 3) {
      if (!validatePayment()) return;
      const code = `WB-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${new Date().getFullYear()}`;
      setOrder({ code, total });
      clear();
      setStep(4);
      return;
    }
    setStep((s) => Math.min(3, s + 1));
  };

  if (!ready) return null;

  if (order) {
    return (
      <div className="container">
        <div className="confirmation">
          <span className="tag tag--purple" style={{ justifySelf: "center" }}>
            Pedido confirmado
          </span>
          <h1 className="h2">Gracias, {form.firstName || "viajero"}.</h1>
          <p className="lead" style={{ marginInline: "auto" }}>
            Te enviamos la confirmación a <strong>{form.email}</strong>. Guarda tu número de pedido:
          </p>
          <div className="confirmation__code">{order.code}</div>
          <div className="confirmation__steps">
            <h3 style={{ fontSize: "1.05rem" }}>Qué pasa ahora</h3>
            <p style={{ color: "var(--ink-600)", fontSize: "0.9375rem" }}>
              1. Recibirás el comprobante y el detalle del pedido por correo en los próximos minutos.
            </p>
            <p style={{ color: "var(--ink-600)", fontSize: "0.9375rem" }}>
              2. Si tu pedido incluye un paquete, un asesor te escribirá por WhatsApp para confirmar horarios de
              recogida y datos de los viajeros.
            </p>
            <p style={{ color: "var(--ink-600)", fontSize: "0.9375rem" }}>
              3. El merch se envía en 24–48 h o se entrega en el hotel el día de llegada, según lo que elegiste.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/shop" className="btn">
              Seguir comprando
              <Icon name="arrow" size={16} className="btn__arrow" />
            </Link>
            <a href="https://wa.me/529980000000" className="btn btn--ghost" target="_blank" rel="noreferrer">
              Escribir por WhatsApp
            </a>
          </div>
          <p style={{ color: "var(--ink-500)", fontSize: "0.8125rem" }}>
            Total cobrado: <strong>{money(order.total)}</strong> · Pago simulado: este checkout no procesa cobros reales.
          </p>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container">
        <div className="checkout-empty">
          <h1 className="h2">Tu carrito está vacío</h1>
          <p className="lead">Empieza por una pieza de la colección o por un paquete de viaje.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/shop" className="btn">
              Ir a la tienda
              <Icon name="arrow" size={16} className="btn__arrow" />
            </Link>
            <Link href="/packages" className="btn btn--ghost">
              Ver paquetes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="stepper-nav" aria-label="Pasos del checkout">
        {STEPS.map((label, i) => (
          <span
            className="stepper-nav__item"
            key={label}
            data-state={i === step ? "active" : i < step ? "done" : "todo"}
          >
            <span className="stepper-nav__dot">{i < step ? "✓" : i + 1}</span>
            {label}
          </span>
        ))}
      </div>

      <div className="checkout">
        <div>
          {step === 0 && (
            <div className="checkout-form">
              <h2 className="h3">{t("Revisa tu pedido", "Review your order")}</h2>
              <div style={{ display: "grid", gap: 12 }}>
                {lines.map((line) => (
                  <div className="cart-line" key={line.key} style={{ borderBottom: "1px solid var(--line)" }}>
                    <span className="cart-line__thumb" style={{ background: line.gradient }} aria-hidden="true" />
                    <div className="cart-line__body">
                      <span className="cart-line__title">{line.title}</span>
                      <span className="cart-line__sub">{line.subtitle}</span>
                      {line.meta?.map((m) => (
                        <span className="cart-line__meta" key={m}>
                          {m}
                        </span>
                      ))}
                      <div className="cart-line__row">
                        <div className="qty">
                          <button onClick={() => setQty(line.key, line.qty - 1)} aria-label="Quitar uno">
                            −
                          </button>
                          <span>{line.qty}</span>
                          <button onClick={() => setQty(line.key, line.qty + 1)} aria-label="Añadir uno">
                            +
                          </button>
                        </div>
                        <strong>{money(line.unitPrice * line.qty)}</strong>
                      </div>
                    </div>
                    <button className="cart-line__remove" onClick={() => remove(line.key)} aria-label="Eliminar">
                      <Icon name="close" size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {hasPackages && (
                <div className="notice" style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <Icon name="calendar" size={18} />
                  <span>
                    Los paquetes se confirman con un asesor por WhatsApp. La fecha indicada queda reservada 48 horas
                    mientras se valida disponibilidad de hotel y guías.
                  </span>
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="checkout-form">
              <h2 className="h3">{t("Tus datos", "Your details")}</h2>
              <div className="field-row field-row--2">
                <div className="field">
                  <label htmlFor="firstName">Nombre</label>
                  <input id="firstName" value={form.firstName} onChange={set("firstName")} autoComplete="given-name" />
                  {errors.firstName && <span className="field__error">{errors.firstName}</span>}
                </div>
                <div className="field">
                  <label htmlFor="lastName">Apellidos</label>
                  <input id="lastName" value={form.lastName} onChange={set("lastName")} autoComplete="family-name" />
                  {errors.lastName && <span className="field__error">{errors.lastName}</span>}
                </div>
              </div>
              <div className="field-row field-row--2">
                <div className="field">
                  <label htmlFor="email">Correo electrónico</label>
                  <input id="email" type="email" value={form.email} onChange={set("email")} autoComplete="email" />
                  {errors.email && <span className="field__error">{errors.email}</span>}
                </div>
                <div className="field">
                  <label htmlFor="phone">Teléfono / WhatsApp</label>
                  <input id="phone" value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="+52 998 000 0000" />
                  {errors.phone && <span className="field__error">{errors.phone}</span>}
                </div>
              </div>
              <div className="field">
                <label htmlFor="country">País de residencia</label>
                <select id="country" value={form.country} onChange={set("country")}>
                  {["México", "Estados Unidos", "Canadá", "España", "Colombia", "Argentina", "Chile", "Otro"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="notes">Notas para el equipo (opcional)</label>
                <textarea id="notes" rows={3} value={form.notes} onChange={set("notes")} placeholder="Alergias, llegada tarde, tallas especiales…" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="checkout-form">
              <h2 className="h3">{t("Entrega", "Delivery")}</h2>
              {hasProducts ? (
                <>
                  <div className="pay-methods">
                    {[
                      { id: "ship", title: "Envío a domicilio", body: "2–5 días hábiles en México. Gratis desde $1,500 MXN." },
                      { id: "hotel", title: "Entrega en el hotel", body: "Coordinamos con recepción el día de tu llegada." },
                      { id: "pickup", title: "Recogida en Cancún", body: "Av. Huayacán 12, lunes a sábado, 10:00–18:00." },
                    ].map((opt) => (
                      <label className="pay-method" data-active={form.delivery === opt.id} key={opt.id}>
                        <input
                          type="radio"
                          name="delivery"
                          checked={form.delivery === opt.id}
                          onChange={() => setForm((f) => ({ ...f, delivery: opt.id as Form["delivery"] }))}
                        />
                        <span>
                          <strong style={{ display: "block" }}>{opt.title}</strong>
                          <span style={{ color: "var(--ink-500)", fontSize: "0.8125rem" }}>{opt.body}</span>
                        </span>
                      </label>
                    ))}
                  </div>

                  {form.delivery === "ship" && (
                    <>
                      <div className="field">
                        <label htmlFor="address">Calle y número</label>
                        <input id="address" value={form.address} onChange={set("address")} autoComplete="street-address" />
                        {errors.address && <span className="field__error">{errors.address}</span>}
                      </div>
                      <div className="field-row field-row--2">
                        <div className="field">
                          <label htmlFor="city">Ciudad</label>
                          <input id="city" value={form.city} onChange={set("city")} autoComplete="address-level2" />
                          {errors.city && <span className="field__error">{errors.city}</span>}
                        </div>
                        <div className="field">
                          <label htmlFor="zip">Código postal</label>
                          <input id="zip" value={form.zip} onChange={set("zip")} autoComplete="postal-code" />
                          {errors.zip && <span className="field__error">{errors.zip}</span>}
                        </div>
                      </div>
                    </>
                  )}

                  {form.delivery === "hotel" && (
                    <div className="field">
                      <label htmlFor="hotel">Hotel y número de reserva</label>
                      <input id="hotel" value={form.hotel} onChange={set("hotel")} placeholder="Hotel Xcaret · reserva #12345" />
                      {errors.hotel && <span className="field__error">{errors.hotel}</span>}
                    </div>
                  )}
                </>
              ) : (
                <div className="notice">
                  Tu pedido solo incluye experiencias. La recogida se coordina por WhatsApp según la zona indicada en cada
                  paquete.
                </div>
              )}

              {hasPackages && (
                <div style={{ marginTop: 8 }}>
                  <h3 style={{ fontSize: "1.05rem", marginBottom: 8 }}>Viajeros</h3>
                  <p style={{ color: "var(--ink-600)", fontSize: "0.9375rem" }}>
                    Los nombres y documentos de cada viajero se solicitan por correo después de la compra. Puedes
                    adelantarlos en la nota del paso anterior.
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="checkout-form">
              <h2 className="h3">{t("Pago", "Payment")}</h2>
              <div className="pay-methods">
                {[
                  { id: "card", title: "Tarjeta de crédito o débito", body: "Visa, Mastercard, American Express" },
                  { id: "paypal", title: "PayPal", body: "Te redirigimos para completar el pago" },
                  { id: "transfer", title: "Transferencia SPEI", body: "Recibes los datos bancarios por correo" },
                ].map((opt) => (
                  <label className="pay-method" data-active={form.payment === opt.id} key={opt.id}>
                    <input
                      type="radio"
                      name="payment"
                      checked={form.payment === opt.id}
                      onChange={() => setForm((f) => ({ ...f, payment: opt.id as Form["payment"] }))}
                    />
                    <span>
                      <strong style={{ display: "block" }}>{opt.title}</strong>
                      <span style={{ color: "var(--ink-500)", fontSize: "0.8125rem" }}>{opt.body}</span>
                    </span>
                  </label>
                ))}
              </div>

              {form.payment === "card" && (
                <>
                  <div className="field">
                    <label htmlFor="cardName">Nombre en la tarjeta</label>
                    <input id="cardName" value={form.cardName} onChange={set("cardName")} autoComplete="cc-name" />
                    {errors.cardName && <span className="field__error">{errors.cardName}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="cardNumber">Número de tarjeta</label>
                    <input
                      id="cardNumber"
                      value={form.cardNumber}
                      onChange={set("cardNumber")}
                      inputMode="numeric"
                      placeholder="4242 4242 4242 4242"
                      autoComplete="cc-number"
                    />
                    {errors.cardNumber && <span className="field__error">{errors.cardNumber}</span>}
                  </div>
                  <div className="field-row field-row--2">
                    <div className="field">
                      <label htmlFor="cardExp">Vencimiento</label>
                      <input id="cardExp" value={form.cardExp} onChange={set("cardExp")} placeholder="MM/AA" autoComplete="cc-exp" />
                      {errors.cardExp && <span className="field__error">{errors.cardExp}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="cardCvc">CVC</label>
                      <input id="cardCvc" value={form.cardCvc} onChange={set("cardCvc")} placeholder="123" autoComplete="cc-csc" />
                      {errors.cardCvc && <span className="field__error">{errors.cardCvc}</span>}
                    </div>
                  </div>
                </>
              )}

              <label className="checkbox">
                <input type="checkbox" checked={form.terms} onChange={set("terms")} />
                <span>
                  Acepto los <Link href="/policy/terms-of-use" style={{ textDecoration: "underline" }}>términos</Link> y el{" "}
                  <Link href="/policy/privacy-policy" style={{ textDecoration: "underline" }}>aviso de privacidad</Link>.
                </span>
              </label>
              {errors.terms && <span className="field__error">{errors.terms}</span>}

              <div className="notice">
                Pago de demostración: no se realiza ningún cargo. La integración real se conecta con Stripe o Mercado Pago
                en <code>components/CheckoutFlow.tsx</code>.
              </div>
            </div>
          )}

          <div className="checkout__actions">
            {step > 0 ? (
              <button className="btn btn--ghost" type="button" onClick={() => setStep((s) => s - 1)}>
                Volver
              </button>
            ) : (
              <Link className="btn btn--ghost" href="/shop">
                Seguir comprando
              </Link>
            )}
            <button className="btn" type="button" onClick={next}>
              {step === 3 ? t(`Pagar ${money(total)}`, `Pay ${money(total)}`) : t("Continuar", "Continue")}
              <Icon name="arrow" size={16} className="btn__arrow" />
            </button>
          </div>
        </div>

        <aside className="summary">
          <h2 className="h3" style={{ fontSize: "1.1rem" }}>
            Resumen
          </h2>
          {lines.map((line) => (
            <div className="summary__line" key={line.key}>
              <span className="summary__thumb" style={{ background: line.gradient }} aria-hidden="true" />
              <span>
                <span className="summary__title" style={{ display: "block" }}>
                  {line.title}
                </span>
                <span className="summary__meta">
                  {line.subtitle} · x{line.qty}
                </span>
              </span>
              <strong style={{ fontSize: "0.875rem" }}>{money(line.unitPrice * line.qty)}</strong>
            </div>
          ))}

          <div className="summary__promo">
            <input
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Código promocional"
              aria-label="Código promocional"
            />
            <button className="btn btn--sm btn--ghost" type="button" onClick={applyPromo}>
              Aplicar
            </button>
          </div>
          {promo && <span style={{ fontSize: "0.8125rem", color: "var(--brand-deep)" }}>{PROMOS[promo].label} aplicado</span>}
          {promoError && <span style={{ fontSize: "0.8125rem", color: "#c02626" }}>{promoError}</span>}

          <div className="summary__rows">
            <div>
              <span>{t("Subtotal", "Subtotal")}</span>
              <span>{money(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div>
                <span>Descuento</span>
                <span>-{money(discount)}</span>
              </div>
            )}
            <div>
              <span>{t("Envío", "Shipping")}</span>
              <span>{shipping === 0 ? "Gratis" : money(shipping)}</span>
            </div>
            <div>
              <span>Impuestos</span>
              <span>Incluidos</span>
            </div>
          </div>

          <div className="summary__total">
            <span>{t("Total", "Total")}</span>
            <strong>{money(total)}</strong>
          </div>

          <p style={{ fontSize: "0.75rem", color: "var(--ink-500)" }}>
            Precios en pesos mexicanos. Los paquetes se cobran en MXN al tipo de cambio del día.
          </p>
        </aside>
      </div>
    </div>
  );
}
