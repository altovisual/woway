import type { Metadata } from "next";
import { FlightSearch } from "@/components/FlightSearch";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Vuelos a Cancún — compara y combina con tu paquete",
  description: "Busca vuelos a Cancún, Riviera Maya y Cozumel y combínalos con traslados privados y experiencias.",
};

export default function FlightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Vuelos"
        title="Tu vuelo y tu paquete, en la misma reserva."
        body="Compara vuelos a Cancún y combínalos con el paquete que ya tienes elegido. El traslado privado se agenda solo con tu hora de aterrizaje."
        crumbs={[{ label: "Vuelos" }]}
        actions={[{ label: "Ver paquetes", href: "/packages" }]}
      />

      <section className="section">
        <div className="container">
          <FlightSearch />
        </div>
      </section>
    </>
  );
}
