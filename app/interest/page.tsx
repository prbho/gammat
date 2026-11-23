import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Tag, Mic, Images, Play } from "lucide-react";
import InterestForm from "@/components/InterestForm";

export const metadata: Metadata = {
  title: "Register interest for GAMMAT 2027",
  description:
    "Be first to hear when GAMMAT 2027 registration opens. Priority pricing, speaker announcements and agenda drops before public release.",
};

const GRADIENT =
  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)";
const RAINBOW =
  "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)";
const display = { fontFamily: "'Bebas Neue', sans-serif" } as const;
const gradientText = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const perks = [
  {
    icon: Calendar,
    title: "First to know",
    body: "An email the moment 2027 registration opens — before it goes public.",
  },
  {
    icon: Tag,
    title: "Priority pricing",
    body: "Early-bird rates and package allocation before public release.",
  },
  {
    icon: Mic,
    title: "Insider updates",
    body: "Speaker announcements, agenda drops, and venue news as they happen.",
  },
];

export default function InterestPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f2]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#061330] px-6 pb-16 pt-32">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_85%_40%,rgba(27,95,193,0.35),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-0.5 w-6 bg-[#1b5fc1]" />
            <span className="text-sm font-semibold text-sky-300">
              GAMMAT 2027
            </span>
          </div>
          <h1
            className="mb-5 text-5xl font-normal leading-[0.95] text-white sm:text-6xl"
            style={display}
          >
            Be first in <span style={gradientText}>line for 2027</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/70">
            After GAMMAT 2026 brought Africa&apos;s transport leadership
            together in Lagos, we&apos;re already planning the next edition.
            Leave your details and we&apos;ll be in touch before public
            registration opens.
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: RAINBOW }}
        />
      </section>

      {/* Perks */}
      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {perks.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-[#d4d8d0] bg-white p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#eaf3de]">
                <Icon className="h-4 w-4 text-[#3B6D11]" />
              </div>
              <h3 className="mb-2 text-base font-bold text-[#1a2b1a]">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-[#4a5a4a]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-2xl rounded-xl border border-[#d4d8d0] bg-white p-6 sm:p-8">
          <h2 className="mb-1 text-2xl font-black text-[#1a2b1a]">
            Register your interest
          </h2>
          <p className="mb-6 text-sm text-[#4a5a4a]">
            It takes about 30 seconds. We&apos;ll only email you about GAMMAT
            2027.
          </p>
          <InterestForm />
        </div>
      </section>

      {/* Recap footer */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl rounded-xl border border-[#d4d8d0] bg-[#eaf3de] p-6 text-center">
          <p className="mb-3 text-sm font-semibold text-[#1a2b1a]">
            Curious what 2026 looked like?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-sm border border-[#3B6D11]/30 bg-white px-4 py-2 text-sm font-semibold text-[#1a2b1a] transition-colors hover:border-[#3B6D11]"
            >
              <Images className="h-3.5 w-3.5" />
              Photo gallery
            </Link>
            <Link
              href="/events#relive"
              className="inline-flex items-center gap-2 rounded-sm border border-[#3B6D11]/30 bg-white px-4 py-2 text-sm font-semibold text-[#1a2b1a] transition-colors hover:border-[#3B6D11]"
            >
              <Play className="h-3.5 w-3.5" />
              Watch highlights
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
