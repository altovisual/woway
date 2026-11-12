"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { FAQ } from "@/components/FAQ";
import { Testimonials } from "@/components/Testimonials";
import { Marquee } from "@/components/Marquee";
import { HeroDestinations } from "@/components/HeroDestinations";
import { RevealText } from "@/components/RevealText";
import { HomeSearchBar } from "@/components/HomeSearchBar";
import { CTABand, SectionHead, Stats } from "@/components/ui";
import { useLang } from "@/components/lang/LangProvider";
import { heroPhoto, packagePhotos, partnerLogos, productPhotos, productTints } from "@/content/media";
import { enProducts } from "@/content/i18n-data";
import { collections, destinations, faq, finalCta, hero, packagesTeaser, pillars, rewardsTeaser, statement, stats, testimonials } from "@/content/home";
import { formatMXN, products } from "@/content/shop";
import { packages } from "@/content/packages";
import { site } from "@/content/site";

const PILLAR_ICONS: Record<string, string> = {
  "Traslados privados": "/icons/woway_icon_14_cancun.svg",
  "Tours y cultura": "/icons/woway_icon_11_cultura.svg",
  "Mar y yates": "/icons/woway_icon_12_naturaleza.svg",
  Concierge: "/icons/woway_icon_24_we_handle_everything.svg",
};

const PILLAR_EN: Record<string, [string, string]> = {
  "Traslados privados": ["Private transfers", "Airport, hotel and city in your own vehicle with a bilingual driver. Sedan, SUV or Sprinter for larger groups."],
  "Tours y cultura": ["Tours & culture", "Chichén Itzá, Tulum and cenotes with a certified guide, tickets and lunch included."],
  "Mar y yates": ["Sea & yachts", "Catamarans, jet skis and private yachts with crew, snorkel and an open bar on board."],
  Concierge: ["Concierge", "One WhatsApp thread to change dates, add extras or fix an issue the same day."],
};

const TIER_EN: Record<string, [string, string, string]> = {
  Bienvenida: ["Welcome", "Any booking", "Sticker pack + Trucker cap"],
  Recurrente: ["Returning", "Second booking or $2,500 MXN a year", "Classic tee + canvas tote"],
  VIP: ["VIP", "Signature or three trips or more", "Numbered Black Edition cap + full pack"],
};

const FAQ_EN = [
  { q: "Who makes WoWay Black products?", a: "We design in Cancún and produce with workshops in the peninsula and Mexico City. Every piece is approved as a physical sample before the run starts." },
  { q: "Can I buy merch without booking a package?", a: "Yes. The shop works independently: pick size and colour, pay online and we ship across Mexico and the US." },
  { q: "How does the merch included in packages work?", a: "Depending on the package and the campaign, merch is delivered at the hotel on arrival or during the first experience." },
  { q: "Do packages include flights?", a: "No. Packages include private transport, experiences and the meals listed." },
  { q: "Can I book for a group or a company?", a: "Yes. We work with groups from 8 people and corporate gifts with your own logo." },
];

export default function HomePage() {
  const { lang, t } = useLang();
  const en = lang === "en";
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const top = packages.filter((p) => p.featured).slice(0, 3);

  const pName = (slug: string, fallback: string) => (en ? enProducts[slug]?.name ?? fallback : fallback);
  const pShort = (slug: string, fallback: string) => (en ? enProducts[slug]?.short ?? fallback : fallback);

  return (
    <>
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <img src={heroPhoto} alt="" />
        </div>
        <div className="hero__wordmark" aria-hidden="true">
          <img src="/brand/woway_logotipo.svg" alt="" />
        </div>
        <div className="container hero__content">
          <p className="eyebrow" style={{ margin: 0 }}>
            {t(hero.eyebrow, "Private experiences · Cancún")}
          </p>
          <RevealText text={t(hero.headline, "Cancún without queues, shared shuttles or surprises.")} className="hero__title" />
          <p className="hero__sub">
            {t(hero.subhead, "Private transfers, tours, cenotes and yachts across the Mexican Caribbean. You pick the date and the travellers; we handle the rest.")}
          </p>
          <div className="hero__actions">
            <Link href={hero.primary.href} className="btn">
              {t(hero.primary.label, "Explore packages")}
              <Icon name="arrow" size={16} className="btn__arrow" />
            </Link>
            <Link href={hero.secondary.href} className="btn btn--ghost">
              {t(hero.secondary.label, "Talk to an advisor")}
            </Link>
          </div>
          <p className="hero__note">
            {t(hero.note, "Pay in MXN or USD · 10% deposit · flexible cancellation")}
          </p>

          <HomeSearchBar />
        </div>
      </section>

      <HeroDestinations />

      <section>
        <Marquee
          items={[
            { label: "−20% reservando 14 días antes", tag: "Promo" },
            { label: "Merch oficial gratis en paquetes de 5+ noches", tag: "Regalo" },
            { label: "2ª persona −50% en tours seleccionados", tag: "Promo" },
            { label: "Traslado privado incluido en todo paquete", tag: "Incluido" },
            { label: "Cancelación flexible hasta 15 días antes", tag: "Beneficio" },
            { label: "Paga en MXN o USD sin comisión", tag: "Pago" },
            { label: "Concierge 24/7 durante toda la estancia", tag: "Servicio" },
          ]}
          variant="promos"
          label={t("Promociones vigentes", "Current promotions")}
        />
        <Marquee items={destinations.map((d) => ({ label: d }))} label={t("Destinos", "Destinations")} />
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--4">
            {pillars.map((p) => {
              const e = PILLAR_EN[p.title];
              return (
                <article className="card card--hover" key={p.title}>
                  <span className="card__icon">
                    <img src={PILLAR_ICONS[p.title] ?? "/icons/woway_icon_07_esenciales.svg"} alt="" />
                  </span>
                  <h3 className="card__title">{t(p.title, e?.[0] ?? p.title)}</h3>
                  <p className="card__body">{t(p.body, e?.[1] ?? p.body)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split-head">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <p className="eyebrow">{t(packagesTeaser.eyebrow, "Experiences")}</p>
              <h2 className="h2">{t(packagesTeaser.title, "Travel with us. Come back wearing something.")}</h2>
              <p className="lead" style={{ marginTop: 16 }}>
                {t(packagesTeaser.body, "Private transfers, tours and yacht days in Cancún, Riviera Maya and Yucatán. Pick a date, travellers and extras in the same checkout.")}
              </p>
            </div>
            <Link href={packagesTeaser.cta.href} className="link-arrow">
              {t(packagesTeaser.cta.label, "See all packages")}
              <Icon name="arrow" size={16} />
            </Link>
          </div>

          <div className="trip-grid trip-grid--home">
            {top.map((p) => (
              <Link
                key={p.slug}
                href={`/packages/${p.slug}`}
                className="trip-card"
                aria-label={`${p.name} — ver detalle y reservar`}
              >
                <div className="trip-card__media" style={{ background: p.gradient }}>
                  {packagePhotos[p.slug] && <img src={packagePhotos[p.slug]} alt={p.name} loading="lazy" />}
                  <span className="trip-card__shade" aria-hidden="true" />
                  {p.badge && <span className="trip-card__badge">{p.badge}</span>}
                  <div className="trip-card__content">
                    <span className="trip-card__place">{p.destination}</span>
                    <h3 className="trip-card__title">{p.name}</h3>
                    <p className="trip-card__short">{p.short}</p>
                    <div className="trip-card__meta">
                      <span>★ {p.rating.toFixed(1)}</span>
                      <span className="trip-card__sep" aria-hidden="true" />
                      <span style={{ textTransform: "capitalize" }}>{p.category}</span>
                    </div>
                    <div className="trip-card__foot">
                      <span className="trip-card__price">{formatMXN(p.adultPrice)} MXN</span>
                      <span className="btn btn--sm trip-card__btn">
                        {t("Reservar", "Book")}
                        <Icon name="arrow" size={15} className="btn__arrow" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="split-head">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <p className="eyebrow">{t(collections.eyebrow, "The collection")}</p>
              <h2 className="h2">{t(collections.title, "Pieces for the trip, and for after.")}</h2>
              <p className="lead" style={{ marginTop: 16 }}>
                {t(collections.body, "Three lines open all year, plus seasonal limited editions. Everything is produced in short runs.")}
              </p>
            </div>
            <Link href={collections.cta.href} className="link-arrow">
              {t(collections.cta.label, "Shop all")}
              <Icon name="arrow" size={16} />
            </Link>
          </div>

          <div className="product-grid">
            {featured.map((p) => (
              <Link key={p.slug} href={`/shop/${p.slug}`} className="product-card">
                <div className="product-card__media" style={{ background: p.gradient }}>
                  {productPhotos[p.slug] && (
                    <img src={productPhotos[p.slug]} alt={pName(p.slug, p.name)} loading="lazy" style={{ filter: productTints[p.slug] }} />
                  )}
                  {p.badge && <span className="product-card__badge">{p.badge}</span>}
                  <span className="product-card__mark">WoWay Black</span>
                </div>
                <div>
                  <h3 className="product-card__name">{pName(p.slug, p.name)}</h3>
                  <div className="product-card__meta" style={{ marginTop: 4 }}>
                    <span className="product-card__price">{formatMXN(p.price)} MXN</span>
                  </div>
                </div>
                <p className="product-card__short">{pShort(p.slug, p.short)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="feature-split">
            <div>
              <h2 className="h2" style={{ maxWidth: "18ch" }}>
                {t(statement.title, "We do not make generic merchandise.")}
              </h2>
              <p className="lead" style={{ marginTop: 20 }}>
                {t(statement.body, "We want products people use whether or not they travelled with us. That is why the fabric comes before the logo: heavy cotton, canvas, vegetable-tanned leather, steel.")}
              </p>
              <ul className="checklist mt-6">
                {statement.points.map((p) => (
                  <li key={p}>
                    <Icon name="check" size={18} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="strip">
              {products.slice(0, 4).map((p) => (
                <div className="strip__item" key={p.slug} style={{ background: p.gradient }}>
                  {productPhotos[p.slug] && <img src={productPhotos[p.slug]} alt="" loading="lazy" />}
                  {p.material}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <SectionHead
            eyebrow={t(rewardsTeaser.eyebrow, "Customer rewards")}
            title={t(rewardsTeaser.title, "Merch is also a gift.")}
            body={t(rewardsTeaser.body, "A complimentary cap on selected packages, a tee on chosen experiences, a special set for returning guests and exclusive pieces for VIPs.")}
          />
          <div className="grid grid--3">
            {rewardsTeaser.tiers.map((tier) => {
              const e = TIER_EN[tier.name];
              return (
                <div className="tier" key={tier.name}>
                  <span className="tier__name">{t(tier.name, e?.[0] ?? tier.name)}</span>
                  <span className="tier__threshold">{t(tier.threshold, e?.[1] ?? tier.threshold)}</span>
                  <span className="tier__gift">
                    <Icon name="gift" size={18} />
                    {t(tier.gift, e?.[2] ?? tier.gift)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-6">
            <Link href={rewardsTeaser.cta.href} className="btn btn--ghost">
              {t(rewardsTeaser.cta.label, "How it works")}
              <Icon name="arrow" size={16} className="btn__arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            title={t("Lo que se llevan, y lo que se ponen después.", "What they take home, and what they keep wearing.")}
            body={t("Viajeros y clientes de tienda cuentan qué pasa con el merch cuando el viaje termina.", "Travellers and shop customers on what happens to the merch once the trip is over.")}
          />
          <Testimonials
            quotes={en
              ? [
                  { text: "We booked the Isla Mujeres catamaran and the cap was in our room on day one. I wear it in Madrid now and everyone asks where WoWay is from.", author: "Lucía Ferrer", role: "Traveller", company: "Madrid", metric: { value: "1 day", label: "trip" } },
                  { text: "I bought the tee without ever travelling with them and it is the one I wear most.", author: "Diego Salas", role: "Shop customer", company: "Mexico City", metric: { value: "240 g", label: "cotton" } },
                  { text: "Checkout was the easiest part of the trip: date, adults, kids and the merch pack in one purchase.", author: "Sarah Whitmore", role: "Signature", company: "Austin", metric: { value: "4 days", label: "all included" } },
                ]
              : testimonials}
          />
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <Stats items={stats} />
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t("Cómo funciona", "How it works")}</p>
            <h2 className="h2">
              {t("Cuatro pasos, una sola compra.", "Four steps, one single purchase.")}
            </h2>
          </div>
          <div className="numbered">
            {[
              {
                n: "01",
                es: "Elige tu experiencia",
                en: "Choose your experience",
                des: "Traslado, tour, yate o paquete completo. Filtra por tipo y destino y revisa qué incluye cada uno.",
                desEn: "Transfer, tour, yacht or full package. Filter by type and destination and see what each one includes.",
              },
              {
                n: "02",
                es: "Ajusta fecha y viajeros",
                en: "Set date and travellers",
                des: "Selecciona la variante (sedán, SUV, grupo de 6), la fecha y cuántos adultos y niños viajan.",
                desEn: "Pick the variant (sedan, SUV, group of 6), the date and how many adults and children are travelling.",
              },
              {
                n: "03",
                es: "Añade extras y merch",
                en: "Add extras and merch",
                des: "Pack de drone, sesión fotográfica o una gorra y camiseta de la colección, en el mismo carrito.",
                desEn: "Drone pack, photo session or a cap and tee from the collection, in the same cart.",
              },
              {
                n: "04",
                es: "Paga en MXN o USD",
                en: "Pay in MXN or USD",
                des: "Checkout en cuatro pasos con anticipo del 10%. Recibes confirmación y coordinamos todo por WhatsApp.",
                desEn: "Four-step checkout with a 10% deposit. You get confirmation and we coordinate everything on WhatsApp.",
              },
            ].map((step) => (
              <div className="numbered__item" key={step.n}>
                <span className="numbered__num">{step.n}</span>
                <span className="numbered__title">{t(step.es, step.en)}</span>
                <p className="numbered__desc">{t(step.des, step.desEn)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="page-tail">
        <section className="section">
          <div className="container">
            <div className="feature-split">
              <div>
                <h2 className="h2" style={{ marginBottom: 24 }}>
                  {t(faq.title, "Frequently asked questions")}
                </h2>
                <p style={{ color: "var(--ink-600)", maxWidth: "40ch" }}>
                  {t("¿Falta algo? Escríbenos por WhatsApp y contestamos el mismo día.", "Something missing? Message us on WhatsApp and we answer the same day.")}
                </p>
                <a href={site.contact.whatsappHref} className="btn btn--ghost mt-6" target="_blank" rel="noreferrer">
                  {t("Escribir por WhatsApp", "Message on WhatsApp")}
                  <Icon name="arrow" size={16} className="btn__arrow" />
                </a>
              </div>
              <FAQ items={en ? FAQ_EN : faq.items} />
            </div>
          </div>
        </section>

        <section className="section section--tight">
          <CTABand
            title={t(finalCta.title, "Take home something that outlasts the holiday.")}
            body={t(finalCta.body, "Start with a tee or with a full package. Both fit in the same cart.")}
            primary={{ label: t(finalCta.primary.label, "Go to the shop"), href: finalCta.primary.href }}
            secondary={{ label: t(finalCta.secondary.label, "See packages"), href: finalCta.secondary.href }}
          />
        </section>
      </div>
    </>
  );
}
