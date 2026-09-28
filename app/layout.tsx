// app/layout.tsx
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Cormorant_Garamond,
  Syne,
  DM_Sans,
  Bebas_Neue,
} from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";

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
const GOOGLE_ADS_ID = "AW-18453740960";

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
        {/*
          Google tag (gtag.js) — Google Ads conversion tracking.
          Loaded on every page as instructed by Google:
          https://support.google.com/google-ads/answer/6095821

          Kept as raw <script> tags (rather than next/script) because this
          is the exact markup Google's tag instructions require, and it
          must run before any conversion event fires.
        */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ADS_ID}');
            `,
          }}
        />
      </head>

      {/*
        Google Tag Manager — loads the GTM container for every route.
        Placed between <html> and <body> per the Next.js docs:
        https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-tag-manager
        The component also injects the <noscript> fallback iframe.
      */}
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}

      <body className="min-h-full flex flex-col">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
