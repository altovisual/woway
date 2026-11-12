import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { PackageGrid } from "@/components/PackageGrid";
import { PageHero } from "@/components/ui";
import { packages } from "@/content/packages";

export const metadata: Metadata = {
  title: "Paquetes de viaje — Cancún, Riviera Maya y Tulum",
  description:
    "Paquetes de 3 a 7 días con hotel, traslados, experiencias y extras. Elige fecha, viajeros y merch en el mismo checkout.",
};

const trust = [
  { icon: "calendar", title: "Fechas reales", body: "Disponibilidad confirmada por hotel y guías antes de cobrar." },
  { icon: "tag", title: "Cancelación flexible", body: "Sin costo hasta 15 días antes de la llegada." },
  { icon: "gift", title: "Merch incluido", body: "Gorra o camiseta según el paquete y la campaña vigente." },
] as const;

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Experiencias"
        title="Paquetes para el Caribe mexicano."
        body="De 3 a 7 días con alojamiento, traslados y experiencias. Añade extras y merch en la misma reserva y paga en un solo checkout."
        crumbs={[{ label: "Paquetes" }]}
        actions={[
          { label: "Hablar con un asesor", href: "/contact-us", variant: "ghost" },
          { label: "Ver la tienda", href: "/shop" },
        ]}
      />

      <section className="section" id="paquetes-listado">
        <div className="container">
          <PackageGrid packages={packages} />
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="grid grid--3">
            {trust.map((t) => (
              <div className="card card--flat" key={t.title}>
                <span className="card__icon">
                  <Icon name={t.icon as "calendar"} size={20} />
                </span>
                <h3 className="card__title" style={{ fontSize: "1.05rem" }}>
                  {t.title}
                </h3>
                <p className="card__body">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
