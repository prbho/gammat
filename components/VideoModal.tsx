"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const RAINBOW =
  "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)";

const YOUTUBE_ORIGINS = [
  "https://www.youtube.com",
  "https://www.youtube-nocookie.com",
  "https://i.ytimg.com",
  "https://s.ytimg.com",
  "https://www.google.com",
  "https://googlevideo.com",
];

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  videoId: string;
  title?: string;
  /** Start offset in seconds (mirrors YouTube's `?t=` parameter). */
  start?: number;
  channelUrl?: string;
  channelHandle?: string;
  ctaCopy?: string;
}

export default function VideoModal({
  open,
  onClose,
  videoId,
  title = "Watch the highlights",
  start,
  channelUrl = "https://www.youtube.com/@AspireWest",
  channelHandle = "@AspireWest",
  ctaCopy = "Enjoying the recap? Explore more keynotes, panels, and summit stories on our channel.",
}: VideoModalProps) {
  /* Preconnect hints — run once per page, even while closed. */
  useEffect(() => {
    for (const origin of YOUTUBE_ORIGINS) {
      if (
        document.head.querySelector(`link[rel="preconnect"][href="${origin}"]`)
      ) {
        continue;
      }

      const preconnect = document.createElement("link");
      preconnect.rel = "preconnect";
      preconnect.href = origin;
      preconnect.crossOrigin = "anonymous";
      document.head.appendChild(preconnect);

      const dns = document.createElement("link");
      dns.rel = "dns-prefetch";
      dns.href = origin;
      document.head.appendChild(dns);
    }
  }, []);

  if (!open) return null;

  // Inner component mounts fresh on each open, so `loaded` resets
  // naturally without needing a setState-in-effect.
  return (
    <VideoModalInner
      onClose={onClose}
      videoId={videoId}
      title={title}
      start={start}
      channelUrl={channelUrl}
      channelHandle={channelHandle}
      ctaCopy={ctaCopy}
    />
  );
}

interface InnerProps {
  onClose: () => void;
  videoId: string;
  title: string;
  start?: number;
  channelUrl: string;
  channelHandle: string;
  ctaCopy: string;
}

function VideoModalInner({
  onClose,
  videoId,
  title,
  start,
  channelUrl,
  channelHandle,
  ctaCopy,
}: InnerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [loaded, setLoaded] = useState(false);

  /* Escape to close, scroll lock, focus the close button. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [onClose]);

  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    ...(start ? { start: String(start) } : {}),
  });
  const embedSrc = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[70] flex flex-col backdrop-blur-md"
    >
      <div className="h-1 w-full shrink-0" style={{ background: RAINBOW }} />

      <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-sky-300">
          {title}
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div
        className="flex flex-1 items-center justify-center px-4 pb-6 sm:px-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_40px_90px_-25px_rgba(0,0,0,0.9)]">
            <div className="aspect-video w-full">
              <iframe
                src={embedSrc}
                title={title}
                onLoad={() => setLoaded(true)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className={`h-full w-full transition-opacity duration-500 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {/* Loading skeleton */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#061330] transition-opacity duration-500 ${
                loaded ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="relative flex h-12 w-12 items-center justify-center">
                <span className="absolute inset-0 rounded-full border-2 border-white/10" />
                <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-red-600 motion-reduce:animate-none" />
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-white/70"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>

              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                Loading video…
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-between gap-3 py-3 sm:flex-row">
            <p className="text-center text-xs leading-relaxed text-white/60 sm:text-left sm:text-sm">
              {ctaCopy}
            </p>
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit the ${channelHandle} YouTube channel`}
              className="group inline-flex shrink-0 items-center gap-2 rounded-sm bg-red-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:text-sm"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
                aria-hidden="true"
              >
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
              </svg>
              Visit {channelHandle}
              <svg
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
