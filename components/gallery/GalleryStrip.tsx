"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeUp from "../FadeUp";

const display = { fontFamily: "'Bebas Neue', sans-serif" } as const;

// Curated, not sequential. Pick for visual variety: stage, crowd,
// exhibition floor, handshake, dignitary, wide venue shot.
const FEATURED = [
  {
    src: "/gallery/gammat-2026-001.jpg",
    alt: "Opening keynote on the main stage",
  },
  {
    src: "/gallery/gammat-2026-010.jpg",
    alt: "Delegates in the main auditorium",
  },
  { src: "/gallery/gammat-2026-025.jpg", alt: "Exhibition floor" },
  { src: "/gallery/gammat-2026-040.jpg", alt: "Delegates in conversation" },
  { src: "/gallery/gammat-2026-060.jpg", alt: "Panel discussion" },
  { src: "/gallery/gammat-2026-085.jpg", alt: "Handshake after a meeting" },
  { src: "/gallery/gammat-2026-120.jpg", alt: "Ministerial delegation" },
  { src: "/gallery/gammat-2026-150.jpg", alt: "Wide view of the venue" },
  { src: "/gallery/gammat-2026-200.jpg", alt: "Closing ceremony" },
];

export default function GalleryStrip() {
  return (
    <section id="gallery" className="bg-[#f2f6fc] px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <FadeUp>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                className="text-4xl font-normal leading-none text-[#061330] md:text-5xl"
                style={display}
              >
                Moments from{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  GAMMAT 2026
                </span>
              </h2>
            </div>

            <Link
              href="/gallery"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#1b5fc1] transition-colors hover:text-[#061330] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b5fc1]"
            >
              View all photos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeUp>

        {/* Mosaic */}
        <FadeUp delay={1}>
          <div className="grid auto-rows-[130px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[150px] md:grid-cols-4 md:auto-rows-[160px]">
            {FEATURED.map((photo, idx) => (
              <Link
                key={photo.src}
                href="/gallery"
                aria-label={`View the full GAMMAT 2026 gallery — ${photo.alt}`}
                className={`group relative overflow-hidden rounded-xl border border-[#061330]/10 bg-[#dbe7f7] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-14px_rgba(6,19,48,0.3)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                  idx === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  quality={75}
                  sizes={
                    idx === 0
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                  className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061330]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </FadeUp>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 rounded-sm bg-[#061330] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0a1f4d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b5fc1]"
          >
            View all photos
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
