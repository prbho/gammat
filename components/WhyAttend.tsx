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

const reasons = [
  {
    num: "01",
    icon: UserRoundKey,
    title: "Ministers & Regulators",
    desc: "Direct access to Africa's transport policy architects — shape regulations, build relationships, influence the agenda.",
    accent: "#3db340",
    bgImage: "/regulators.png",
  },
  {
    num: "02",
    icon: ChartLine,
    title: "Investors & C-Suite Leaders",
    desc: "Connect with institutional capital, development financiers, and the CEOs deploying Africa's infrastructure investment.",
    accent: "#1a70c8",
    bgImage: "/investors.png",
  },
  {
    num: "03",
    icon: Network,
    title: "Cross-Sector Partnerships",
    desc: "Infrastructure stakeholders, technology providers, and logistics operators converge to build transformative coalitions.",
    accent: "#f4a200",
    bgImage: "/stakeholders.png",
  },
  {
    num: "04",
    icon: Globe,
    title: "AfCFTA Alignment",
    desc: "Position your organisation at the forefront of Africa's continental free trade implementation and logistics corridors.",
    accent: "#3db340",
    bgImage: "/afcta.png",
  },
  {
    num: "05",
    icon: Megaphone,
    title: "Media & Visibility",
    desc: "Pan-African press, LinkedIn campaigns, and broadcast coverage amplify your brand across the continent's business elite.",
    accent: "#1a70c8",
    bgImage: "/media.png",
  },
  {
    num: "06",
    icon: Briefcase,
    title: "Bankable Projects",
    desc: "Exclusive access to pipeline projects and investment memoranda connecting capital with Africa's infrastructure gap.",
    accent: "#f4a200",
    bgImage: "/projects.png",
  },
];

export default function WhyAttend() {
  return (
    <section id="why" className="py-24 px-6 bg-[#0d1a0f]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Why Attend
            </span>
          </div>
          <h2
            className="text-[56px] sm:text-[72px] leading-none font-black text-white mb-4"
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
          <p className="text-white/45 text-base max-w-xl mb-14 leading-relaxed">
            Six compelling reasons why industry leaders choose GAMMAT as their
            platform for growth, partnership, and impact.
          </p>
        </FadeUp>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {reasons.map((reason, idx) => (
            <FadeUp key={reason.num} delay={((idx % 3) + 1) as 1 | 2 | 3}>
              <div
                className="group relative rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  backgroundImage: `url(${reason.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#0d1a0f]/82" />

                {/* Accent left border */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-0.5"
                  style={{ background: reason.accent }}
                />

                {/* Content */}
                <div className="relative px-7 py-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
                      style={{
                        background: `${reason.accent}20`,
                        border: `0.5px solid ${reason.accent}50`,
                      }}
                    >
                      <reason.icon
                        className="w-4 h-4"
                        style={{ color: reason.accent }}
                      />
                    </div>
                    <span
                      className="text-4xl font-black leading-none transition-opacity duration-300 opacity-20 group-hover:opacity-40"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        color: reason.accent,
                      }}
                    >
                      {reason.num}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <FadeUp delay={4}>
            <a
              href="/register"
              className="group inline-flex items-center gap-2 px-7 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white transition-colors hover:bg-[#3a8a3b]"
            >
              Claim Your Advantage
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
