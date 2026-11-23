"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import FadeUp from "@/components/FadeUp";

const RAINBOW =
  "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)";

const display = { fontFamily: "'Bebas Neue', sans-serif" } as const;

const PAGE_SIZE = 24;

export type GalleryPhoto = {
  src: string;
  alt: string;
};

export default function GalleryClient({ photos }: { photos: GalleryPhoto[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visible = photos.slice(0, visibleCount);
  const active = activeIndex === null ? null : (photos[activeIndex] ?? null);
  const hasMore = visibleCount < photos.length;

  const loadMore = () =>
    setVisibleCount((c) => Math.min(c + PAGE_SIZE, photos.length));

  // Navigation across the FULL set, even if only some are loaded in the grid.
  const go = useCallback(
    (dir: number) =>
      setActiveIndex((i) =>
        i === null ? i : (i + dir + photos.length) % photos.length,
      ),
    [photos.length],
  );

  // Escape / ← → / scroll lock while the lightbox is open.
  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };

    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [activeIndex, go]);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden px-4 pb-10 pt-28 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(27,95,193,0.28),transparent)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <FadeUp>
            <h1
              className="mt-18 text-5xl font-normal leading-[0.95] sm:text-6xl lg:text-7xl"
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
            </h1>

            <p className="max-w-2xl text-base leading-relaxed">
              {photos.length} photographs from the summit — keynotes, the
              exhibition floor, deal-making on the sidelines, and the leaders
              who made it happen.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Mosaic */}
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeUp delay={1}>
            <div className="grid auto-rows-[150px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[180px] md:grid-cols-3 lg:auto-rows-[200px] lg:grid-cols-4">
              {visible.map((photo, idx) => {
                const feature = idx % 11 === 0;
                return (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Open image: ${photo.alt}`}
                    className={`group relative overflow-hidden text-left transition-all duration-300 hover:border-white/25 hover:shadow-[0_18px_44px_-14px_rgba(0,0,0,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 ${
                      feature ? "col-span-2 row-span-2" : ""
                    }`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={
                        feature
                          ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                          : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      }
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061330]/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <span className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-[#061330]/70 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-white/70 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {String(idx + 1).padStart(3, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </FadeUp>

          {/* Load more */}
          {hasMore && (
            <div className="mt-10 text-center mb-18">
              <button
                type="button"
                onClick={loadMore}
                className="group inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-white/5 px-7 py-3 text-sm font-semibold transition-colors hover:border-state-400 hover:bg-state-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                Load more photos
                <span className="text-xs font-normal tabular-nums text-white/50">
                  {visibleCount} / {photos.length}
                </span>
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Rainbow rule */}
      <div className="h-1 w-full" style={{ background: RAINBOW }} />

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveIndex(null);
          }}
          className="fixed inset-0 z-50 flex flex-col bg-[#061330]/96 backdrop-blur-md"
        >
          <div
            className="h-1 w-full shrink-0"
            style={{ background: RAINBOW }}
          />

          {/* Top bar */}
          <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-sky-300">
              GAMMAT 2026
            </span>
            <div className="flex items-center gap-4">
              <span className="text-xs tabular-nums text-white/50">
                {(activeIndex ?? 0) + 1} / {photos.length}
              </span>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close image viewer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Image stage */}
          <div
            className="relative flex-1"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveIndex(null);
            }}
          >
            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              fill
              sizes="100vw"
              className="object-contain p-2 sm:p-6"
              priority
            />

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#061330]/70 text-white/80 backdrop-blur transition-colors hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:left-5 sm:h-12 sm:w-12"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#061330]/70 text-white/80 backdrop-blur transition-colors hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:right-5 sm:h-12 sm:w-12"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Caption */}
          <div className="shrink-0 px-4 pb-5 pt-3 text-center sm:px-6">
            <p className="mx-auto max-w-2xl text-sm text-white/75">
              {active.alt}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
