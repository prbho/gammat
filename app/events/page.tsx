// app/events/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
  LayoutList,
  CheckCircle,
  Images,
} from "lucide-react";
import EventsHighlightVideo from "@/components/EventsHighlightVideo";

export const metadata: Metadata = {
  title: "Event Programme | GAMMAT 2026",
  description:
    "The full programme of GAMMAT & Tech Summit 2026 at The Lagos Oriental Hotel, Victoria Island: plenaries, breakout sessions, investment roundtable, CEO dialogue and gala dinner.",
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

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400";

/* ───────────── Content ───────────── */

type Track = "Networking" | "Plenary" | "Breakout" | "Investment" | "Gala";

const trackColors: Record<Track, string> = {
  Plenary: "#1a70c8",
  Networking: "#3db340",
  Breakout: "#f4a200",
  Investment: "#6e28d9",
  Gala: "#c4267a",
};

const eventAgenda: {
  time: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  track: Track;
}[] = [
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
    title: "Seminar track",
    description:
      "Knowledge sessions with industry experts, including parallel breakouts on aviation, maritime, logistics and technology.",
  },
  {
    icon: Building2,
    title: "Summit track",
    description:
      "High-level strategic discussions: the opening ceremony, the ministerial panel and the CEO dialogue.",
  },
  {
    icon: Handshake,
    title: "Networking track",
    description:
      "Structured networking through the welcome coffee, exhibition breaks and the leadership luncheon.",
  },
];

const facts = [
  { icon: Calendar, label: "Date", value: "5th November 2026" },
  {
    icon: MapPin,
    label: "Venue",
    value: "The Lagos Oriental Hotel, Victoria Island",
  },
  { icon: Clock, label: "Programme hours", value: "8:00 AM - 10:00 PM" },
  {
    icon: LayoutList,
    label: "Sessions",
    value: `${eventAgenda.length} across the day`,
  },
];

const moments = [
  {
    src: "/gallery/gammat-2026-001.jpg",
    alt: "Opening keynote on the main stage",
  },
  {
    src: "/gallery/gammat-2026-010.jpg",
    alt: "Delegates in the main auditorium",
  },
  { src: "/gallery/gammat-2026-025.jpg", alt: "Exhibition floor" },
  { src: "/gallery/gammat-2026-060.jpg", alt: "Panel discussion" },
  { src: "/gallery/gammat-2026-085.jpg", alt: "Handshake after a meeting" },
  { src: "/gallery/gammat-2026-120.jpg", alt: "Ministerial delegation" },
];

/* ───────────── Shared pieces ───────────── */

function SectionLabel({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-0.5 w-6 bg-[#1b5fc1]" />
      <span
        className={`text-sm font-semibold ${
          onDark ? "text-sky-300" : "text-[#1b5fc1]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function TrackChip({ track }: { track: Track }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d3dcec] bg-[#f2f6fc] px-2.5 py-1 text-xs font-semibold text-[#061330]">
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: trackColors[track] }}
        aria-hidden="true"
      />
      {track}
    </span>
  );
}

/* ───────────── Page ───────────── */

export default function EventsPage() {
  const daytime = eventAgenda.filter((i) => i.track !== "Gala");
  const evening = eventAgenda.filter((i) => i.track === "Gala");

  const renderItem = (item: (typeof eventAgenda)[number]) => (
    <li key={item.time} className="relative pl-8 sm:pl-10">
      <span
        className="absolute left-0 top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#f2f6fc]"
        style={{ background: trackColors[item.track] }}
        aria-hidden="true"
      />
      <div className="rounded-xl border border-[#d3dcec] bg-white p-5 transition-colors hover:border-[#1b5fc1]/40">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#1b5fc1] md:w-40 md:shrink-0">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {item.time}
          </div>
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <item.icon className="h-4 w-4 text-[#1b5fc1]" />
              <h3 className="text-base font-bold text-[#061330]">
                {item.title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-[#3d4b66]">
              {item.description}
            </p>
          </div>
          <div className="md:w-32 md:text-right">
            <TrackChip track={item.track} />
          </div>
        </div>
      </div>
    </li>
  );

  return (
    <div className="min-h-screen bg-[#f2f6fc]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#061330] px-6 pb-0 pt-36">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_85%_40%,rgba(27,95,193,0.35),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl">
          {/* Date + concluded badge */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              <CheckCircle className="h-2.5 w-2.5" aria-hidden="true" />
              Event concluded
            </span>
          </div>

          <h1
            className="mb-6 text-5xl font-normal leading-[0.95] text-white sm:text-6xl lg:text-7xl"
            style={display}
          >
            Event <span style={gradientText}>programme</span>
          </h1>
          <p className="max-w-2xl pb-16 text-lg leading-relaxed text-white/70">
            On 5 November 2026, GAMMAT brought together Africa&apos;s transport
            leadership for a full day of high-impact sessions, strategic
            networking and transformative discussions. The programme below is
            the record of what took place.
          </p>

          <dl className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="border-b border-white/10 py-6 sm:pr-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
              >
                <dt className="mb-2 flex items-center gap-2 text-sm text-sky-300">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="text-base font-semibold leading-snug text-white">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: RAINBOW }}
        />
      </section>

      {/* ── Concluded notice ── */}
      <section className="px-6 pt-8">
        <div className="mx-auto max-w-5xl">
          <div
            role="note"
            className="flex items-start gap-3 rounded-lg border border-[#1b5fc1]/25 bg-[#e6eefb] p-4"
          >
            <CheckCircle
              className="mt-0.5 h-4 w-4 shrink-0 text-[#1b5fc1]"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-[#061330]">
              <span className="font-semibold">GAMMAT 2026 has concluded.</span>{" "}
              Thank you to everyone who took part.{" "}
              <Link
                href="/gallery"
                className="font-semibold text-[#1b5fc1] underline underline-offset-2"
              >
                Browse the photo gallery
              </Link>{" "}
              or{" "}
              <a
                href="#relive"
                className="font-semibold text-[#1b5fc1] underline underline-offset-2"
              >
                watch the highlights
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── Three pillars ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>Engagement pillars</SectionLabel>
          <h2
            className="mb-10 text-5xl font-normal leading-none text-[#061330] sm:text-6xl"
            style={display}
          >
            Three pillars of <span style={gradientText}>engagement</span>
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {eventTracks.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-[#d3dcec] bg-white p-6 transition-colors hover:border-[#1b5fc1]/50"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#dbe7f7]">
                  <Icon className="h-4 w-4 text-[#1b5fc1]" />
                </div>
                <h3 className="mb-2 text-base font-bold text-[#061330]">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[#3d4b66]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Moments from the day ── */}
      <section className="border-t border-[#d3dcec] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>From the day</SectionLabel>
              <h2
                className="text-5xl font-normal leading-none text-[#061330] sm:text-6xl"
                style={display}
              >
                Moments from <span style={gradientText}>5 November</span>
              </h2>
            </div>
            <Link
              href="/gallery"
              className={`group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#1b5fc1] transition-colors hover:text-[#061330] ${focusRing}`}
            >
              <Images className="h-4 w-4" aria-hidden="true" />
              View all photos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {moments.map((shot) => (
              <Link
                key={shot.src}
                href="/gallery"
                className={`group relative aspect-[4/3] overflow-hidden rounded-xl border border-[#d3dcec] bg-[#dbe7f7] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-14px_rgba(6,19,48,0.3)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  quality={75}
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full agenda ── */}
      <section className="border-t border-[#d3dcec] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>Schedule</SectionLabel>
          <h2
            className="mb-4 text-5xl font-normal leading-none text-[#061330] sm:text-6xl"
            style={display}
          >
            Full <span style={gradientText}>agenda</span>
          </h2>
          <p className="mb-6 max-w-2xl text-base leading-relaxed text-[#3d4b66]">
            Each session is tagged by type so you can see how the day moved
            between plenaries, parallel breakouts, investment talks and
            networking.
          </p>

          <ul className="mb-10 flex flex-wrap gap-2" aria-label="Session types">
            {(Object.keys(trackColors) as Track[]).map((t) => (
              <li key={t}>
                <TrackChip track={t} />
              </li>
            ))}
          </ul>

          <h3 className="mb-4 text-sm font-semibold text-[#3d4b66]">
            Daytime programme
          </h3>
          <ol className="relative mb-10 ml-1.5 space-y-3 border-l-2 border-[#d3dcec]">
            {daytime.map(renderItem)}
          </ol>

          <h3 className="mb-4 text-sm font-semibold text-[#3d4b66]">Evening</h3>
          <ol className="relative ml-1.5 space-y-3 border-l-2 border-[#d3dcec]">
            {evening.map(renderItem)}
          </ol>

          <div className="mt-10">
            <Link
              href="/dignitaries"
              className={`inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-[#1b5fc1] underline-offset-4 hover:underline ${focusRing}`}
            >
              Meet the speakers and dignitaries
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Highlight video ── */}
      <section
        id="relive"
        className="scroll-mt-32 border-t border-[#d3dcec] bg-white px-6 py-20"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <SectionLabel>Watch the recap</SectionLabel>
            <h2
              className="text-5xl font-normal leading-none text-[#061330] sm:text-6xl"
              style={display}
            >
              Relive the <span style={gradientText}>summit</span>
            </h2>
          </div>
          <EventsHighlightVideo />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-24 pt-4">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-xl bg-[#061330] p-12 text-center">
            <h2
              className="mb-4 text-5xl font-normal leading-none text-white sm:text-6xl"
              style={display}
            >
              See you in <span style={gradientText}>2027</span>
            </h2>
            <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-white/65">
              Relive the day through the photo gallery, then join Africa&apos;s
              premier transport leadership platform again next year.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/gallery"
                className={`group inline-flex items-center gap-2 rounded-sm bg-[#1b5fc1] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2670d8] ${focusRing}`}
              >
                <Images className="h-3.5 w-3.5" aria-hidden="true" />
                View the photo gallery
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="mailto:info@aspirewestafrica.com"
                className={`inline-flex items-center gap-2 rounded-sm border border-white/25 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5 ${focusRing}`}
              >
                Contact us about 2027
              </a>
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ background: RAINBOW }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
