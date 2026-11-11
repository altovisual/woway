export type NavLink = { label: string; href: string; description?: string };
export type NavColumn = { title: string; links: NavLink[] };
export type NavItem = { label: string; href: string; columns?: NavColumn[]; featured?: { eyebrow: string; title: string; body: string; href: string; cta: string } };

export const site = {
  name: "woway",
  brandName: "WoWay Black",
  legalName: "WoWay Black Experiences S.A. de C.V.",
  domain: "https://wowayblack.example",
  tagline: "We handle everything.",
  description:
    "WoWay Black: experiencias en Cancún, Riviera Maya y el Caribe mexicano, y una línea propia de apparel y accesorios de viaje para seguir usándolos mucho después de volver.",
  contact: {
    whatsapp: "+52 1 993 436 9007",
    whatsappHref: "https://wa.me/c/5219934369007",
    sales: "hola@wowayblack.example",
    support: "soporte@wowayblack.example",
    press: "prensa@wowayblack.example",
    phone: "+52 1 993 436 9007",
    address: "Av. Huayacán 12, Cancún, Quintana Roo, México",
  },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "TikTok", href: "https://www.tiktok.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
  ],
  ctas: {
    shop: { label: "Ver la colección", href: "/shop" },
    packages: { label: "Explorar paquetes", href: "/packages" },
    cart: { label: "Carrito", href: "/checkout" },
  },
};

export const navigation: NavItem[] = [
  {
    label: "Tienda",
    href: "/shop",
    columns: [
      {
        title: "Apparel",
        links: [
          { label: "Camisetas", href: "/shop?c=apparel", description: "Algodón pesado, corte relajado, estampados que aguantan el viaje." },
          { label: "Gorras", href: "/shop?c=apparel", description: "Trucker y black edition, con bordado frontal." },
          { label: "Hoodies y capas", href: "/shop?c=apparel", description: "Para las noches después de la playa." },
        ],
      },
      {
        title: "Branded accessories",
        links: [
          { label: "Artículos de viaje", href: "/shop?c=accesorios", description: "Totes, dry bags, fundas de pasaporte y botellas." },
          { label: "Uso cotidiano", href: "/shop?c=accesorios", description: "Piezas que se quedan contigo más allá de las vacaciones." },
          { label: "Ediciones especiales", href: "/shop?c=limited", description: "Series cortas y colaboraciones de temporada." },
        ],
      },
      {
        title: "Colecciones",
        links: [
          { label: "Esenciales", href: "/shop?c=essentials" },
          { label: "Temporada", href: "/shop?c=season" },
          { label: "Edición limitada", href: "/shop?c=limited" },
        ],
      },
    ],
    featured: {
      eyebrow: "Nueva colección",
      title: "Caribe Essentials",
      body: "Nueve piezas de algodón orgánico y tejidos ligeros pensadas para el calor, el mar y el regreso a casa.",
      href: "/shop",
      cta: "Ver la colección",
    },
  },
  {
    label: "Paquetes",
    href: "/packages",
    columns: [
      {
        title: "Por tipo de viaje",
        links: [
          { label: "Aventura", href: "/packages?c=aventura", description: "Cenotes, selva, snorkel y expediciones de un día." },
          { label: "Cultura", href: "/packages?c=cultura", description: "Zonas arqueológicas, gastronomía y comunidades." },
          { label: "Naturaleza", href: "/packages?c=naturaleza", description: "Arrecifes, islas y reservas." },
          { label: "Premium", href: "/packages?c=premium", description: "Privados, suites y atención personalizada." },
        ],
      },
      {
        title: "Destinos",
        links: [
          { label: "Cancún", href: "/packages?c=aventura" },
          { label: "Riviera Maya", href: "/packages?c=naturaleza" },
          { label: "Isla Mujeres", href: "/packages?c=naturaleza" },
          { label: "Tulum", href: "/packages?c=cultura" },
        ],
      },
    ],
    featured: {
      eyebrow: "Reserva completa",
      title: "Fecha, viajeros y extras",
      body: "Elige fechas, número de adultos y niños, extras y merch. El precio se calcula en línea y el pago se completa en el mismo flujo.",
      href: "/packages",
      cta: "Ver paquetes",
    },
  },
  {
    label: "Rewards",
    href: "/rewards",
  },
  {
    label: "Nosotros",
    href: "/about",
    columns: [
      {
        title: "Marca",
        links: [
          { label: "Nuestra historia", href: "/about" },
          { label: "Filosofía de producto", href: "/about#filosofia" },
          { label: "Sostenibilidad", href: "/about#sostenibilidad" },
        ],
      },
      {
        title: "Ayuda",
        links: [
          { label: "Contacto", href: "/contact-us" },
          { label: "Envíos y devoluciones", href: "/policy/terms-of-use" },
          { label: "Preguntas frecuentes", href: "/contact-us#faq" },
        ],
      },
    ],
  },
  { label: "Contacto", href: "/contact-us" },
];

export const footerColumns: NavColumn[] = [
  {
    title: "Tienda",
    links: [
      { label: "Apparel", href: "/shop?c=apparel" },
      { label: "Accesorios", href: "/shop?c=accesorios" },
      { label: "Ediciones limitadas", href: "/shop?c=limited" },
      { label: "Toda la colección", href: "/shop" },
    ],
  },
  {
    title: "Experiencias",
    links: [
      { label: "Paquetes", href: "/packages" },
      { label: "Aventura", href: "/packages?c=aventura" },
      { label: "Cultura", href: "/packages?c=cultura" },
      { label: "Premium", href: "/packages?c=premium" },
    ],
  },
  {
    title: "Programa",
    links: [
      { label: "Customer Rewards", href: "/rewards" },
      { label: "Regalos corporativos", href: "/contact-us" },
      { label: "Colaboraciones", href: "/contact-us" },
      { label: "Carrito", href: "/checkout" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { label: "Nosotros", href: "/about" },
      { label: "Contacto", href: "/contact-us" },
      { label: "WhatsApp", href: "https://wa.me/c/5219934369007" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Aviso de privacidad", href: "/policy/privacy-policy" },
  { label: "Términos y condiciones", href: "/policy/terms-of-use" },
  { label: "Cookies", href: "/policy/cookie-policy" },
  { label: "Envíos y devoluciones", href: "/policy/shipping-returns" },
];
