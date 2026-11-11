"use client";

import { useState } from "react";
import type { Product } from "@/content/shop";
import { money, useCart } from "./cart/cart-context";
import { Icon } from "./Icon";

export function ProductBuy({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(
    product.sizes ? (product.sizes.includes("M") ? "M" : product.sizes[0] ?? "") : ""
  );
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    if (product.sizes && !size) {
      setError("Elige una talla.");
      return;
    }
    setError(null);
    add({
      type: "product",
      id: product.slug,
      title: product.name,
      subtitle: [size && `Talla ${size}`, color].filter(Boolean).join(" · "),
      unitPrice: product.price,
      qty,
      gradient: product.gradient,
      href: `/shop/${product.slug}`,
    });
  };

  return (
    <div style={{ display: "grid", gap: 18 }}>
      {product.sizes && (
        <div className="option-group">
          <span className="option-group__label">Talla</span>
          <div className="sizes">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                className="size-btn"
                aria-pressed={size === s}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="option-group">
        <span className="option-group__label">Color</span>
        <div className="swatches">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              className="swatch"
              style={{ background: c.hex }}
              aria-pressed={color === c.name}
              aria-label={c.name}
              title={c.name}
              onClick={() => setColor(c.name)}
            />
          ))}
          <span style={{ alignSelf: "center", color: "var(--ink-600)", fontSize: "0.875rem" }}>{color}</span>
        </div>
      </div>

      <div className="option-group">
        <span className="option-group__label">Cantidad</span>
        <div className="qty" style={{ width: "fit-content" }}>
          <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Menos">
            −
          </button>
          <span>{qty}</span>
          <button type="button" onClick={() => setQty(Math.min(10, qty + 1))} aria-label="Más">
            +
          </button>
        </div>
      </div>

      {error && <p style={{ color: "#c02626", fontSize: "0.875rem" }}>{error}</p>}

      <div className="pdp__buy">
        <button className="btn" type="button" onClick={submit}>
          Añadir al carrito · {money(product.price * qty)}
          <Icon name="cart" size={17} />
        </button>
      </div>

      <p className="cart-note" style={{ color: "var(--ink-500)", fontSize: "0.8125rem" }}>
        Envío gratis en compras superiores a $1,500 MXN · Cambio de talla gratis durante 30 días.
      </p>
    </div>
  );
}
