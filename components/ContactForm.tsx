"use client";

import { useState } from "react";
import { Icon } from "./Icon";

type Values = { name: string; email: string; phone: string; topic: string; message: string };

const empty: Values = { name: "", email: "", phone: "", topic: "Pedido de tienda", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof Values, string>> = {};
    if (!values.name.trim()) next.name = "¿Cómo te llamas?";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) next.email = "Revisa el correo.";
    if (!values.message.trim()) next.message = "Cuéntanos qué necesitas.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="form__success" role="status">
        <strong style={{ display: "block", marginBottom: 4 }}>Mensaje enviado.</strong>
        Este formulario es una maqueta: no envía datos todavía. Conéctalo a tu correo, a HubSpot o a un endpoint propio en{" "}
        <code>components/ContactForm.tsx</code>.
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="field-row field-row--2">
        <div className="field">
          <label htmlFor="c-name">Nombre</label>
          <input id="c-name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} autoComplete="name" />
          {errors.name && <span className="field__error">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="c-email">Correo</label>
          <input
            id="c-email"
            type="email"
            value={values.email}
            onChange={set("email")}
            aria-invalid={!!errors.email}
            autoComplete="email"
          />
          {errors.email && <span className="field__error">{errors.email}</span>}
        </div>
      </div>

      <div className="field-row field-row--2">
        <div className="field">
          <label htmlFor="c-phone">Teléfono / WhatsApp</label>
          <input id="c-phone" value={values.phone} onChange={set("phone")} autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="c-topic">Motivo</label>
          <select id="c-topic" value={values.topic} onChange={set("topic")}>
            <option>Pedido de tienda</option>
            <option>Talla o cambio</option>
            <option>Reserva de paquete</option>
            <option>Grupo o empresa</option>
            <option>Colaboración o prensa</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="c-message">Mensaje</label>
        <textarea
          id="c-message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
          placeholder="Cuéntanos qué necesitas, fechas o número de pedido…"
        />
        {errors.message && <span className="field__error">{errors.message}</span>}
      </div>

      <button className="btn" type="submit" style={{ justifySelf: "start" }}>
        Enviar mensaje
        <Icon name="arrow" size={16} className="btn__arrow" />
      </button>
    </form>
  );
}
