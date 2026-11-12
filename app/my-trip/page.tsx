import type { Metadata } from "next";
import { MyTrip } from "@/components/MyTrip";

export const metadata: Metadata = {
  title: "Mi Viaje — calendario de tu semana en Cancún",
  description:
    "Vuelos, pickups, experiencias y tu kit WoWay Black en un calendario semanal sincronizable con Google Calendar y Apple Calendar.",
  robots: { index: false },
};

export default function MyTripPage() {
  return <MyTrip />;
}
