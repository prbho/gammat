"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import InterestForm from "./InterestForm";

const RAINBOW =
  "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function InterestModal({ open, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="interest-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-[#061330]/50 p-4 sm:items-center"
    >
      <div className="relative my-8 w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="h-1 w-full" style={{ background: RAINBOW }} />

        <div className="flex items-start justify-between gap-4 px-6 pt-5">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#04102a]">
              GAMMAT 2027
            </p>
            <h2
              id="interest-modal-title"
              className="text-2xl font-black leading-tight text-[#0a1429]"
            >
              Be first in line
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-sm p-1 text-[#4a5a4a]/60 transition-colors hover:text-[#04102a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04102a]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 pb-6 pt-4">
          <p className="mb-5 text-sm leading-relaxed text-[#4a5a4a]">
            Leave your details and we&apos;ll contact you the moment 2027
            registration opens, with priority pricing before public release.
          </p>
          <InterestForm compact onSuccess={() => {}} />
        </div>
      </div>
    </div>
  );
}
