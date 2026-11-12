"use client";

import Link from "next/link";
import { packages } from "@/content/packages";
import { packagePhotos } from "@/content/media";
import { Icon } from "./Icon";

const mxn = (v: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(v);

const SLUGS = [
  "dancer-cruise-isla-mujeres",
  "chichen-itza-all-inclusive",
  "traslado-aeropuerto-zona-hotelera",
  "yate-jackie",
  "tulum-all-inclusive",
];

export function HeroDestinations() {
  const items = SLUGS.map((s) => packages.find((p) => p.slug === s)).filter(Boolean);

  return (
    <section className="dest-block">
      <div className="container">
        <div className="dest-block__head">
          <div>
            <p className="eyebrow">Destinos</p>
            <h2 className="h2">Dónde te llevamos.</h2>
          </div>
          <Link href="/packages" className="dest-block__all">
            Ver los 23 paquetes
            <Icon name="arrow" size={16} />
          </Link>
        </div>

        <div className="dest-rail">
          {items.map((pkg) => {
            const photo = packagePhotos[pkg!.slug];
            return (
              <Link key={pkg!.slug} href={`/packages/${pkg!.slug}`} className="dest-card">
                <div className="dest-card__media">
                  {photo && <img src={photo} alt={pkg!.name} loading="lazy" />}
                  <span className="dest-card__shade" aria-hidden="true" />
                  <span className="dest-card__place">{pkg!.destination}</span>
                </div>
                <div className="dest-card__body">
                  <h3 className="dest-card__name">{pkg!.name}</h3>
                  <span className="dest-card__price">
                    Desde {mxn(pkg!.adultPrice)}
                    <Icon name="arrow" size={15} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
