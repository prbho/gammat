// app/events/page.tsx
"use client";

import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Mic,
  Handshake,
  Award,
  TrendingUp,
  ArrowRight,
  GraduationCap,
  Building2,
  Sparkles,
  Coffee,
  Wine,
} from "lucide-react";
import Link from "next/link";

const eventAgenda = [
  {
    time: "08:00 - 09:00",
    title: "Registration & Welcome Coffee",
    description: "Networking breakfast and exhibition viewing",
    icon: Coffee,
    track: "Networking",
  },
  {
    time: "09:00 - 09:30",
    title: "Opening Ceremony",
    description:
      "Welcome address by Host Country Minister & Keynote by AfCFTA Secretary-General",
    icon: Award,
    track: "Plenary",
  },
  {
    time: "09:30 - 10:45",
    title: "Ministerial Panel: Africa's Transport Integration",
    description:
      "High-level discussion on policy frameworks and regional connectivity",
    icon: Users,
    track: "Plenary",
  },
  {
    time: "10:45 - 11:15",
    title: "Networking Break & Exhibition",
    description: "Coffee break and exhibition viewing",
    icon: Coffee,
    track: "Networking",
  },
  {
    time: "11:15 - 12:30",
    title: "Breakout Sessions",
    description: "Parallel tracks: Aviation, Maritime, Logistics & Technology",
    icon: Mic,
    track: "Breakout",
  },
  {
    time: "12:30 - 13:30",
    title: "Leadership Luncheon",
    description: "VIP networking lunch with speakers and dignitaries",
    icon: Wine,
    track: "Networking",
  },
  {
    time: "13:30 - 15:00",
    title: "Investment Roundtable",
    description: "Connecting capital with bankable transport projects",
    icon: TrendingUp,
    track: "Investment",
  },
  {
    time: "15:00 - 16:30",
    title: "CEO Dialogue & Panel Discussions",
    description: "Industry leaders share insights on innovation and growth",
    icon: Building2,
    track: "Plenary",
  },
  {
    time: "16:30 - 17:00",
    title: "Closing Ceremony",
    description: "Key takeaways and GAMMAT 2027 announcement",
    icon: Award,
    track: "Plenary",
  },
  {
    time: "19:00 - 22:00",
    title: "Gala Dinner & Awards Night",
    description: "Celebrating excellence in African transport",
    icon: Sparkles,
    track: "Gala",
  },
];

const eventTracks = [
  {
    icon: GraduationCap,
    title: "Seminar Track",
    description: "Knowledge sessions with industry experts",
  },
  {
    icon: Building2,
    title: "Summit Track",
    description: "High-level strategic discussions",
  },
  {
    icon: Handshake,
    title: "Networking Track",
    description: "Structured networking opportunities",
  },
];

// const speakers = [
//   {
//     name: "Hon. Festus Keyamo",
//     role: "Minister of Aviation, Nigeria",
//     topic: "Aviation Expansion",
//   },
//   {
//     name: "H.E. Wamkele Mene",
//     role: "Secretary-General, AfCFTA",
//     topic: "Trade Integration",
//   },
//   {
//     name: "Dr. Abubakar Dantsoho",
//     role: "MD, Nigerian Ports Authority",
//     topic: "Port Modernization",
//   },
//   { name: "Dr. Dayo Mobereola", role: "DG, NIMASA", topic: "Blue Economy" },
// ];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[#f7f6f2]">
      {/* ── Hero ── */}
      <section className="px-6 py-36 mb-20 bg-[#295d1b]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-6 h-0.5 bg-white/50" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/70">
              5th November 2026
            </span>
            <span className="w-6 h-0.5 bg-white/50" />
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-white/80 mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Event{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Programme
            </span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            A dynamic day of high-impact sessions, strategic networking, and
            transformative discussions.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#d4d8d0] rounded-md">
              <Calendar className="w-3.5 h-3.5 text-[#3B6D11]" />
              <span className="text-[#1a2b1a] text-sm font-medium">
                5th November 2026
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#d4d8d0] rounded-md">
              <MapPin className="w-3.5 h-3.5 text-[#3B6D11]" />
              <span className="text-[#1a2b1a] text-sm font-medium">
                Oriental Hotel, Lagos
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#d4d8d0] rounded-md">
              <Clock className="w-3.5 h-3.5 text-[#3B6D11]" />
              <span className="text-[#1a2b1a] text-sm font-medium">
                8:00 AM - 10:00 PM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Event Tracks (Three Pillars) ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Engagement Pillars
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-[#1a2b1a] mb-12"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Three Pillars of{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Engagement
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {eventTracks.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white border border-[#d4d8d0] rounded-xl p-6 hover:border-[#3B6D11]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-md bg-[#eaf3de] flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-[#3B6D11]" />
                </div>
                <h3 className="text-base font-bold text-[#1a2b1a] mb-2">
                  {title}
                </h3>
                <p className="text-sm text-[#4a5a4a] leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full Agenda ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Schedule
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-[#1a2b1a] mb-10"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Full{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Agenda
            </span>
          </h2>
          <div className="space-y-3">
            {eventAgenda.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#d4d8d0] rounded-xl p-5 hover:border-[#3B6D11]/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-40">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#3B6D11]" />
                      <span className="text-[#3B6D11] font-semibold text-sm">
                        {item.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="w-4 h-4 text-[#3B6D11]" />
                      <h3 className="text-base font-bold text-[#1a2b1a]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[#4a5a4a] text-sm">{item.description}</p>
                  </div>
                  <div className="md:w-28">
                    <span className="inline-block px-2 py-1 bg-[#eaf3de] rounded text-[#3B6D11] text-[10px] font-bold uppercase tracking-wider">
                      {item.track}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Speakers ── */}
      {/* <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Industry Leaders
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-[#1a2b1a] mb-12"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Featured{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Speakers
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {speakers.map((speaker) => (
              <div
                key={speaker.name}
                className="bg-white border border-[#d4d8d0] rounded-xl p-6 text-center hover:border-[#3B6D11]/40 transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#eaf3de] flex items-center justify-center">
                  <Users className="w-7 h-7 text-[#3B6D11]" />
                </div>
                <h3 className="font-bold text-[#1a2b1a] mb-1">
                  {speaker.name}
                </h3>
                <p className="text-[#3B6D11] text-xs font-semibold mb-2">
                  {speaker.role}
                </p>
                <p className="text-[#4a5a4a] text-[11px]">
                  Speaking on: {speaker.topic}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── CTA ── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#0d1a0f] rounded-xl p-12 text-center relative overflow-hidden">
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)",
              }}
            />
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-white mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Secure Your{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Seat
              </span>
            </h2>
            <p className="text-white/40 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Don&apos;t miss out on Africa&apos;s premier transport leadership
              platform.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 px-7 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors"
              >
                Register Now
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/sponsorship"
                className="inline-flex items-center gap-2 px-7 py-3 bg-transparent border border-white/20 rounded-md text-sm font-semibold text-white/70 hover:border-white/40 hover:text-white transition-colors"
              >
                Become a Sponsor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
