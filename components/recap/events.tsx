"use client";

import { GraduationCap, Building2, Handshake, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "../FadeUp";

const events = [
  {
    icon: GraduationCap,
    tag: "Knowledge",
    title: "The Summit",
    desc: "Industry experts, policymakers, and innovators shared insights on the future of aviation, maritime, logistics, and transport infrastructure across Africa.",
    accentColor: "#3db340",
    bgImage: "/recap/gammat-summit-speaker.webp",
    href: "/sponsorship",
    ctaText: "Meet our sponsors",
  },
  {
    icon: Building2,
    tag: "Showcase",
    title: "The Exhibition",
    desc: "Exhibitors showcased cutting-edge technologies, infrastructure solutions, and services driving the next generation of aviation, maritime, logistics, and transport systems across Africa.",
    accentColor: "#1a70c8",
    bgImage: "/recap/zenith-at-gammat.webp",
    href: "/exhibition",
    ctaText: "See the exhibition",
  },
  {
    icon: Handshake,
    tag: "Partnerships",
    title: "Networking",
    desc: "Government leaders, executives, investors, and innovators connected to build partnerships and open new opportunities across Africa's transport ecosystem.",
    accentColor: "#f4a200",
    bgImage: "/recap/networking.webp",
    href: "/register",
    ctaText: "Join us in 2027",
  },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400";

export default function Events() {
  return (
    <section id="objectives" className="bg-[#f2f6fc] px-6 pb-24">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Events grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {events.map((event, idx) => (
            <FadeUp key={event.title} delay={(idx + 1) as 1 | 2 | 3}>
              <Link
                href={event.href}
                className={`group block h-full rounded-2xl ${focusRing}`}
              >
                <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#061330]/10 bg-white shadow-[0_1px_2px_rgba(6,19,48,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-14px_rgba(6,19,48,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  {/* Accent top rule */}
                  <div
                    className="absolute inset-x-0 top-0 z-10 h-1"
                    style={{ background: event.accentColor }}
                  />

                  {/* Image panel */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#061330]/5">
                    <Image
                      src={event.bgImage}
                      alt={event.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    {/* Soft gradient so the badge stays legible */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061330]/55 via-transparent to-transparent" />

                    {/* Tag badge */}
                    <span
                      className="absolute bottom-3 left-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm"
                      style={{ background: `${event.accentColor}dd` }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                      {event.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex grow flex-col p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          background: `${event.accentColor}14`,
                          border: `1px solid ${event.accentColor}33`,
                        }}
                      >
                        <event.icon
                          className="h-4 w-4"
                          style={{ color: event.accentColor }}
                        />
                      </div>
                      <h3 className="text-xl font-black leading-tight text-[#061330]">
                        {event.title}
                      </h3>
                    </div>

                    <p className="grow text-sm leading-7 text-[#3d4b66]">
                      {event.desc}
                    </p>

                    <div
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold"
                      style={{ color: event.accentColor }}
                    >
                      {event.ctaText}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                    </div>
                  </div>
                </article>
              </Link>
            </FadeUp>
          ))}
        </div>

        {/* Info bar */}
        {/* <FadeUp delay={4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 rounded-lg border border-[#061330]/10 bg-white px-6 py-4">
            {facts.map(({ Icon, text }, i) => (
              <div key={text} className="flex items-center gap-5">
                {i > 0 && (
                  <span className="hidden h-4 w-px bg-[#061330]/15 sm:block" />
                )}
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-[#1b5fc1]" />
                  <span className="text-sm font-medium text-[#3d4b66]">
                    {text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeUp> */}
      </div>
    </section>
  );
}
