/**
 * Diccionario ES → EN para textos que hoy solo existen en español.
 * Se usa como respaldo de t("texto en español") cuando no se pasa la versión inglesa.
 */
export const ES_EN: Record<string, string> = {
  // Navegación
  Tienda: "Shop",
  Paquetes: "Packages",
  Rewards: "Rewards",
  Nosotros: "About us",
  Contacto: "Contact",
  "Mi Viaje": "My Trip",
  Vuelos: "Flights",
  "Inicio": "Home",

  // Columnas de footer
  Experiencias: "Experiences",
  Programa: "Program",
  Compañía: "Company",

  // Enlaces de footer / mega menú
  Apparel: "Apparel",
  Accesorios: "Accessories",
  "Ediciones limitadas": "Limited editions",
  "Ediciones especiales": "Special editions",
  "Toda la colección": "Whole collection",
  Camisetas: "T-shirts",
  Gorras: "Caps",
  "Hoodies y capas": "Hoodies & layers",
  "Artículos de viaje": "Travel gear",
  "Uso cotidiano": "Everyday use",
  Colecciones: "Collections",
  Esenciales: "Essentials",
  Temporada: "Season",
  "Edición limitada": "Limited edition",
  Aventura: "Adventure",
  Cultura: "Culture",
  Naturaleza: "Nature",
  Premium: "Premium",
  Cancún: "Cancún",
  "Riviera Maya": "Riviera Maya",
  "Isla Mujeres": "Isla Mujeres",
  Tulum: "Tulum",
  "Customer Rewards": "Customer Rewards",
  "Regalos corporativos": "Corporate gifts",
  Colaboraciones: "Partnerships",
  Carrito: "Cart",
  WhatsApp: "WhatsApp",
  "Nuestra historia": "Our story",
  "Filosofía de producto": "Product philosophy",
  Sostenibilidad: "Sustainability",
  "Preguntas frecuentes": "FAQ",

  // Legales
  "Aviso de privacidad": "Privacy policy",
  "Términos y condiciones": "Terms & conditions",
  Cookies: "Cookies",
  "Envíos y devoluciones": "Shipping & returns",

  // Botones y etiquetas comunes
  Reservar: "Book",
  Buscar: "Search",
  "Buscar vuelos": "Search flights",
  "Ver más detalles": "See details",
  "Ver paquetes": "See packages",
  "Ver todos los paquetes": "See all packages",
  "Ver todas": "See all",
  "Ver todo": "See all",
  "Ver todos": "See all",
  "Ver la tienda": "Go to the shop",
  "Ir a la tienda": "Go to the shop",
  "Añadir al carrito": "Add to cart",
  "Hablar con un asesor": "Talk to an advisor",
  "Explorar paquetes": "Explore packages",
  "Continuar con Google": "Continue with Google",
  Desde: "From",
  Filtrar: "Filter",
  Todos: "All",
  Traslados: "Transfers",
  Tours: "Tours",
  "Mar & yates": "Sea & yachts",
  "resultados": "results",

  // Home
  "Cómo funciona": "How it works",
  Promociones: "Promotions",
  Destinos: "Destinations",
  "Ver los 23 paquetes": "See all 23 packages",
  "Servicio privado": "Private service",
  "Experiencia guiada": "Guided experience",

  // Ficha de producto
  Detalles: "Details",
  "Material y cuidado": "Material & care",
  "Envíos y cambios": "Shipping & exchanges",
  "Envío 2–5 días": "Ships in 2–5 days",
  "Cambio de talla gratis": "Free size exchange",
  "Empaque de regalo": "Gift packaging",
  Color: "Color",
  Cantidad: "Quantity",

  // Vuelos
  Origen: "Origin",
  Destino: "Destination",
  "Fecha de ida": "Departure date",
  Viajeros: "Travellers",
  Directo: "Nonstop",
  escalas: "stops",
  Total: "Total",

  // Checkout
  Checkout: "Checkout",
  Entrega: "Delivery",
  Pago: "Payment",
  Resumen: "Summary",
  "Continuar": "Continue",
  "Volver": "Back",
  "Confirmar pedido": "Confirm order",
};

export const tr = (es: string) => ES_EN[es] ?? es;
