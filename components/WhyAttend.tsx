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
    desc: "Direct access to Africa's transport policy architects: shape regulations, build relationships, influence the agenda.",
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
    <section id="why" className="bg-[#061330] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <FadeUp>
          <div className="mb-16 text-center">
            <h2
              className="mb-6 text-5xl font-normal leading-none text-white sm:text-6xl lg:text-7xl"
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
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/65">
              Six compelling reasons why industry leaders choose GAMMAT as their
              platform for growth, partnership, and impact.
            </p>
          </div>
        </FadeUp>

        {/* Cards */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, idx) => (
            <FadeUp
              key={reason.num}
              delay={((idx % 3) + 2) as 0 | 1 | 2 | 3 | 4 | 5}
            >
              <article
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                style={{
                  backgroundColor: "#08183a",
                  border: `1px solid ${reason.accent}33`,
                }}
              >
                {/* Visual panel (its own div, not a background) */}
                <div
                  className="relative flex h-32 shrink-0 items-end justify-between overflow-hidden p-5"
                  style={{
                    background: `linear-gradient(135deg, ${reason.accent}48 0%, ${reason.accent}12 55%, transparent 100%)`,
                  }}
                >
                  {/* Dot texture, masked to fade out */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(${reason.accent}66 1px, transparent 1px)`,
                      backgroundSize: "13px 13px",
                      WebkitMaskImage:
                        "linear-gradient(120deg, #000 10%, transparent 72%)",
                      maskImage:
                        "linear-gradient(120deg, #000 10%, transparent 72%)",
                    }}
                  />

                  {/* Soft accent glow */}
                  <div
                    className="pointer-events-none absolute -left-10 -top-12 h-32 w-32 rounded-full blur-2xl"
                    style={{ background: `${reason.accent}30` }}
                  />

                  {/* Icon tile */}
                  <div
                    className="relative flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    style={{
                      background: "rgba(8, 24, 58, 0.65)",
                      border: `1px solid ${reason.accent}80`,
                      boxShadow: `0 0 0 4px ${reason.accent}14`,
                    }}
                  >
                    <reason.icon
                      className="h-6 w-6"
                      style={{ color: reason.accent }}
                    />
                  </div>

                  {/* Ghost number */}
                  <span
                    className="relative text-5xl font-normal leading-none opacity-30 transition-opacity duration-500 group-hover:opacity-60"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      color: reason.accent,
                    }}
                    aria-hidden="true"
                  >
                    {reason.num}
                  </span>
                </div>

                {/* Content */}
                <div className="flex grow flex-col p-6">
                  <h3 className="mb-3 text-lg font-black text-white md:text-xl">
                    {reason.title}
                  </h3>

                  <p className="mb-5 text-sm leading-relaxed text-white/70 md:text-base">
                    {reason.desc}
                  </p>

                  {/* Tagline */}
                  <div className="mt-auto flex items-start gap-2.5 border-t border-white/10 pt-4">
                    <span
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: reason.accent }}
                    />
                    <p className="text-sm text-white/55">{reason.longDesc}</p>
                  </div>
                </div>

                {/* Accent bottom rule */}
                <div
                  className="h-0.5 w-full transition-all duration-300 group-hover:h-1"
                  style={{ background: reason.accent }}
                />
              </article>
            </FadeUp>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <FadeUp delay={5}>
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-sm border border-white/60 hover:border-white px-6 py-3 text-sm font-semibold text-white/90 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              Join us in 2027
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
