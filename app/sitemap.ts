import { MetadataRoute } from "next";
import { comparativas } from "@/data/comparativas";

const baseUrl = "https://tienda-de-tiendas.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  // 🔵 páginas fijas
  const staticPages = [
    "",
    "/comparador",
    "/mapa",
  ];

  const staticUrls = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  // 🔥 páginas dinámicas (SLUGS SEO)
  const slugUrls = comparativas.map((item) => ({
    url: `${baseUrl}/comparador/${item.slug}`,
    lastModified: new Date(),
  }));

  return [...staticUrls, ...slugUrls];
}