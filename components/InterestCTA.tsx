"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import InterestModal from "./InterestModal";

interface Props {
  label?: string;
  className?: string;
}

export default function InterestCTA({
  label = "Register 2027 interest",
  className,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={
          className ??
          "inline-flex items-center gap-2 rounded-sm bg-[#2d6e2e] border border-[#3d9e3e] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#3a8a3b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
        }
      >
        {label}
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
      <InterestModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
