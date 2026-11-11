import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { products } from "@/content/shop";
import { packages } from "@/content/packages";
import { policies } from "@/content/legal";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain;
  const now = new Date();

  const staticRoutes = ["", "/shop", "/packages", "/rewards", "/about", "/contact-us"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  return [
    ...staticRoutes,
    ...products.map((p) => ({
      url: `${base}/shop/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...packages.map((p) => ({
      url: `${base}/packages/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...policies.map((p) => ({
      url: `${base}/policy/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
