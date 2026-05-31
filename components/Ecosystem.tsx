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
import FadeUp from "./FadeUp";

const sectors = [
  {
    icon: Plane,
    tag: "Aviation",
    title: "Aviation",
    desc: "Air connectivity, fleet expansion, airport infrastructure, and aviation technology shaping the future of African skies.",
    accentColor: "#e05c10",
    bgImage: "/aviation.png",
  },
  {
    icon: Ship,
    tag: "Maritime",
    title: "Maritime",
    desc: "Port modernization, shipping corridors, blue economy, and maritime safety driving Africa's coastal trade.",
    accentColor: "#1a70c8",
    bgImage: "/maritime.png",
  },
  {
    icon: Truck,
    tag: "Logistics",
    title: "Logistics & Mobility",
    desc: "Supply chain optimization, last-mile delivery, urban mobility, and freight connecting African markets.",
    accentColor: "#3db340",
    bgImage: "/logistics.png",
  },
  {
    icon: Building2,
    tag: "Infrastructure",
    title: "Infrastructure",
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
    bgImage: "/trade.png",
  },
  {
    icon: Microchip,
    tag: "Technology",
    title: "Technology",
    desc: "Smart mobility, digital logistics, AI optimization, and transport tech innovations transforming the industry.",
    accentColor: "#c4267a",
    bgImage: "/technology.png",
  },
];

export default function Ecosystem() {
  return (
    <section id="ecosystem" className="py-24 px-6 bg-[#f7f6f2]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-6 h-0.5 bg-[#3B6D11]" />
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
                Integrated Ecosystem
              </span>
              <span className="w-6 h-0.5 bg-[#3B6D11]" />
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a2b1a] mb-4"
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
            <p className="text-[#4a5a4a] text-base max-w-2xl mx-auto">
              Six interconnected sectors form the backbone of Africa&apos;s
              transport future. GAMMAT 2026 brings decision-makers from each
              discipline together under one roof.
            </p>
          </div>
        </FadeUp>

        {/* Sectors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectors.map((sector, idx) => (
            <FadeUp key={sector.title} delay={idx as 0 | 1 | 2 | 3 | 4 | 5}>
              <div
                className="group relative rounded-xl overflow-hidden h-full transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  backgroundImage: `url(${sector.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#0d1a0f]/80" />

                {/* Accent bottom border — uses each card's brand color */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: sector.accentColor }}
                />

                {/* Content */}
                <div className="relative p-7 h-full flex flex-col min-h-50">
                  {/* Tag */}
                  <span
                    className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] uppercase mb-4"
                    style={{ color: sector.accentColor }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: sector.accentColor }}
                    />
                    {sector.tag}
                  </span>

                  {/* Icon + Title */}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: `${sector.accentColor}22`,
                        border: `0.5px solid ${sector.accentColor}55`,
                      }}
                    >
                      <sector.icon
                        className="w-4 h-4"
                        style={{ color: sector.accentColor }}
                      />
                    </div>
                    <h3
                      className="font-black text-white leading-none pt-1.5"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "28px",
                      }}
                    >
                      {sector.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-white/55 text-sm leading-relaxed grow">
                    {sector.desc}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Info bar */}
        {/* CTA */}
        <div className="mt-12 text-center">
          <FadeUp delay={4}>
            <a
              href="/register"
              className="group inline-flex items-center gap-2 px-7 py-3 bg-[#0d1a0f] border border-[#3B6D11]/40 rounded-md text-sm font-bold tracking-wider uppercase text-white transition-colors hover:bg-[#3a8a3b]"
            >
              Register Now
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
