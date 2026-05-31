// app/about/page.tsx
"use client";

import {
  Target,
  Eye,
  Globe,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Rocket,
  Shield,
  Lightbulb,
  Handshake,
} from "lucide-react";
import Link from "next/link";

const missionPoints = [
  {
    icon: Target,
    tag: "Mission",
    title: "Our Mission",
    description:
      "To accelerate Africa's transport integration by connecting decision-makers, capital, and innovation across aviation, maritime, logistics, and technology sectors.",
    accent: "#3db340",
  },
  {
    icon: Eye,
    tag: "Vision",
    title: "Our Vision",
    description:
      "A seamlessly connected Africa where integrated transport ecosystems drive continental trade, economic growth, and shared prosperity.",
    accent: "#1a70c8",
  },
  {
    icon: Globe,
    tag: "Impact",
    title: "Our Impact",
    description:
      "Driving intra-African trade, AfCFTA implementation, port modernisation, aviation expansion, and smart mobility innovation across the continent.",
    accent: "#f4a200",
  },
];

const coreValues = [
  {
    icon: Rocket,
    title: "Innovation",
    description:
      "Embracing cutting-edge solutions for Africa's transport challenges",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Transparent, ethical partnerships and dialogue",
  },
  {
    icon: Lightbulb,
    title: "Excellence",
    description: "World-class content and networking experiences",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description: "Building bridges across sectors and borders",
  },
];

const leadershipStats = [
  { label: "Ministers & Regulators", value: "15+", icon: Shield },
  { label: "CEOs & Directors", value: "50+", icon: Users },
  { label: "Countries Represented", value: "10+", icon: Globe },
  { label: "Investment Projects", value: "100+", icon: TrendingUp },
];

const benefits = [
  "Access to 15+ Ministers and Regulators",
  "Connect with 50+ CEOs and Industry Leaders",
  "Network with 2,000+ Delegates",
  "Explore 100+ Investment Projects",
  "Participate in Ministerial Roundtables",
  "Gain Media Visibility Across Africa",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f7f6f2]">
      {/* ── Hero ── */}
      <section className="px-6 py-36 mb-20 bg-[#0d1a0f]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]=">
              About the Summit
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-white mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Africa&apos;s Premier{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Transport
            </span>
            <br />
            Leadership Platform
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
            Convening ministers, regulators, CEOs, investors, and infrastructure
            developers under one influential platform to drive Africa&apos;s
            transport future.
          </p>
        </div>
      </section>

      {/* ── Mission / Vision / Impact ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
          {missionPoints.map(
            ({ icon: Icon, tag, title, description, accent }) => (
              <div
                key={title}
                className="bg-white border border-[#d4d8d0] rounded-xl overflow-hidden"
              >
                <div className="h-0.5 w-full" style={{ background: accent }} />
                <div className="p-7">
                  <span
                    className="text-[10px] font-bold tracking-[0.14em] uppercase mb-4 block"
                    style={{ color: accent }}
                  >
                    {tag}
                  </span>
                  <div
                    className="w-10 h-10 rounded-md flex items-center justify-center mb-4"
                    style={{
                      background: `${accent}18`,
                      border: `0.5px solid ${accent}40`,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: accent }} />
                  </div>
                  <h3 className="text-base font-bold text-[#1a2b1a] mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-[#4a5a4a] leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* ── What is GAMMAT ── */}
      <section className="px-6 mb-20 bg-[#0d1a0f] py-20">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-0.5 bg-[#3B6D11]" />
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
                The Summit
              </span>
            </div>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-white mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              What is GAMMAT{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                2026?
              </span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-4">
              GAMMAT 2026 convenes ministers, regulators, CEOs, investors, and
              infrastructure developers under one influential platform — driving
              intra-African trade, AfCFTA implementation, port modernisation,
              aviation expansion, and smart mobility innovation.
            </p>
            <p className="text-white/40 text-sm leading-relaxed mb-10">
              The future of Africa&apos;s competitiveness depends on integrated
              transport ecosystems — and this is where action meets capital.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors"
              >
                Register Now
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/sponsorship"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/20 rounded-md text-sm font-semibold text-white/70 hover:border-white/40 hover:text-white transition-colors"
              >
                Become a Sponsor
              </Link>
            </div>
          </div>

          {/* Stats block */}
          <div className="border border-white/10 rounded-xl p-8 bg-white/3">
            <div className="grid grid-cols-2 gap-6">
              {leadershipStats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="text-center py-4 border border-white/8 rounded-lg"
                >
                  <Icon className="w-5 h-5 text-green-400 mx-auto mb-2" />
                  <div
                    className="text-4xl font-black text-white leading-none mb-1"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {value}
                  </div>
                  <div className="text-[11px] font-semibold tracking-wider uppercase text-white/35">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Core Values
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-[#1a2b1a] mb-12"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            The Principles{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Behind
            </span>{" "}
            the Summit
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreValues.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white border border-[#d4d8d0] rounded-xl p-6 hover:border-[#3B6D11]/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-md bg-[#eaf3de] flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-[#3B6D11]" />
                </div>
                <h3 className="text-sm font-bold text-[#1a2b1a] mb-1.5">
                  {title}
                </h3>
                <p className="text-xs text-[#4a5a4a] leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Attend ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Why Attend
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-[#1a2b1a] mb-10"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Six Reasons to{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Be There
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 p-4 bg-white border border-[#d4d8d0] rounded-lg"
              >
                <CheckCircle className="w-4 h-4 text-[#3B6D11] shrink-0" />
                <span className="text-sm font-medium text-[#1a2b1a]">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#0d1a0f] rounded-xl p-12 text-center relative overflow-hidden">
            {/* Rainbow stripe bottom */}
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
              Ready to Shape Africa&apos;s{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Transport Future?
              </span>
            </h2>
            <p className="text-white/40 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Join the continent&apos;s most influential transport leadership
              platform.
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
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 bg-transparent border border-white/20 rounded-md text-sm font-semibold text-white/70 hover:border-white/40 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
