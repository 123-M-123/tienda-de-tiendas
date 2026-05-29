// app/layout.tsx - REEMPLAZO COMPLETO (FIX BUILD VERCEL)
import type { Metadata, Viewport } from "next"
import { Suspense } from "react" // 🚩 IMPORTANTE
import Script from "next/script"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import DynamicStyles from "@/app/components/DynamicStyles"

const GA_ID = "G-SMRT3RGFJD"

// 🚩 FIX: El themeColor ahora va en Viewport, no en Metadata
export const viewport: Viewport = {
  themeColor: "#000000",
}

export const metadata: Metadata = {
  title: "Tienda de Tiendas — Tu tienda online lista para vender",
  description: "Creamos tiendas online simples, rápidas y sin comisiones mensuales ni dependencia de plataformas.",
  metadataBase: new URL("https://tienda-de-tiendas.vercel.app"),
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "Tienda de Tiendas — Tu tienda online lista para vender",
    description: "Creamos tiendas online simples, rápidas y sin comisiones mensuales.",
    url: "https://tienda-de-tiendas.vercel.app",
    siteName: "Tienda de Tiendas",
    images: [
      {
        url: "/preview.jpg",
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
    title: "Tienda de Tiendas — Tu tienda online lista para vender",
    description: "Creamos tiendas online simples, rápidas y sin comisiones mensuales.",
    images: ["/preview.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" translate="no">
      <head>
        <meta name="google-site-verification" content="c43EWcKPaKQuTZ0w9M0U0iLPzJEgoEQmVTxKVhzfn8I" />
        <meta property="og:image" content="/preview.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tienda de Tiendas" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

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
        {/* Motor de estilos dinámicos */}
        <DynamicStyles />
        
        {/* 🚩 FIX BUILD: Header envuelto en Suspense por el uso de useSearchParams */}
        <Suspense fallback={<div className="h-20 bg-black" />}>
          <Header />
        </Suspense>

        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}