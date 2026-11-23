"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import VideoModal from "./VideoModal";

const HIGHLIGHTS_VIDEO_ID = "AphgVPPhReU";
const HIGHLIGHTS_START = 12;

export default function EventsHighlightVideo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Play the GAMMAT 2026 highlights video"
        className="group relative block w-full overflow-hidden rounded-xl border border-[#d3dcec] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b5fc1]"
      >
        <div className="relative aspect-video w-full bg-[#061330]">
          <Image
            src="/gallery/gammat-2026-001.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061330]/90 via-[#061330]/40 to-[#061330]/10" />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[#061330] shadow-xl transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
              <Play className="h-6 w-6 translate-x-0.5 fill-current" />
            </span>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-300">
                Two-minute recap
              </p>
              <p
                className="text-3xl font-normal leading-none text-white sm:text-4xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Watch the highlights
              </p>
            </div>
          </div>
        </div>
      </button>

      <VideoModal
        open={open}
        onClose={() => setOpen(false)}
        videoId={HIGHLIGHTS_VIDEO_ID}
        start={HIGHLIGHTS_START}
        title="GAMMAT 2026 highlights"
      />
    </>
  );
}
