export type Policy = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: { h: string; p: string[] }[];
};

const disclaimer =
  "Esta página es una plantilla de demostración. No constituye asesoría legal y debe sustituirse por un documento revisado por tu abogado antes de publicarse.";

export const policies: Policy[] = [
  {
    slug: "privacy-policy",
    title: "Aviso de privacidad",
    updated: "1 de noviembre de 2026",
    intro: disclaimer,
    sections: [
      {
        h: "Responsable",
        p: [
          "WoWay Black Experiences S.A. de C.V. es responsable del tratamiento de los datos personales que recabamos a través de este sitio, de la tienda en línea y de la operación de experiencias.",
        ],
      },
      {
        h: "Datos que recabamos",
        p: [
          "Datos de contacto (nombre, correo, teléfono), datos de envío, historial de compras y reservas, y datos necesarios para la operación de un viaje como fechas, número de viajeros y requerimientos alimenticios.",
          "No solicitamos datos sensibles. Los datos de pago se procesan con el proveedor de pagos y no se almacenan en nuestros servidores.",
        ],
      },
      {
        h: "Finalidades",
        p: [
          "Procesar pedidos y reservas, coordinar traslados y experiencias, atender cambios y devoluciones, enviar confirmaciones y, con tu consentimiento, comunicaciones de marketing.",
        ],
      },
      {
        h: "Derechos ARCO",
        p: [
          "Puedes solicitar acceso, rectificación, cancelación u oposición al tratamiento de tus datos escribiendo a hola@wowayblack.example. Responderemos en un plazo máximo de 20 días hábiles.",
        ],
      },
      {
        h: "Transferencias",
        p: [
          "Compartimos datos estrictamente necesarios con hoteles, transportistas y paqueterías para operar tu compra o tu viaje. No vendemos datos personales.",
        ],
      },
    ],
  },
  {
    slug: "terms-of-use",
    title: "Términos y condiciones",
    updated: "1 de noviembre de 2026",
    intro: disclaimer,
    sections: [
      {
        h: "Compra de productos",
        p: [
          "Los precios se muestran en pesos mexicanos (MXN) e incluyen impuestos. El cargo se realiza al confirmar el pago y la disponibilidad de talla se valida en ese momento.",
        ],
      },
      {
        h: "Reservas de paquetes",
        p: [
          "La reserva queda confirmada al recibir el pago total o el anticipo indicado. El saldo se cubre antes de la fecha de llegada según las condiciones del paquete.",
          "Las fechas están sujetas a disponibilidad de hotel y de guías. Si no hay disponibilidad, se ofrece cambio de fecha o reembolso completo.",
        ],
      },
      {
        h: "Cambios y cancelaciones",
        p: [
          "Las reservas pueden cancelarse sin costo hasta 15 días antes de la llegada. Entre 14 y 7 días se retiene el 50%. Con menos de 7 días no hay reembolso.",
          "Los productos de tienda pueden cambiarse por talla dentro de 30 días, sin uso y con etiqueta.",
        ],
      },
      {
        h: "Responsabilidad",
        p: [
          "WoWay Black actúa como operador de las experiencias y como comercializador de productos. No somos responsables por retrasos de aerolíneas, condiciones climáticas extremas o causas de fuerza mayor.",
        ],
      },
    ],
  },
  {
    slug: "shipping-returns",
    title: "Envíos y devoluciones",
    updated: "1 de noviembre de 2026",
    intro: disclaimer,
    sections: [
      {
        h: "Envíos en México",
        p: [
          "Envío estándar de 2 a 5 días hábiles. Envío gratis en compras superiores a $1,500 MXN. Envío express disponible en Cancún y Playa del Carmen el mismo día.",
        ],
      },
      {
        h: "Envíos internacionales",
        p: [
          "Enviamos a Estados Unidos, Canadá y Europa con paquetería internacional de 5 a 12 días hábiles. Los aranceles locales corren por cuenta del comprador.",
        ],
      },
      {
        h: "Entrega en hotel",
        p: [
          "Si estás de viaje, puedes elegir entrega en tu hotel. Necesitamos la reserva confirmada y el nombre del titular. La entrega se coordina en recepción el día de llegada.",
        ],
      },
      {
        h: "Devoluciones",
        p: [
          "Aceptamos devoluciones dentro de 30 días con la pieza sin uso y con etiqueta. El reembolso se emite al mismo método de pago en un plazo de 5 a 10 días hábiles tras recibir el paquete.",
        ],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Política de cookies",
    updated: "1 de noviembre de 2026",
    intro: disclaimer,
    sections: [
      {
        h: "Qué cookies usamos",
        p: [
          "Cookies esenciales para mantener el carrito y la sesión, cookies de analítica para entender qué páginas se usan y cookies de marketing solo si las aceptas.",
        ],
      },
      {
        h: "Cómo gestionarlas",
        p: [
          "Puedes cambiar tu elección en cualquier momento desde el enlace de configuración del aviso de cookies al pie del sitio o limpiando los datos del navegador.",
        ],
      },
    ],
  },
];

export function getPolicy(slug: string) {
  return policies.find((p) => p.slug === slug);
}
