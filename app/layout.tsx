// app/layout.tsx - FUSIÓN TOTAL SIN OMISIONES
import type { Metadata, Viewport } from "next"
import { Suspense } from "react" 
import Script from "next/script"
import { headers } from "next/headers" 
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import DynamicStyles from "@/app/components/DynamicStyles"
import { getStoreConfig } from "@/lib/panelData"

const GA_ID = "G-SMRT3RGFJD"

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await getStoreConfig("marcosmarti1980@gmail.com");
  const ogImage = config?.previewUrl || "/preview-2.jpg";
  const title = config?.metaTitle || "Tienda de Tiendas — Tu tienda online lista para vender";
  const description = config?.metaDesc || "Creamos tiendas online simples, rápidas y sin comisiones mensuales.";

  return {
    title,
    description,
    metadataBase: new URL("https://tienda-de-tiendas.vercel.app"),
    manifest: "/manifest.json", // 🛡️ RECUPERADO
    icons: {
      icon: "/favicon.png",
      apple: "/icon-192.png",
    },
    openGraph: {
      title,
      description,
      url: "https://tienda-de-tiendas.vercel.app",
      siteName: config?.nombreMedio || "Tienda de Tiendas",
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "es_AR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      images: [ogImage],
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const path = headersList.get("x-invoke-path") || "";
  const isPreview = path.includes('/preview');

  return (
    <html lang="es" translate="no">
      <head>
        {/* 🛡️ GOOGLE SEARCH CONSOLE - RECUPERADO */}
        <meta name="google-site-verification" content="c43EWcKPaKQuTZ0w9M0U0iLPzJEgoEQmVTxKVhzfn8I" />

        {/* 🛡️ MANIFEST & IPHONE TAGS - RECUPERADO */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* 🛡️ OG FIX MANUAL - RECUPERADO */}
        <meta property="og:image" content="/preview-2.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tienda de Tiendas" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* 🛡️ GOOGLE ANALYTICS SCRIPTS - RECUPERADO COMPLETO */}
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
        <DynamicStyles />
        
        {!isPreview && (
          <Suspense fallback={<div className="h-20 bg-black w-full" />}>
            <Header />
          </Suspense>
        )}

        <main>{children}</main>
        
        {!isPreview && <Footer />}
        
        <Analytics />
      </body>
    </html>
  )
}