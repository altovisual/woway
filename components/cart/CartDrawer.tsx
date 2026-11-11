"use client";

import Link from "next/link";
import { money, useCart } from "./cart-context";
import { Icon } from "../Icon";
import { useLang } from "../lang/LangProvider";
import { enProducts, enPackages } from "@/content/i18n-data";

export function CartDrawer() {
  const { lines, isOpen, close, remove, setQty, subtotal } = useCart();
  const { lang, t } = useLang();
  if (!isOpen) return null;

  const title = (line: { type: string; id: string; title: string }) =>
    lang === "en"
      ? (line.type === "product" ? enProducts[line.id]?.name : enPackages[line.id]?.name) ?? line.title
      : line.title;

  return (
    <div className="cart-overlay" role="dialog" aria-modal="true" aria-label={t("Carrito", "Cart")}>
      <button className="cart-overlay__backdrop" aria-label={t("Cerrar carrito", "Close cart")} onClick={close} />
      <aside className="cart-drawer">
        <header className="cart-drawer__head">
          <h2 className="h3" style={{ fontSize: "1.25rem" }}>
            {t("Tu carrito", "Your cart")}
          </h2>
          <button className="icon-btn" onClick={close} aria-label={t("Cerrar", "Close")}>
            <Icon name="close" size={20} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="cart-empty">
            <p>{t("Tu carrito está vacío.", "Your cart is empty.")}</p>
            <Link href="/shop" className="btn btn--sm" onClick={close}>
              {t("Ir a la tienda", "Go to the shop")}
              <Icon name="arrow" size={15} />
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-lines">
              {lines.map((line) => (
                <li key={line.key} className="cart-line">
                  <span className="cart-line__thumb" style={{ background: line.gradient }} aria-hidden="true" />
                  <div className="cart-line__body">
                    <Link href={line.href} className="cart-line__title" onClick={close}>
                      {title(line)}
                    </Link>
                    <span className="cart-line__sub">{line.subtitle}</span>
                    {line.meta?.map((m) => (
                      <span className="cart-line__meta" key={m}>
                        {m}
                      </span>
                    ))}
                    <div className="cart-line__row">
                      <div className="qty">
                        <button onClick={() => setQty(line.key, line.qty - 1)} aria-label={t("Quitar uno", "Remove one")}>
                          −
                        </button>
                        <span>{line.qty}</span>
                        <button onClick={() => setQty(line.key, line.qty + 1)} aria-label={t("Añadir uno", "Add one")}>
                          +
                        </button>
                      </div>
                      <strong>{money(line.unitPrice * line.qty)}</strong>
                    </div>
                  </div>
                  <button className="cart-line__remove" onClick={() => remove(line.key)} aria-label={t("Eliminar", "Remove")}>
                    <Icon name="close" size={14} />
                  </button>
                </li>
              ))}
            </ul>

            <footer className="cart-drawer__foot">
              <div className="cart-total">
                <span>{t("Subtotal", "Subtotal")}</span>
                <strong>{money(subtotal)}</strong>
              </div>
              <p className="cart-note">
                {t("Envío e impuestos se calculan en el checkout.", "Shipping and taxes are calculated at checkout.")}
              </p>
              <Link href="/checkout" className="btn" style={{ width: "100%" }} onClick={close}>
                {t("Continuar al checkout", "Continue to checkout")}
                <Icon name="arrow" size={16} className="btn__arrow" />
              </Link>
              <button className="link-arrow" style={{ marginTop: 12 }} onClick={close}>
                {t("Seguir comprando", "Keep shopping")}
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

export function CartButton() {
  const { count, open } = useCart();
  const { t } = useLang();
  return (
    <button className="cart-btn" onClick={open} aria-label={t(`Carrito, ${count} artículos`, `Cart, ${count} items`)}>
      <Icon name="cart" size={20} />
      {count > 0 && <span className="cart-btn__count">{count}</span>}
    </button>
  );
}
