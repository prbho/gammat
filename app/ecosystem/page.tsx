// app/ecosystem/page.tsx
"use client";

import {
  Plane,
  Ship,
  Truck,
  Building2,
  TrendingUp,
  Microchip,
  ArrowRight,
  CheckCircle,
  Globe,
  Users,
  Briefcase,
  Rocket,
} from "lucide-react";
import Link from "next/link";

const sectors = [
  {
    icon: Plane,
    name: "Aviation",
    description:
      "Air connectivity, fleet expansion, airport infrastructure, and aviation technology",
    stats: ["15+ Airlines", "20+ Airports", "$2B+ Investment"],
  },
  {
    icon: Ship,
    name: "Maritime",
    description:
      "Port modernization, shipping corridors, blue economy, and maritime safety",
    stats: ["8 Port Authorities", "50+ Shipping Lines", "$5B+ Trade Value"],
  },
  {
    icon: Truck,
    name: "Logistics & Mobility",
    description:
      "Supply chain optimization, last-mile delivery, urban mobility, and freight",
    stats: ["100+ Logistics Companies", "3,000km Corridors", "Smart Mobility"],
  },
  {
    icon: Building2,
    name: "Infrastructure",
    description:
      "Roads, railways, bridges, transport hubs, and special economic zones",
    stats: ["$50B+ Pipeline", "15 Major Projects", "PPP Opportunities"],
  },
  {
    icon: TrendingUp,
    name: "Trade & Investment",
    description:
      "AfCFTA implementation, capital deployment, PPP models, and trade finance",
    stats: ["54 Countries", "$3T GDP", "40+ Investors"],
  },
  {
    icon: Microchip,
    name: "Technology",
    description:
      "Smart mobility, digital logistics, AI optimization, and transport tech",
    stats: ["30+ Tech Startups", "Digital Platforms", "Innovation Hub"],
  },
];

const ecosystemStats = [
  { label: "African Nations", value: "10+", icon: Globe },
  { label: "Industry Leaders", value: "2,000+", icon: Users },
  { label: "Companies", value: "500+", icon: Briefcase },
  { label: "Startups", value: "50+", icon: Rocket },
];

const opportunities = [
  "Connect with ministers and regulators shaping transport policy",
  "Network with CEOs and industry leaders driving innovation",
  "Explore investment opportunities in bankable projects",
  "Discover cutting-edge technology solutions",
  "Build cross-sector partnerships for continental impact",
  "Access exclusive market intelligence and insights",
];

const crossSectorExamples = [
  "Aviation + Technology = Smart Airports",
  "Maritime + Logistics = Efficient Ports",
  "Infrastructure + Trade = Economic Zones",
  "All Sectors + Investment = Growth",
];

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-[#f7f6f2] pt-32">
      {/* ── Hero ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Integrated Ecosystem
            </span>
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-[#1a2b1a] mb-6"
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
          </h1>
          <p className="text-[#4a5a4a] text-lg leading-relaxed max-w-2xl mx-auto">
            Six interconnected sectors form the backbone of Africa&apos;s
            transport future. GAMMAT 2026 brings decision-makers from each
            discipline together under one roof.
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4">
            {ecosystemStats.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="bg-white border border-[#d4d8d0] rounded-xl p-6 text-center"
              >
                <div className="w-10 h-10 rounded-md bg-[#eaf3de] flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-4 h-4 text-[#3B6D11]" />
                </div>
                <div
                  className="text-3xl font-black text-[#1a2b1a] leading-none mb-1"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {value}
                </div>
                <div className="text-[11px] font-semibold tracking-wider uppercase text-[#4a5a4a]/50">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sectors Grid ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              The Sectors
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-[#1a2b1a] mb-12"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Six Interconnected{" "}
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
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectors.map(({ icon: Icon, name, description, stats }) => (
              <div
                key={name}
                className="bg-white border border-[#d4d8d0] rounded-xl p-6 hover:border-[#3B6D11]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-md bg-[#eaf3de] flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-[#3B6D11]" />
                </div>
                <h3 className="text-base font-bold text-[#1a2b1a] mb-2">
                  {name}
                </h3>
                <p className="text-sm text-[#4a5a4a] leading-relaxed mb-4">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {stats.map((stat) => (
                    <span
                      key={stat}
                      className="text-[10px] font-semibold px-2 py-1 bg-[#eaf3de] rounded text-[#3B6D11]/80"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Join the Ecosystem ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Why Join
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-[#1a2b1a] mb-10"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Why Join the{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ecosystem?
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {opportunities.map((opportunity) => (
              <div
                key={opportunity}
                className="flex items-center gap-3 p-4 bg-white border border-[#d4d8d0] rounded-lg"
              >
                <CheckCircle className="w-4 h-4 text-[#3B6D11] shrink-0" />
                <span className="text-sm font-medium text-[#1a2b1a]">
                  {opportunity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cross-Sector Impact ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#0d1a0f] rounded-xl p-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="w-10 h-10 rounded-md bg-[#eaf3de] flex items-center justify-center mb-4">
                  <Rocket className="w-4 h-4 text-[#3B6D11]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Cross-Sector Impact
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  The convergence of these six sectors creates unprecedented
                  opportunities for collaboration, innovation, and investment.
                </p>
                <div className="space-y-2">
                  {crossSectorExamples.map((example) => (
                    <div
                      key={example}
                      className="text-sm text-[#3B6D11]/80 font-medium"
                    >
                      • {example}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-4">
                  <Globe className="w-8 h-8 text-[#3B6D11]" />
                </div>
                <p className="text-white/40 text-xs uppercase tracking-wider">
                  One Continent
                </p>
                <p className="text-3xl font-black text-white mt-1">
                  54 Nations
                </p>
                <p className="text-white/40 text-xs uppercase tracking-wider mt-4">
                  One Integrated Future
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#0d1a0f] rounded-xl p-12 text-center relative overflow-hidden">
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)",
              }}
            />
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-white mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Be Part of Africa&apos;s{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Transport Revolution
              </span>
            </h2>
            <p className="text-white/40 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Join the ecosystem that&apos;s shaping the future of African
              transport and trade.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 px-7 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors"
              >
                Register Now
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/sponsorship"
                className="inline-flex items-center gap-2 px-7 py-3 bg-transparent border border-white/20 rounded-md text-sm font-semibold text-white/70 hover:border-white/40 hover:text-white transition-colors"
              >
                Explore Sponsorship
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
