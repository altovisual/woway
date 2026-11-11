"use client";

import { useState } from "react";
import { Icon } from "./Icon";

export function FAQ({
  items,
  title,
}: {
  items: { q: string; a: string }[];
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {title && <h2 className="h2" style={{ marginBottom: 32 }}>{title}</h2>}
      <div className="faq">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div className="faq__item" key={item.q} data-open={isOpen}>
              <button
                type="button"
                className="faq__summary"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <span className="faq__icon" aria-hidden="true">
                  <Icon name="plus" size={14} />
                </span>
              </button>
              <div className="faq__panel" id={`faq-panel-${i}`} role="region">
                <div>
                  <p className="faq__answer">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
