"use client";

import Image from "next/image";
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

export default function Dignitaries() {
  return (
    <section id="dignitaries" className="py-24 px-6 bg-[#f7f6f2]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Speakers & Leaders
            </span>
          </div>
          <h2
            className="text-[56px] sm:text-[72px] leading-none font-black text-[#1a2b1a] mb-3"
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
          <p className="text-[#4a5a4a] text-sm tracking-wide mb-12">
            Ministers, CEOs, Regulators &amp; Industry Titans
          </p>
        </FadeUp>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {dignitaries.map((dignitary, idx) => (
            <FadeUp
              key={dignitary.name}
              delay={((idx % 4) + 1) as 1 | 2 | 3 | 4}
            >
              <div className="group bg-white border border-[#d4d8d0] rounded-xl overflow-hidden hover:border-[#3B6D11]/40 transition-colors duration-300">
                {/* Image */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#eaf3de]">
                  <Image
                    src={dignitary.image}
                    alt={dignitary.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />

                  {/* Country badge */}
                  <div className="absolute top-2 right-2 bg-[#0d1a0f]/80 rounded px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {dignitary.country}
                  </div>

                  {/* Bottom gradient for name overlap effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-[#0d1a0f]/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="px-3.5 py-3 border-t border-[#d4d8d0]">
                  <h3 className="text-[13px] font-bold text-[#1a2b1a] mb-0.5 line-clamp-2 leading-snug">
                    {dignitary.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-[#3B6D11] leading-snug line-clamp-2">
                    {dignitary.role}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <FadeUp delay={4}>
            <a
              href="/dignitaries"
              className="group inline-flex items-center gap-2 px-7 py-3 bg-[#0d1a0f] border border-[#3B6D11]/40 rounded-md text-sm font-bold tracking-wider uppercase text-white transition-colors hover:bg-[#1a3318]"
            >
              View All Dignitaries
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
