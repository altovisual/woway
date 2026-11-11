export const rewardsHero = {
  eyebrow: "Customer rewards",
  title: "Tres formas de que el merch trabaje para la marca.",
  body: "La línea de WoWay Black no solo se vende: se regala, se usa y se ve. Los mismos productos sostienen tres modelos comerciales distintos.",
};

export const models = [
  {
    id: "direct",
    number: "01",
    title: "Direct sales",
    subtitle: "Venta directa",
    body: "Los productos están disponibles para compra individual en la tienda en línea, en el catálogo digital, por redes sociales, por WhatsApp Business y directamente durante las experiencias.",
    points: [
      "Tienda en línea con checkout completo",
      "Catálogo digital para compartir por WhatsApp",
      "Venta directa a clientes durante el viaje",
      "Fuente de ingreso independiente del turismo",
    ],
    cta: { label: "Ir a la tienda", href: "/shop" },
  },
  {
    id: "rewards",
    number: "02",
    title: "Customer rewards",
    subtitle: "Regalos y beneficios",
    body: "El merchandising se usa como obsequio estratégico. La entrega depende del valor de la compra, el tipo de experiencia, las campañas vigentes y la estrategia comercial.",
    points: [
      "Gorra de cortesía en paquetes seleccionados",
      "Camisetas de regalo en experiencias determinadas",
      "Sets especiales para clientes recurrentes",
      "Regalos de bienvenida y piezas exclusivas para VIP",
    ],
    cta: { label: "Ver niveles", href: "#niveles" },
  },
  {
    id: "awareness",
    number: "03",
    title: "Promotional & brand awareness",
    subtitle: "Marketing de marca",
    body: "Cada gorra o camiseta es un punto de contacto con potenciales clientes: se usa en la playa, se fotografía, se publica y viaja de vuelta al país de origen.",
    points: [
      "Piezas diseñadas para aparecer en fotos",
      "Presencia de marca fuera de Cancún",
      "Colaboraciones con creadores y hoteles",
      "Regalos corporativos con logo propio",
    ],
    cta: { label: "Hablemos de colaboración", href: "/contact-us" },
  },
];

export const tiers = {
  title: "Niveles de regalo",
  body: "El obsequio se define por el paquete reservado y el historial del cliente. Estos son los niveles vigentes.",
  items: [
    {
      name: "Bienvenida",
      threshold: "Cualquier reserva",
      gift: "Sticker pack + gorra Trucker",
      detail: "Se entrega en el check-in del hotel o en la primera experiencia del paquete.",
      highlight: false,
    },
    {
      name: "Recurrente",
      threshold: "Segunda reserva o compra anual superior a $2,500 MXN",
      gift: "Camiseta Classic + tote de lona",
      detail: "Se elige talla y color en el checkout; se envía al domicilio o al hotel.",
      highlight: true,
    },
    {
      name: "VIP",
      threshold: "Paquete Signature o tres viajes o más",
      gift: "Gorra Black Edition numerada + pack completo",
      detail: "Incluye tarjeta manuscrita y acceso anticipado a cada nueva colección.",
      highlight: false,
    },
  ],
};

export const strategic = {
  title: "Objetivos estratégicos",
  items: [
    { title: "Ingresos adicionales", body: "Una línea comercial que no depende de la temporada turística." },
    { title: "Reconocimiento de marca", body: "Cada pieza usada fuera de Cancún es publicidad que viaja sola." },
    { title: "Percepción de valor", body: "El merch eleva la percepción de los paquetes sin descontar precio." },
    { title: "Fidelización", body: "Regalos por recurrencia que traen al cliente de vuelta." },
    { title: "Coleccionables", body: "Ediciones numeradas que crean una serie a lo largo del tiempo." },
    { title: "Presencia fuera de Cancún", body: "La marca llega a las ciudades de origen de cada viajero." },
  ],
};

export const rewardsFaq = [
  {
    q: "¿Cómo sé qué regalo me toca?",
    a: "El checkout muestra el regalo aplicable según el paquete y tu historial. En el hotel se entrega contra el número de reserva.",
  },
  {
    q: "¿Puedo cambiar el regalo por otra talla o color?",
    a: "Sí, dentro de la disponibilidad de la colección vigente. Los cambios se gestionan en recepción o por WhatsApp.",
  },
  {
    q: "¿El merch de regalo cuenta para el programa de recurrencia?",
    a: "No. Solo cuentan las reservas y compras pagadas. Los regalos son un beneficio, no una compra acumulable.",
  },
  {
    q: "¿Hacen regalos corporativos con logo propio?",
    a: "Sí, desde 25 piezas. Trabajamos bordado o serigrafía con tu logo y empaque con tarjeta personalizada.",
  },
];
