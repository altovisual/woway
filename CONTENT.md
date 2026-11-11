# Guía de contenido — WoWay Black

Todo lo editable está en `content/` (textos y datos) y en `app/globals.css` (estilos).
No hace falta tocar componentes para cambiar la información.

---

## 1. Marca, contacto y navegación — `content/site.ts`

```ts
export const site = {
  name: "woway",                    // wordmark del hero (se pinta con opacity baja)
  brandName: "WoWay Black",         // <title> y aria-labels
  legalName: "WoWay Black Experiences S.A. de C.V.",
  domain: "https://wowayblack.example",  // sitemap + metadataBase
  tagline, description,
  contact: { whatsapp, whatsappHref, sales, support, press, phone, address },
  social: [{ label, href }],
  ctas: { shop, packages, cart },
};
```

- **WhatsApp**: cambia `whatsappHref` (`https://wa.me/<número sin + ni espacios>`); aparece en el
  header, el footer, el detalle de producto y el checkout.
- **Menús**: `navigation[]` — cada ítem con `columns` abre el mega‑menú; `featured` es la tarjeta
  destacada de la derecha.
- **Footer**: `footerColumns[]` y `legalLinks[]`.

## 2. Productos — `content/shop.ts`

```ts
{
  slug: "camiseta-woway-classic",
  name: "Camiseta WoWay Classic",
  category: "apparel" | "accesorios",
  collection: "essentials" | "season" | "limited",
  price: 690,                  // MXN
  compareAt?: 890,             // precio tachado (opcional)
  short, description,
  details: string[],           // bullets de la ficha
  sizes?: ["S","M","L","XL"],  // si existe, el comprador debe elegir talla
  colors: [{ name, hex }],
  badge?: "Best seller",
  featured?: true,             // aparece en la home
  gradient: "linear-gradient(...)",  // placeholder visual
  material, care,
}
```

- Añadir un producto = añadir un objeto. La ruta `/shop/<slug>`, el sitemap y los filtros se
  actualizan solos.
- `featured: true` lo pone en la home (se muestran los 4 primeros).
- Para usar fotos reales, sustituye el bloque `.product-card__media` y `.pdp__media`.

## 3. Paquetes de viaje — `content/packages.ts`

```ts
{
  slug, name, tagline, destination,
  category: "aventura" | "cultura" | "naturaleza" | "premium",
  days, nights,
  adultPrice, childPrice,          // USD
  rating, reviews,
  short, description,
  includes: string[],              // "incluye" (3 primeros se ven en la tarjeta)
  highlights: string[],
  itinerary: [{ day: "Día 1", title, body }],
  addons: [{ id, name, price, unit: "persona" | "reserva", description }],
  pickupZones: string[],
  badge?, featured?,
  gradient,
}
```

- El **widget de reserva** calcula: `adultos × adultPrice + niños × childPrice + extras` y añade la
  reserva al carrito con fecha, zona y extras como metadatos.
- `destinationZones` controla las zonas disponibles por defecto.
- La conversión a MXN está en `BookingWidget.tsx` (`USD_TO_MXN = 18`).

## 4. Home — `content/home.ts`

`hero`, `destinations`, `pillars`, `statement`, `stats`, `collections`, `packagesTeaser`,
`rewardsTeaser`, `testimonials`, `faq`, `finalCta`. Cada export alimenta un bloque de la home.

## 5. Rewards — `content/rewards.ts`

- `models[]`: los tres modelos comerciales del brief (Direct Sales, Customer Rewards,
  Promotional & Brand Awareness).
- `tiers.items[]`: niveles de regalo (Bienvenida, Recurrente, VIP) con umbral y pieza.
- `strategic.items[]`: objetivos estratégicos.
- `rewardsFaq[]`.

## 6. About y contacto — `content/about.ts`

`about` (historia, filosofía, valores, sostenibilidad) y `contact` (canales, horarios, dirección,
textos del formulario).

## 7. Legal — `content/legal.ts`

Cuatro documentos con `title`, `updated`, `intro` y `sections[{ h, p[] }]`: privacidad, términos,
envíos/devoluciones y cookies. **Sustitúyelos por textos revisados por tu abogado.**

## 8. El carrito y el checkout

**Modelo de línea** (`components/cart/cart-context.tsx`):

```ts
{
  key, type: "product" | "package", id, title, subtitle,
  unitPrice,   // MXN
  qty,         // 1 en paquetes
  meta?: string[],   // fecha, zona, extras
  gradient, href
}
```

- `useCart()` expone `lines`, `count`, `subtotal`, `add`, `remove`, `setQty`, `clear`, `open`, `close`.
- Persistencia: `localStorage["woway.cart.v1"]`.
- Para vaciar el carrito en pruebas: `localStorage.clear()` en la consola.

**Checkout** (`components/CheckoutFlow.tsx`):

| Paso | Validaciones |
|---|---|
| 0 Carrito | — |
| 1 Datos | nombre, apellidos, email, teléfono |
| 2 Entrega | dirección/ciudad/CP o hotel con reserva (solo si hay merch) |
| 3 Pago | tarjeta (número, MM/AA, CVC) o PayPal/SPEI + términos |
| 4 Confirmación | número de pedido y siguientes pasos |

Promociones en el objeto `PROMOS`:

```ts
WOWAY10: 10% en todo el pedido
MERCH15: 15% solo en productos de tienda
```

**Conectar pagos reales**: dentro de `next()` en el paso 3, sustituir la generación del código por
una llamada a tu backend (Stripe PaymentIntent, Mercado Pago preference o Conekta) y, al confirmar,
enviar el pedido a tu API/webhook.

## 9. Diseño — `app/globals.css`

```css
--brand-accent: #0e8a80;     /* verde Caribe: botones, tags, foco, acentos */
--brand-deep:  #0b5f58;
--brand-soft:  #d9e9e4;
--brand-sand:  #e7d9c3;
--ink-900:     #0b0b0c;
--surface-2:   #f7f5f0;      /* hueso */
--hero-gradient: linear-gradient(180deg, #070708, #0a1c1b 38%, #0d3b38 62%, #0e8a80);
--font-display: "Archivo";
--font-body: "Inter";
```

Cambiar `--brand-accent` y `--hero-gradient` re‑tiñe todo el sitio (botones, tabs, badges, foco,
degradados de tarjetas). El tamaño del wordmark del hero está en `.hero__wordmark`.

## 10. Añadir una página

1. Crea `app/mi-ruta/page.tsx`.
2. Reutiliza `PageHero`, `SectionHead`, `Stats`, `FAQ`, `CTABand`, `Testimonials`.
3. Añade el enlace en `navigation` o `footerColumns`.
4. Añádela a `app/sitemap.ts`.

## 11. Checklist antes de publicar

- [ ] `content/site.ts`: dominio, WhatsApp, correos, dirección.
- [ ] Sustituir los 12 productos y los 6 paquetes por el catálogo real.
- [ ] Revisar precios, tallas y disponibilidad.
- [ ] Cambiar los degradados placeholder por fotografía de producto.
- [ ] Conectar pagos, pedidos y formulario.
- [ ] Revisar `content/legal.ts` con asesoría legal.
- [ ] Ajustar `--brand-*` a la identidad final y reemplazar el favicon.
- [ ] `npm run build` y probar `out/`.
