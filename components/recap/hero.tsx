"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Play, Images } from "lucide-react";
import VideoModal from "../VideoModal";

/**
 * GAMMAT 2026 recap hero
 * Palette taken from the event ticket:
 *   night navy  #061330 / #0a1f4d
 *   royal blue  #1b5fc1
 *   sky blue    #3b9cf0
 *   white       #ffffff
 * Type: Bebas Neue (display, same as the existing site) + default sans body
 */

const STATS = [
  { target: 200, suffix: "+", label: "Delegates" },
  { target: 30, suffix: "", label: "Speakers" },
  { target: 12, suffix: "", label: "Countries" },
];

const display = { fontFamily: "'Bebas Neue', sans-serif" } as const;

// Same video the Navbar plays, so both "Watch highlights" CTAs stay in sync.
const HIGHLIGHTS_VIDEO_ID = "9-zwm67WAG0";
const HIGHLIGHTS_START = 12; // matches ?t=12s

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const counted = useRef(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ── Stat counters ─────────────────────────────────────────────── */
  useEffect(() => {
    const container = statsRef.current;
    if (!container) return;

    const nums = container.querySelectorAll<HTMLSpanElement>("[data-target]");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      nums.forEach((el) => {
        el.textContent = el.dataset.target + (el.dataset.suffix ?? "");
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || counted.current) return;
        counted.current = true;
        nums.forEach((el) => {
          const target = Number(el.dataset.target);
          const suffix = el.dataset.suffix ?? "";
          const duration = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent =
              Math.round(target * eased) + (t === 1 ? suffix : "");
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="home"
        className="relative min-h-[92vh] overflow-hidden bg-[#061330] text-white"
      >
        {/* Background: video, navy wash, horizon glow, faint grid */}
        <div className="absolute inset-0" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:hidden ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src="/vid/highlights.mp4" type="video/mp4" />
          </video>

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(6,19,48,0.97) 0%, rgba(6,19,48,0.70) 42%, rgba(10,31,77,0.60) 100%)",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_85%_55%,rgba(27,95,193,0.35),transparent_70%)]" />
        </div>

        {/* Content */}
        <div className="relative z-20 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 pb-40 pt-24 sm:px-6 lg:px-8 lg:pb-36">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            {/* Left: message */}
            <div className="text-center lg:pb-14 lg:pt-14 lg:text-left">
              {/* <p className="mb-2 flex items-center justify-center gap-2 text-sm font-medium text-sky-300 lg:justify-start">
                Summit recap
              </p> */}

              <h1
                className="font-normal leading-[0.85] tracking-tight"
                style={display}
              >
                <div className="mb-3">
                  <span className="block text-6xl text-white sm:text-7xl xl:text-8xl">
                    GAMMA
                  </span>
                  <span className="block tracking-widest text-3xl text-sky-300 sm:text-5xl xl:text-4xl">
                    Tech Summit
                  </span>
                </div>
                <span
                  className="block text-[88px] sm:text-[116px] xl:text-[144px]"
                  style={{
                    background:
                      "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  2026
                </span>
              </h1>

              <p className="mt-4 text-xs uppercase leading-relaxed tracking-[0.12em] text-white/70 sm:text-sm">
                Global Aviation, Maritime &amp; Mobility
                <br />
                Access &amp; Tech Summit
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start w-4/5 mx-auto lg:mx-auto lg:w-full">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={isModalOpen}
                  className="inline-flex w-full lg:w-auto items-center gap-2 rounded-sm bg-red-700 px-5 py-3 text-lg tracking-widest text-white transition-colors hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                  style={display}
                >
                  <span className="mx-auto flex items-center gap-2 lg:mx-0">
                    <Play className="h-3.5 w-3.5 fill-current" />
                    Watch the highlights
                  </span>
                </button>
                <Link
                  href="/gallery"
                  className="inline-flex w-full lg:w-auto uppercase items-center gap-2 tracking-widest text-lg rounded-sm border border-white/25 px-5 py-3 font-light text-white transition-colors hover:border-white/60 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  style={display}
                >
                  <span className="mx-auto flex items-center gap-2 lg:mx-0">
                    <Images className="h-3.5 w-3.5" />
                    Photo gallery{" "}
                  </span>
                </Link>
              </div>
            </div>

            {/* Right: the ticket (kept commented as before) */}
          </div>
        </div>

        {/* Info strip, echoing the ticket's divided panels */}
        <div className="absolute inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#061330]/85 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_2fr_1fr]">
              {/* Venue */}
              <div className="hidden border-white/10 py-4 pr-8 lg:block lg:border-r">
                <figcaption
                  className="flex items-center text-blue-400"
                  //   style={display}
                >
                  <span className="text-sm font-normal leading-none">
                    Admitted · 5 November 2026
                  </span>
                </figcaption>
                <div
                  className="mt-1 text-2xl font-normal leading-tight tracking-wide"
                  style={display}
                >
                  The Lagos Oriental Hotel
                </div>
                <div className="mt-0.5 text-xs text-white/55">
                  Victoria Island, Lagos, Nigeria
                </div>
              </div>

              {/* Stats */}
              <div
                ref={statsRef}
                className="grid grid-cols-3 divide-x divide-white/10 py-4 lg:px-2 lg:py-4"
              >
                {STATS.map(({ target, suffix, label }) => (
                  <div
                    key={label}
                    className="px-3 text-center lg:px-8 lg:text-left"
                  >
                    <div
                      className="text-4xl font-normal leading-none sm:text-5xl"
                      style={display}
                    >
                      <span data-target={target} data-suffix={suffix}>
                        0
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-white/55">{label}</div>
                  </div>
                ))}
              </div>

              {/* Sign-off */}
              <div className="hidden border-white/10 py-4 pl-8 lg:block lg:border-l">
                <div className="text-xs leading-5 text-white/55">
                  Powered by NIMASA &amp; Aspire West Africa
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  See you in{" "}
                  <span className="text-xl font-bold text-sky-300">2027</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="h-1"
            style={{
              background:
                "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)",
            }}
          />
        </div>
      </section>

      {/* Shared video modal (same component the Navbar uses) */}
      <VideoModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoId={HIGHLIGHTS_VIDEO_ID}
        start={HIGHLIGHTS_START}
        title="Summit highlights"
      />
    </>
  );
}
