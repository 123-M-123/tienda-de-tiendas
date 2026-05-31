// app/layout.tsx - FUSIÓN TOTAL BLINDADA (AISLAMIENTO CORREGIDO)
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
  const title = config?.metaTitle && config.metaTitle !== "Version" 
    ? config.metaTitle 
    : "Tienda de Tiendas — Tu tienda online lista para vender";

  return {
    title: title,
    description: config?.metaDesc || "Creamos tiendas online simples, rápidas y sin comisiones mensuales.",
    metadataBase: new URL("https://tienda-de-tiendas.vercel.app"),
    manifest: "/manifest.json",
    icons: {
      icon: "/favicon.png",
      apple: "/icon-192.png",
    },
    openGraph: {
      title: title,
      description: config?.metaDesc,
      url: "https://tienda-de-tiendas.vercel.app",
      siteName: "Tienda de Tiendas",
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "es_AR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: config?.metaDesc,
      images: [ogImage],
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers();
  // 🚩 DETECCIÓN QUIRÚRGICA: Solo detectamos si el PATH actual es preview.
  const path = headersList.get("x-invoke-path") || "";
  const isPreview = path.startsWith('/preview');

  return (
    <html lang="es" translate="no">
      <head>
        <meta name="google-site-verification" content="c43EWcKPaKQuTZ0w9M0U0iLPzJEgoEQmVTxKVhzfn8I" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        <meta property="og:image" content="/preview-2.jpg" />
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
        <DynamicStyles />
        
        {/* 🛡️ EL MURO: Si NO es preview, mostramos Header y Footer oficiales */}
        {!isPreview ? (
          <>
            <Suspense fallback={<div className="h-20 bg-black w-full" />}>
              <Header />
            </Suspense>
            <main>{children}</main>
            <Footer />
          </>
        ) : (
          /* En preview, mandamos el contenido limpio */
          <main>{children}</main>
        )}
        
        <Analytics />
      </body>
    </html>
  )
}