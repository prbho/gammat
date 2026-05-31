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
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
