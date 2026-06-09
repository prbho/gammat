"use client";

import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export function Select({ className = "", children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={`appearance-auto w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-[#1a2b1a] text-sm focus:outline-none focus:border-[#3B6D11] ${className}`}
        {...props}
      >
        {children}
      </select>
      {/* <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4a5a4a]/70" /> */}
    </div>
  );
}
