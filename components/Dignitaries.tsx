"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeUp from "./FadeUp";

const dignitaries = [
  {
    image: "/festus-keyamo.png",
    name: "Hon. Festus Keyamo",
    role: "Minister of Aviation",
    country: "Nigeria",
  },
  {
    image: "/ransford-gyampo.png",
    name: "Prof. Ransford Edward Gyampo",
    role: "CEO, Ghana Shippers Council",
    country: "Ghana",
  },
  {
    image: "/adegboyega-oyetola.png",
    name: "H.E. Adegboyega Oyetola",
    role: "Minister, Marine & Blue Economy",
    country: "Nigeria",
  },
  {
    image: "/mohammed-abdool.png",
    name: "Mr. Mohammed Abdool",
    role: "Transnet National Ports Authority",
    country: "South Africa",
  },
  {
    image: "/olasupo-olusi.png",
    name: "Dr. Olasupo Olusi",
    role: "MD, Bank of Industry",
    country: "Nigeria",
  },
  {
    image: "/folasade-ogunsola.png",
    name: "Prof. Folasade Ogunsola, FAS",
    role: "Vice Chancellor, University of Lagos",
    country: "Nigeria",
  },
  {
    image: "/catp-william-ruto.png",
    name: "Captain William Ruto, CEO",
    role: "Kenya Ports Authority",
    country: "Kenya",
  },
  {
    image: "/chris-najomo.png",
    name: "Capt. Chris Ona Najomo",
    role: "Director General, NCAA",
    country: "Nigeria",
  },
];

const ACCENT = "#1b5fc1";

export default function Dignitaries() {
  return (
    <section id="dignitaries" className="bg-[#f2f6fc] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <FadeUp>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-0.5 w-6 bg-[#1b5fc1]" />
            <span className="text-sm font-semibold text-[#1b5fc1]">
              Speakers &amp; leaders
            </span>
          </div>
          <h2
            className="mb-3 text-[56px] font-normal leading-none text-[#061330] sm:text-[80px]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Dignitaries &amp;{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Leaders
            </span>
          </h2>
          <p className="mb-12 text-base text-[#3d4b66]">
            Ministers, CEOs, regulators &amp; industry titans
          </p>
        </FadeUp>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {dignitaries.map((dignitary, idx) => (
            <FadeUp
              key={dignitary.name}
              delay={((idx % 4) + 1) as 1 | 2 | 3 | 4}
            >
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#061330]/10 bg-white shadow-[0_1px_2px_rgba(6,19,48,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5fc1]/40 hover:shadow-[0_18px_44px_-14px_rgba(6,19,48,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                {/* Accent top rule */}
                <div
                  className="absolute inset-x-0 top-0 z-10 h-1"
                  style={{ background: ACCENT }}
                />

                {/* Image panel */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#dbe7f7]">
                  <Image
                    src={dignitary.image}
                    alt={dignitary.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  {/* Soft scrim so the badge stays legible */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061330]/45 via-transparent to-transparent" />

                  {/* Country badge */}
                  <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#061330]/75 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-sky-300 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                    {dignitary.country}
                  </span>
                </div>

                {/* Content */}
                <div className="flex grow flex-col border-t border-[#061330]/10 px-3.5 py-3.5">
                  <h3 className="mb-1 line-clamp-2 text-sm font-bold leading-snug text-[#061330]">
                    {dignitary.name}
                  </h3>
                  <p className="mt-auto line-clamp-2 text-xs font-semibold leading-snug text-[#1b5fc1]">
                    {dignitary.role}
                  </p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <FadeUp delay={4}>
            <Link
              href="/dignitaries"
              className="group inline-flex items-center gap-2 rounded-sm bg-[#061330] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0a1f4d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b5fc1]"
            >
              View all dignitaries
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
