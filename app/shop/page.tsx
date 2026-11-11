import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { ShopGrid } from "@/components/ShopGrid";
import { PageHero } from "@/components/ui";
import { products } from "@/content/shop";

export const metadata: Metadata = {
  title: "Tienda — apparel y accesorios WoWay Black",
  description:
    "Camisetas, gorras, totes, botellas y accesorios de viaje de WoWay Black. Algodón orgánico, tiradas cortas y envíos a México y EE. UU.",
};

const perks = [
  { icon: "truck", title: "Envío gratis desde $1,500", body: "2–5 días hábiles en México. Entrega en hotel si estás de viaje." },
  { icon: "tag", title: "Cambio de talla gratis", body: "30 días para cambiar sin costo, con etiqueta y sin uso." },
  { icon: "layers", title: "Tiradas cortas", body: "Producimos poco y no destruimos inventario. Lo que ves es lo que hay." },
] as const;

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Tienda"
        title="Piezas para el viaje y para después."
        body="Apparel y accesorios de producción corta, hechos en México. Lo mismo te sirven en un cenote que un martes en la ciudad."
        crumbs={[{ label: "Tienda" }]}
        actions={[
          { label: "Ver paquetes", href: "/packages", variant: "ghost" },
          { label: "Cómo funciona Rewards", href: "/rewards" },
        ]}
      />

      <section className="section">
        <div className="container">
          <ShopGrid products={products} />
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="grid grid--3">
            {perks.map((p) => (
              <div className="card card--flat" key={p.title}>
                <span className="card__icon">
                  <Icon name={p.icon as "truck"} size={20} />
                </span>
                <h3 className="card__title" style={{ fontSize: "1.05rem" }}>
                  {p.title}
                </h3>
                <p className="card__body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="cta-band">
            <div className="cta-band__inner">
              <div>
                <h2 className="cta-band__title">¿Buscas regalos para un grupo?</h2>
                <p className="cta-band__body">
                  Desde 25 piezas hacemos bordado o serigrafía con tu logo, empaque y tarjeta personalizada.
                </p>
              </div>
              <div className="cta-band__actions">
                <a className="btn btn--light" href="https://wa.me/529980000000" target="_blank" rel="noreferrer">
                  Pedir cotización
                  <Icon name="arrow" size={16} className="btn__arrow" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
