// components/Ecosystem.tsx
"use client";

import {
  Plane,
  Ship,
  Truck,
  Building2,
  TrendingUp,
  Microchip,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "./FadeUp";

const sectors = [
  {
    icon: Plane,
    tag: "Aviation",
    title: "Aviation & Aerospace",
    desc: "Air connectivity, fleet expansion, airport infrastructure, and aviation technology shaping the future of African skies.",
    accentColor: "#e05c10",
    bgImage: "/gallery/faan.webp",
  },
  {
    icon: Ship,
    tag: "Maritime",
    title: "Maritime & Blue Economy",
    desc: "Port modernization, shipping corridors, blue economy, and maritime safety driving Africa's coastal trade.",
    accentColor: "#1a70c8",
    bgImage: "/gallery/slabfreight.webp",
  },
  {
    icon: Truck,
    tag: "Logistics",
    title: "Logistics & Mobility",
    desc: "Supply chain optimization, last-mile delivery, urban mobility, and freight connecting African markets.",
    accentColor: "#3db340",
    bgImage: "/gallery/gigm.webp",
  },
  {
    icon: Building2,
    tag: "Infrastructure",
    title: "Infrastructure & Development",
    desc: "Roads, railways, bridges, transport hubs, and special economic zones enabling continental integration.",
    accentColor: "#f4a200",
    bgImage: "/infrastructure.png",
  },
  {
    icon: TrendingUp,
    tag: "Trade",
    title: "Trade & Investment",
    desc: "AfCFTA implementation, capital deployment, PPP models, and trade finance accelerating Africa's growth.",
    accentColor: "#6e28d9",
    bgImage: "/gallery/regaldpc.webp",
  },
  {
    icon: Microchip,
    tag: "Technology",
    title: "Technology & Digital Innovation",
    desc: "Smart mobility, digital logistics, AI optimization, and transport tech innovations transforming the industry.",
    accentColor: "#c4267a",
    bgImage: "/gallery/netsafe.webp",
  },
];

export default function Ecosystem() {
  return (
    <section id="ecosystem" className="bg-[#f2f6fc] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <FadeUp>
          <div className="mb-12 text-center">
            <h2
              className="mb-4 text-5xl font-normal text-[#061330] md:text-6xl lg:text-7xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Where{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Sectors
              </span>{" "}
              Converge
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#3d4b66]">
              Six interconnected sectors form the backbone of Africa&apos;s
              transport future. GAMMAT 2026 brought decision-makers from each
              discipline together under one roof.
            </p>
          </div>
        </FadeUp>

        {/* Sectors grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, idx) => (
            <FadeUp key={sector.title} delay={idx as 0 | 1 | 2 | 3 | 4 | 5}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#061330]/10 bg-white shadow-[0_1px_2px_rgba(6,19,48,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-14px_rgba(6,19,48,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                {/* Accent top rule */}
                <div
                  className="absolute inset-x-0 top-0 z-10 h-1"
                  style={{ background: sector.accentColor }}
                />

                {/* Image panel */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#061330]/5">
                  <Image
                    src={sector.bgImage}
                    alt={sector.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />

                  {/* Scrim so the badge stays legible */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061330]/55 via-transparent to-transparent" />

                  {/* Tag badge */}
                  <span
                    className="absolute bottom-3 left-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm"
                    style={{ background: `${sector.accentColor}dd` }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                    {sector.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="flex grow flex-col p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: `${sector.accentColor}14`,
                        border: `1px solid ${sector.accentColor}33`,
                      }}
                    >
                      <sector.icon
                        className="h-4 w-4"
                        style={{ color: sector.accentColor }}
                      />
                    </div>
                    <h3 className="text-lg font-black leading-tight text-[#061330]">
                      {sector.title}
                    </h3>
                  </div>

                  <p className="grow text-sm leading-relaxed text-[#3d4b66]">
                    {sector.desc}
                  </p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <FadeUp delay={4}>
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-sm bg-[#061330] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0a1f4d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b5fc1]"
            >
              Join us in 2027
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
