// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import {
  Geist,
  Geist_Mono,
  Cormorant_Garamond,
  Syne,
  DM_Sans,
  Bebas_Neue,
} from "next/font/google";

import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Add Bebas Neue font
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "GAMMAT 2026 | Global Aviation, Maritime & Mobility Access & Tech Summit",
  description:
    "Africa's premier integrated transport leadership summit. 5th November 2026, Oriental Hotel, Lagos. Ministers, CEOs, regulators & investors shaping Africa's transport future.",
  keywords:
    "GAMMAT 2026, Africa transport summit, aviation, maritime, mobility, Lagos, AfCFTA",
  openGraph: {
    title: "GAMMAT 2026 — Africa's Integrated Transport Summit",
    description: "5th November 2026 · Oriental Hotel, Lagos",
    type: "website",
  },
};

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${syne.variable} ${dmSans.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <head>
        {gtmId ? (
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        ) : null}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');`}
            </Script>
          </>
        ) : null}
      </head>
      <body className="min-h-full flex flex-col">
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
