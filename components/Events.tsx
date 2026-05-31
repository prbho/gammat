"use client";

import {
  GraduationCap,
  Building2,
  Handshake,
  ArrowRight,
  Calendar,
  Users,
  Target,
} from "lucide-react";
import FadeUp from "./FadeUp";

const events = [
  {
    icon: GraduationCap,
    tag: "Knowledge",
    title: "The Summit",
    desc: "Gain insights from industry experts, policymakers, and innovators shaping the future of aviation, maritime, logistics, and transport infrastructure across Africa.",
    accentColor: "#3db340",
    bgImage: "/conf.jpg",
  },
  {
    icon: Building2,
    tag: "Showcase",
    title: "The Exhibition",
    desc: "Explore or showcase cutting-edge technologies, infrastructure solutions, and service providers driving the next generation of aviation, maritime, logistics, and transport systems across Africa.",
    accentColor: "#1a70c8",
    bgImage: "/events.jpg",
  },
  {
    icon: Handshake,
    tag: "Partnerships",
    title: "Networking",
    desc: "Connect with government leaders, executives, investors, and innovators to build partnerships and unlock transformative opportunities across Africa's transport ecosystem.",
    accentColor: "#f4a200",
    bgImage: "/networking.jpg",
  },
];

export default function Events() {
  return (
    <section id="objectives" className="pb-24 px-6 bg-[#f7f6f2]">
      <div className="max-w-5xl mx-auto">
        {/* Events Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {events.map((event, idx) => (
            <FadeUp key={event.title} delay={(idx + 1) as 1 | 2 | 3}>
              <div
                className="group relative rounded-xl overflow-hidden h-full transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  backgroundImage: `url(${event.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#0d1a0f]/80" />

                {/* Accent bottom border — uses each card's brand color */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: event.accentColor }}
                />

                {/* Content */}
                <div className="relative p-7 h-full flex flex-col min-h-85">
                  {/* Tag */}
                  <span
                    className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] uppercase mb-4"
                    style={{ color: event.accentColor }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: event.accentColor }}
                    />
                    {event.tag}
                  </span>

                  {/* Icon + Title */}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: `${event.accentColor}22`,
                        border: `0.5px solid ${event.accentColor}55`,
                      }}
                    >
                      <event.icon
                        className="w-4 h-4"
                        style={{ color: event.accentColor }}
                      />
                    </div>
                    <h3
                      className="font-black text-white leading-none pt-1.5"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "32px",
                      }}
                    >
                      {event.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-white/55 text-sm leading-relaxed grow">
                    {event.desc}
                  </p>

                  {/* CTA */}
                  <a
                    href="/register"
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase mt-6 transition-all duration-200 group/link"
                    style={{ color: event.accentColor }}
                  >
                    Reserve Seat
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Info bar */}
        <FadeUp delay={4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border border-[#d4d8d0] bg-white rounded-lg px-6 py-4">
            {[
              { Icon: Calendar, text: "5th November 2026" },
              { Icon: Users, text: "Limited Seats Available" },
              { Icon: Target, text: "High-Impact Sessions" },
            ].map(({ Icon, text }, i) => (
              <div key={text} className="flex items-center gap-5">
                {i > 0 && (
                  <span className="hidden sm:block w-px h-4 bg-[#d4d8d0]" />
                )}
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#3B6D11]" />
                  <span className="text-sm text-[#4a5a4a] font-medium">
                    {text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
