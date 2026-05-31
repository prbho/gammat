"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, MapPin, Ticket, ArrowRight, Download } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const countersRef = useRef<HTMLDivElement>(null);
  const counted = useRef(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const container = countersRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const nums =
            container.querySelectorAll<HTMLSpanElement>("[data-target]");
          nums.forEach((el) => {
            const target = Number(el.dataset.target);
            let n = 0;
            const duration = 2000;
            const step = target / (duration / 16);
            const update = () => {
              n = Math.min(n + step, target);
              el.textContent = Math.round(n) + (target >= 50 ? "+" : "");
              if (n < target) requestAnimationFrame(update);
            };
            update();
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#0d1a0f]"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* <div className="absolute inset-0 bg-linear-to-b from-[#0d1a0f]/80 via-[#0d1a0f]/60 to-[#0d1a0f]/95 z-10" /> */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(135deg, rgb(8 20 2 / 94%) 0%, rgba(0, 20, 40, 0.88) 100%)",
          }}
        />
        {/* Radial green glow matching logo */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_50%,rgba(22,82,22,0.45),transparent)] z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/gamma.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Rainbow stripe — mirrors logo arc gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 z-30"
        style={{
          background:
            "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center w-full">
          {/* Left — primary content */}
          <div>
            {/* Title */}
            <div className="mb-4">
              <h1
                className="font-black tracking-tight leading-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="block text-[72px] sm:text-[88px] lg:text-[108px] text-white leading-none">
                  GAMMAT
                </span>

                <span
                  className="text-[68px] sm:text-[84px] lg:text-[100px] leading-none"
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
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase text-white/45 mb-8 leading-relaxed max-w-md">
              Global Aviation, Maritime &amp; Mobility
              <br />
              Access &amp; Tech Summit
            </p>

            {/* Meta */}
            <div className="flex flex-col gap-3 mb-10">
              {[
                { Icon: Calendar, label: "5 November 2026", sub: "One Day" },
                {
                  Icon: MapPin,
                  label: "Oriental Hotel",
                  sub: "Victoria Island, Lagos",
                },
              ].map(({ Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-lg text-white/80">
                    <span className="font-semibold text-white">{label}</span>
                    &nbsp;·&nbsp;{sub}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white transition-colors hover:bg-[#3a8a3b]"
              >
                <Ticket className="w-4 h-4" />
                Secure Your Pass
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="#sponsors"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/20 rounded-md text-sm font-semibold text-white/75 transition-colors hover:border-white/40 hover:text-white"
              >
                Become a Sponsor
              </Link>

              <Link
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/20 rounded-md text-sm font-semibold text-white/75 transition-colors hover:border-white/40 hover:text-white"
              >
                <Download className="w-4 h-4" />
                Brochure
              </Link>
            </div>
          </div>

          {/* Right — stats */}
          <div
            ref={countersRef}
            className="hidden lg:flex flex-col items-end gap-4"
          >
            {[
              { target: 500, label: "Delegates" },
              { target: 30, label: "Speakers" },
              { target: 12, label: "Countries" },
            ].map(({ target, label }, i) => (
              <div key={label}>
                {i > 0 && <div className="h-px w-full bg-white/10 mb-4" />}
                <div className="text-right">
                  <div
                    className="text-5xl font-black text-white leading-none"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    <span data-target={target}>0</span>
                  </div>
                  <div className="text-[11px] font-semibold tracking-widest uppercase text-white/35 mt-1">
                    {label}
                  </div>
                </div>
              </div>
            ))}

            <div className="h-px w-full bg-white/10 mt-2" />
            <div className="border border-green-500/30 bg-green-500/10 rounded-md px-4 py-2.5 text-right">
              <span className="block text-[11px] font-bold tracking-widest uppercase text-green-400">
                High Impact
              </span>
              <span className="block text-[10px] font-semibold tracking-widest uppercase text-white/35 mt-0.5">
                One Day Summit
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bebas Neue font — add to your layout.tsx or _document.tsx instead */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>
    </section>
  );
}
