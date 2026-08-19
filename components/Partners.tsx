// components/Partners.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

// Partner data — now includes optional `website` for external links
const partnersData = [
  {
    id: 1,
    name: "NIMASA",
    category: "Maritime Authority",
    imageSrc: "/partners/nimasa-logo.png",
    imageAlt: "NIMASA logo",
    logoBg: "bg-sky-900/50",
    website: "https://www.nimasa.gov.ng",
  },
  {
    id: 2,
    name: "LAGRIDE",
    category: "Lagos City Ride-Hailing",
    imageSrc: "/partners/lagride-logo.png",
    imageAlt: "LagRide logo",
    logoBg: "bg-white/10",
    website: "https://www.lagride.ng/",
  },
  {
    id: 3,
    name: "Federal Ministry of Aviation",
    category: "Aviation Authority",
    imageSrc: "/partners/federal_ministry-of-aviation.png",
    imageAlt: "Federal Ministry of Aviation logo",
    logoBg: "bg-blue-900/30",
    website: "https://aviation.gov.ng",
  },
  {
    id: 4,
    name: "Ministry of Defence",
    category: "Defense Authority",
    imageSrc: "/partners/ministry-of-defence.png",
    imageAlt: "Ministry of Defence logo",
    logoBg: "bg-green-900/30",
    website: "https://defence.gov.ng",
  },
  {
    id: 5,
    name: "ELIAD",
    category: "Entrepreneurship",
    imageSrc: "/partners/Entrepreneurs-for-African-Development-logo.png",
    imageAlt: "Entrepreneurs for African Development logo",
    logoBg: "bg-amber-900",
    website:
      "https://www.linkedin.com/in/enterprise-leadership-initiative-for-africa-development-eliad-3b997140a/",
  },
];

export default function Partners() {
  return (
    <section className="relative overflow-hidden bg-[#0d1a0f] py-20 px-4 sm:px-6 lg:px-8">
      {/* Radial green glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(22,82,22,0.30),transparent)] pointer-events-none" />
      <div className="max-w-5xl mx-auto">
        {/* Rainbow stripes */}
        <div
          className="absolute top-0 left-0 right-0 h-1 z-10"
          style={{
            background:
              "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-1 z-10"
          style={{
            background:
              "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)",
          }}
        />

        <div className="relative z-20 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase text-white/45 mb-3">
              Trusted by industry leaders
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4"
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

          {/* Partners Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">
            {partnersData.map((partner) => (
              <PartnerCard
                key={partner.id}
                name={partner.name}
                category={partner.category}
                imageSrc={partner.imageSrc}
                imageAlt={partner.imageAlt}
                logoBg={partner.logoBg}
                website={partner.website}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-sm text-white/40 mb-4 uppercase">
              Secure a Seat
            </p>
            <Link
              href="/sponsorship"
              className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/20 rounded-md text-sm font-semibold text-white/75 transition-colors hover:border-green-500/50 hover:text-white uppercase tracking-wider"
            >
              Register
              <svg
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
      </div>
    </section>
  );
}

// ----- Partner Card Component with hover overlay -----
interface PartnerCardProps {
  name: string;
  category?: string;
  imageSrc: string;
  imageAlt: string;
  logoBg?: string;
  website?: string;
}

function PartnerCard({
  name,
  category,
  imageSrc,
  imageAlt,
  logoBg = "bg-white/5",
  website,
}: PartnerCardProps) {
  // Card content shared between linked and non-linked versions
  const cardContent = (
    <div className="flex flex-col items-center text-center">
      {/* Logo container — with hover overlay */}
      <div
        className={`relative w-full aspect-4/3 rounded-xl overflow-hidden flex items-center justify-center mb-4 border border-white/10 group-hover:border-green-500/30 transition-colors ${logoBg}`}
      >
        {/* Partner Logo */}
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-contain p-3"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          quality={100}
          priority={false}
        />

        {/* HOVER OVERLAY — appears on group hover */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-white text-xs sm:text-sm text-center px-3">
            <span className="block">Learn more about</span>{" "}
            <span className="font-semibold text-sm sm:text-lg md:text-xl tracking-wide">
              {name}
            </span>
          </div>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
        {name}
      </h3>
      {category && (
        <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/30 mt-1">
          {category}
        </p>
      )}
    </div>
  );

  // If a website is provided, wrap the card in a clickable anchor
  if (website) {
    return (
      <Link
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="group block transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500/50 rounded-xl"
        aria-label={`Visit ${name} website`}
      >
        {cardContent}
      </Link>
    );
  }

  // Otherwise render as a static card (no link)
  return <div className="group">{cardContent}</div>;
}
