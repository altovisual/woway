import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <div className="container">
      <div className="notfound">
        <div className="notfound__code">404</div>
        <h1 className="h2">Esta página se quedó en otro viaje.</h1>
        <p className="lead" style={{ marginInline: "auto" }}>
          El enlace no existe. Prueba con la tienda o con los paquetes.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/shop" className="btn">
            Ir a la tienda
            <Icon name="arrow" size={16} className="btn__arrow" />
          </Link>
          <Link href="/packages" className="btn btn--ghost">
            Ver paquetes
          </Link>
        </div>
      </div>
    </div>
  );
}
