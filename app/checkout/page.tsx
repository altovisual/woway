import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/CheckoutFlow";
import { RevealText } from "@/components/RevealText";

export const metadata: Metadata = {
  title: "Checkout — completa tu pedido",
  description: "Revisa tu carrito, elige entrega y paga tu pedido de merch o tu paquete de viaje.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <section className="section" style={{ paddingBottom: 24 }}>
        <div className="container">
          <p className="eyebrow">Checkout</p>
          <RevealText text="Completa tu pedido." className="h2" />
          <p className="lead" style={{ marginTop: 12 }}>
            Merch y experiencias en una sola compra. Envío, entrega en hotel o recogida en Cancún.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <CheckoutFlow />
      </section>
    </>
  );
}
