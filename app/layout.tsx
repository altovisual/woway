import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { CartProvider } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { LangProvider } from "@/components/lang/LangProvider";
import { site } from "@/content/site";
import { FloatingContact } from "@/components/FloatingContact";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.brandName} — ${site.tagline}`,
    template: `%s | ${site.brandName}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.brandName} — ${site.tagline}`,
    description: site.description,
    type: "website",
    siteName: site.brandName,
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <a className="skip-link" href="#main">
          Saltar al contenido
        </a>
        <LangProvider>
          <CartProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
        <FloatingContact />
            <CartDrawer />
            <CookieBanner />
          </CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
