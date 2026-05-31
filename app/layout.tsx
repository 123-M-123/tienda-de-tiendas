// app/layout.tsx - FUSIÓN TOTAL SIN OMISIONES (AISLAMIENTO DE PREVIEW)
import type { Metadata, Viewport } from "next"
import { Suspense } from "react" 
import Script from "next/script"
import { headers } from "next/headers" // 🚩 Necesario para detectar la ruta
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import DynamicStyles from "@/app/components/DynamicStyles"
import { getStoreConfig } from "@/lib/panelData"

const GA_ID = "G-SMRT3RGFJD"

// 🔥 CONFIGURACIÓN DE VIEWPORT (IPHONE & ANDROID FIX) - INTACTO
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

// 🔥 GENERACIÓN DE METADATA DINÁMICA (CONEXIÓN A SHEETS) - INTACTO
export async function generateMetadata(): Promise<Metadata> {
  const config = await getStoreConfig("marcosmarti1980@gmail.com");
  
  const ogImage = config?.previewUrl || "/preview-2.jpg";
  const title = config?.metaTitle || "Tienda de Tiendas — Tu tienda online lista para vender";
  const description = config?.metaDesc || "Creamos tiendas online simples, rápidas y sin comisiones mensuales.";

  return {
    title: title,
    description: description,
    metadataBase: new URL("https://tienda-de-tiendas.vercel.app"),
    manifest: "/manifest.json",
    icons: {
      icon: "/favicon.png",
      apple: "/icon-192.png",
    },
    openGraph: {
      title: title,
      description: description,
      url: "https://tienda-de-tiendas.vercel.app",
      siteName: config?.nombreMedio || "Tienda de Tiendas",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Tienda de Tiendas Preview",
        },
      ],
      locale: "es_AR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      images: [ogImage],
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 🚩 LÓGICA DE DETECCIÓN DE RUTA (Mantiene limpia la Preview)
  const headersList = headers();
  const path = headersList.get("x-invoke-path") || "";
  const isPreview = path.includes('/preview');

  return (
    <html lang="es" translate="no">
      <head>
        {/* 🔥 GOOGLE SEARCH CONSOLE - INTACTO */}
        <meta
          name="google-site-verification"
          content="c43EWcKPaKQuTZ0w9M0U0iLPzJEgoEQmVTxKVhzfn8I"
        />

        {/* SEO BASE & IPHONE FIXES - INTACTO */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* OG FIX MANUAL (WhatsApp / Facebook / etc) - INTACTO */}
        <meta property="og:image" content="/preview-2.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tienda de Tiendas" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* 🔥 GOOGLE ANALYTICS SCRIPTS - INTACTO SIN CAMBIOS */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>

      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        {/* Motor de estilos dinámicos para los 9 colores y branding */}
        <DynamicStyles />
        
        {/* 🛡️ HEADER CONDICIONAL: Se oculta en /preview */}
        {!isPreview && (
          <Suspense fallback={<div className="h-20 bg-black w-full" />}>
            <Header />
          </Suspense>
        )}

        <main>{children}</main>
        
        {/* 🛡️ FOOTER CONDICIONAL: Se oculta en /preview */}
        {!isPreview && <Footer />}
        
        <Analytics />
      </body>
    </html>
  )
}