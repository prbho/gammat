// components/Partners.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const RAINBOW =
  "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)";

// Partner data, with an optional `website` for external links
const partnersData = [
  {
    id: 1,
    name: "NIMASA",
    category: "Maritime Authority",
    imageSrc: "/partners/nimasa-logo.png",
    imageAlt: "NIMASA logo",
    logoBg: "bg-sky-900/50",
    accent: "#1a70c8",
    website: "https://www.nimasa.gov.ng",
  },
  {
    id: 2,
    name: "LAGRIDE",
    category: "Lagos City Ride-Hailing",
    imageSrc: "/partners/lagride-logo.png",
    imageAlt: "LagRide logo",
    logoBg: "bg-white/10",
    accent: "#3db340",
    website: "https://www.lagride.ng/",
  },
  {
    id: 3,
    name: "Federal Ministry of Aviation",
    category: "Aviation Authority",
    imageSrc: "/partners/federal_ministry-of-aviation.png",
    imageAlt: "Federal Ministry of Aviation logo",
    logoBg: "bg-blue-900/30",
    accent: "#f4a200",
    website: "https://aviation.gov.ng",
  },
  {
    id: 4,
    name: "Ministry of Defence",
    category: "Defense Authority",
    imageSrc: "/partners/ministry-of-defence.png",
    imageAlt: "Ministry of Defence logo",
    logoBg: "bg-slate-600/30",
    accent: "#6e28d9",
    website: "https://defence.gov.ng",
  },
  {
    id: 5,
    name: "ELIAD",
    category: "Entrepreneurship",
    imageSrc: "/partners/Entrepreneurs-for-African-Development-logo.png",
    imageAlt: "Entrepreneurs for African Development logo",
    logoBg: "bg-amber-900",
    accent: "#c4267a",
    website:
      "https://www.linkedin.com/in/enterprise-leadership-initiative-for-africa-development-eliad-3b997140a/",
  },
];

export default function Partners() {
  return (
    <section className="relative overflow-hidden bg-[#061330] px-4 py-20 sm:px-6 lg:px-8">
      {/* Blue glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(27,95,193,0.28),transparent)]" />

      {/* Rainbow stripes, mirror the logo arc */}
      <div
        className="absolute left-0 right-0 top-0 z-10 h-1"
        style={{ background: RAINBOW }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-10 h-1"
        style={{ background: RAINBOW }}
      />

      <div className="relative z-20 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium text-white/60 sm:text-base">
            The organisations behind GAMMAT 2026
          </p>
          <h2
            className="mb-4 text-5xl font-normal text-white md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Our{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Partners
            </span>
          </h2>
        </div>

        {/* Partners grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-5 px-6 py-14">
          {partnersData.map((partner) => (
            <PartnerCard
              key={partner.id}
              name={partner.name}
              category={partner.category}
              imageSrc={partner.imageSrc}
              imageAlt={partner.imageAlt}
              logoBg={partner.logoBg}
              accent={partner.accent}
              website={partner.website}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-sm text-white/55">
            Interested in partnering with GAMMAT 2027?
          </p>
          <Link
            href="/sponsorship"
            className="group inline-flex items-center gap-2 rounded-sm border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-sky-300/70 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          >
            Become a partner
            <svg
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ----- Partner card with hover overlay -----
interface PartnerCardProps {
  name: string;
  category?: string;
  imageSrc: string;
  imageAlt: string;
  logoBg?: string;
  accent?: string;
  website?: string;
}

function PartnerCard({
  name,
  category,
  imageSrc,
  imageAlt,
  logoBg = "bg-white/5",
  accent = "#1a70c8",
  website,
}: PartnerCardProps) {
  const cardContent = (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {/* Accent top rule */}
      <div
        className="absolute inset-x-0 top-0 z-10 h-1"
        style={{ background: accent }}
      />

      {/* Logo panel */}
      <div className="pb-0">
        <div
          className={`relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 transition-colors duration-300 group-hover:border-white/20 ${logoBg}`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain p-3"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
            quality={75}
            priority={false}
          />

          {/* Hover / focus overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#061330]/80 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <div className="px-3 text-center text-xs text-white">
              <span className="block text-white/70">Learn more about</span>
              <span className="mt-1 block text-sm font-semibold leading-snug">
                {name}
              </span>
              {website && (
                <ArrowUpRight
                  className="mx-auto mt-2 h-4 w-4"
                  style={{ color: accent }}
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex grow flex-col px-4 pb-4 pt-3.5">
        <h3 className="text-sm font-semibold leading-snug text-white/90 transition-colors group-hover:text-white">
          {name}
        </h3>
        {category && (
          <span className="mt-2 inline-flex items-center gap-1.5 self-start rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/60">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: accent }}
            />
            {category}
          </span>
        )}
      </div>
    </article>
  );

  if (website) {
    return (
      <Link
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#061330]"
        aria-label={`Visit ${name} website`}
      >
        {cardContent}
      </Link>
    );
  }

  return <div className="group h-full">{cardContent}</div>;
}
