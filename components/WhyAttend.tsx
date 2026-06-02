"use client";

import {
  ChartLine,
  Network,
  Globe,
  Megaphone,
  Briefcase,
  ArrowRight,
  UserRoundKey,
} from "lucide-react";
import FadeUp from "./FadeUp";
import Link from "next/link";

const reasons = [
  {
    num: "01",
    icon: UserRoundKey,
    title: "Ministers & Regulators",
    desc: "Direct access to Africa's transport policy architects — shape regulations, build relationships, influence the agenda.",
    accent: "#e05c10",
    longDesc:
      "Engage directly with the decision-makers shaping Africa's transport future.",
  },
  {
    num: "02",
    icon: ChartLine,
    title: "Investors & C-Suite Leaders",
    desc: "Connect with institutional capital, development financiers, and the CEOs deploying Africa's infrastructure investment.",
    accent: "#f4a200",
    longDesc:
      "Network with the leaders driving Africa's infrastructure transformation.",
  },
  {
    num: "03",
    icon: Network,
    title: "Cross-Sector Partnerships",
    desc: "Infrastructure stakeholders, technology providers, and logistics operators converge to build transformative coalitions.",
    accent: "#3db340",
    longDesc:
      "Build powerful alliances across aviation, maritime, logistics, and technology.",
  },
  {
    num: "04",
    icon: Globe,
    title: "AfCFTA Alignment",
    desc: "Position your organisation at the forefront of Africa's continental free trade implementation and logistics corridors.",
    accent: "#1a70c8",
    longDesc: "Be at the forefront of Africa's single market transformation.",
  },
  {
    num: "05",
    icon: Megaphone,
    title: "Media & Visibility",
    desc: "Pan-African press, LinkedIn campaigns, and broadcast coverage amplify your brand across the continent's business elite.",
    accent: "#c4267a",
    longDesc:
      "Get featured across Africa's most influential business platforms.",
  },
  {
    num: "06",
    icon: Briefcase,
    title: "Bankable Projects",
    desc: "Exclusive access to pipeline projects and investment memoranda connecting capital with Africa's infrastructure gap.",
    accent: "#6e28d9",
    longDesc: "Discover vetted investment opportunities ready for deployment.",
  },
];

export default function WhyAttend() {
  return (
    <section id="why" className="py-24 px-6 bg-[#0d1a0f]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-6 h-0.5 bg-[#3B6D11]" />
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
                Why Attend
              </span>
              <span className="w-6 h-0.5 bg-[#3B6D11]" />
            </div>
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl leading-none font-black text-white mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              The GAMMAT{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Advantage
              </span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
              Six compelling reasons why industry leaders choose GAMMAT as their
              platform for growth, partnership, and impact.
            </p>
          </div>
        </FadeUp>

        {/* All 6 Cards - Large Format */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reasons.map((reason, idx) => (
            <FadeUp
              key={reason.num}
              delay={((idx % 3) + 2) as 0 | 1 | 2 | 3 | 4 | 5}
            >
              <div
                className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-xl min-h-90"
                style={{
                  background: `linear-gradient(135deg, ${reason.accent}12 0%, ${reason.accent}04 100%)`,
                  backgroundColor: "#0d1a0f",
                  border: `1px solid ${reason.accent}25`,
                }}
              >
                {/* Accent bottom border - animates on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
                  style={{ background: reason.accent }}
                />

                <div className="p-7">
                  {/* Icon and Number Row */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `${reason.accent}20`,
                        border: `1px solid ${reason.accent}40`,
                      }}
                    >
                      <reason.icon
                        className="w-7 h-7"
                        style={{ color: reason.accent }}
                      />
                    </div>
                    <span
                      className="text-5xl font-black opacity-20 transition-all duration-300 group-hover:opacity-40"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        color: reason.accent,
                      }}
                    >
                      {reason.num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl md:text-3xl font-black text-white mb-3"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4">
                    {reason.desc}
                  </p>

                  {/* Long description / tagline on hover */}
                  <div className="pt-3 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-xs text-white/40 italic">
                      {reason.longDesc}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <FadeUp delay={5}>
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 px-10 py-4 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-base font-bold tracking-wider uppercase text-white transition-all duration-300 hover:bg-[#3a8a3b] hover:scale-105 hover:shadow-xl"
            >
              Claim Your Advantage
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
