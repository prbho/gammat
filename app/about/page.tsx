// app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Target,
  Eye,
  Globe,
  Users,
  Mic,
  Calendar,
  MapPin,
  LayoutGrid,
  Building2,
  Plane,
  Ship,
  Truck,
  TrendingUp,
  Microchip,
  GraduationCap,
  Handshake,
  Rocket,
  Shield,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Images,
  Play,
  Bell,
  Tag,
} from "lucide-react";
import EventsHighlightVideo from "@/components/EventsHighlightVideo";
import InterestCTA from "@/components/InterestCTA";

export const metadata: Metadata = {
  title: "About | GAMMAT 2026",
  description:
    "GAMMAT & Tech Summit 2026 brought ministers, regulators, CEOs, investors and infrastructure developers together in Lagos to advance Africa's aviation, maritime, logistics and mobility agenda.",
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

const atAGlance = [
  {
    icon: Calendar,
    label: "Date",
    value: "5 November 2026",
    sub: "Starts 10am",
  },
  {
    icon: MapPin,
    label: "Venue",
    value: "The Lagos Oriental Hotel",
    sub: "Victoria Island, Lagos, Nigeria",
  },
  {
    icon: LayoutGrid,
    label: "Format",
    value: "Summit, exhibition and networking",
    sub: "One day, one platform",
  },
  {
    icon: Building2,
    label: "Powered by",
    value: "NIMASA & Aspire West Africa",
    sub: "Organised by Aspire West Africa / ELIAD",
  },
];

const missionPoints = [
  {
    icon: Target,
    tag: "Mission",
    title: "Our mission",
    description:
      "To accelerate Africa's transport integration by connecting decision-makers, capital, and innovation across aviation, maritime, logistics, and technology.",
    accent: "#3db340",
  },
  {
    icon: Eye,
    tag: "Vision",
    title: "Our vision",
    description:
      "A seamlessly connected Africa where integrated transport ecosystems drive continental trade, economic growth, and shared prosperity.",
    accent: "#1a70c8",
  },
  {
    icon: Globe,
    tag: "Impact",
    title: "Our impact",
    description:
      "Driving intra-African trade, AfCFTA implementation, port modernisation, aviation expansion, and smart mobility innovation across the continent.",
    accent: "#f4a200",
  },
];

const stats = [
  { icon: Users, value: "200+", label: "Delegates" },
  { icon: Mic, value: "30", label: "Speakers" },
  { icon: Globe, value: "12", label: "Countries represented" },
  { icon: LayoutGrid, value: "6", label: "Connected sectors" },
];

const recapMoments = [
  {
    src: "/gallery/gammat-2026-001.jpg",
    alt: "Opening keynote on the main stage",
  },
  {
    src: "/gallery/gammat-2026-010.jpg",
    alt: "Delegates in the main auditorium",
  },
  { src: "/gallery/gammat-2026-025.jpg", alt: "Exhibition floor" },
  { src: "/gallery/gammat-2026-040.jpg", alt: "Delegates in conversation" },
  { src: "/gallery/gammat-2026-060.jpg", alt: "Panel discussion" },
  { src: "/gallery/gammat-2026-085.jpg", alt: "Handshake after a meeting" },
  { src: "/gallery/gammat-2026-120.jpg", alt: "Ministerial delegation" },
  { src: "/gallery/gammat-2026-150.jpg", alt: "Wide view of the venue" },
];

const nextSummitPerks = [
  {
    icon: Bell,
    title: "First to know",
    body: "Email announcement when the 2027 dates and venue are confirmed.",
  },
  {
    icon: Tag,
    title: "Priority pricing",
    body: "Early-bird rates and package allocation before public release.",
  },
  {
    icon: Mic,
    title: "Insider updates",
    body: "Speaker announcements and agenda drops as they happen.",
  },
];

const sectors = [
  {
    icon: Plane,
    title: "Aviation & Aerospace",
    desc: "Air connectivity, fleet expansion, airport infrastructure, and aviation technology.",
    accent: "#e05c10",
  },
  {
    icon: Ship,
    title: "Maritime & Blue Economy",
    desc: "Port modernisation, shipping corridors, and maritime safety.",
    accent: "#1a70c8",
  },
  {
    icon: Truck,
    title: "Logistics & Mobility",
    desc: "Supply chain optimisation, last-mile delivery, urban mobility, and freight.",
    accent: "#3db340",
  },
  {
    icon: Building2,
    title: "Infrastructure & Development",
    desc: "Roads, railways, bridges, transport hubs, and special economic zones.",
    accent: "#f4a200",
  },
  {
    icon: TrendingUp,
    title: "Trade & Investment",
    desc: "AfCFTA implementation, capital deployment, PPP models, and trade finance.",
    accent: "#6e28d9",
  },
  {
    icon: Microchip,
    title: "Technology & Digital Innovation",
    desc: "Smart mobility, digital logistics, AI optimisation, and transport tech.",
    accent: "#c4267a",
  },
];

const programme = [
  {
    icon: GraduationCap,
    title: "The summit",
    desc: "Industry experts, policymakers, and innovators shared insights on the future of aviation, maritime, logistics, and transport infrastructure across Africa.",
  },
  {
    icon: Building2,
    title: "The exhibition",
    desc: "Exhibitors showcased technologies, infrastructure solutions, and services driving the next generation of African transport systems.",
  },
  {
    icon: Handshake,
    title: "Networking",
    desc: "Government leaders, executives, investors, and innovators connected to build partnerships across Africa's transport ecosystem.",
  },
];

const convenors = [
  { name: "NIMASA", role: "Maritime Authority" },
  { name: "Aspire West Africa / ELIAD", role: "Organiser" },
  { name: "Federal Ministry of Aviation", role: "Aviation Authority" },
  { name: "Ministry of Defence", role: "Defence Authority" },
  { name: "LagRide", role: "Lagos city ride-hailing" },
];

const coreValues = [
  {
    icon: Rocket,
    title: "Innovation",
    description:
      "Embracing cutting-edge solutions for Africa's transport challenges.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Transparent, ethical partnerships and dialogue.",
  },
  {
    icon: Lightbulb,
    title: "Excellence",
    description: "World-class content and networking experiences.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description: "Building bridges across sectors and borders.",
  },
];

const benefits = [
  "Access to ministers and regulators",
  "Connect with CEOs and industry leaders",
  "Network with delegates from across Africa",
  "Explore investment projects",
  "Participate in ministerial roundtables",
  "Gain media visibility across Africa",
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

/* ───────────── Page ───────────── */

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f2f6fc]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#061330] px-6 pb-0 pt-36">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_85%_40%,rgba(27,95,193,0.35),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl">
          <SectionLabel onDark>About the summit</SectionLabel>
          <h1
            className="mb-6 text-5xl font-normal leading-[0.95] text-white sm:text-6xl lg:text-7xl"
            style={display}
          >
            Africa&apos;s premier <span style={gradientText}>transport</span>
            <br />
            leadership platform
          </h1>
          <p className="max-w-2xl pb-16 text-lg leading-relaxed text-white/70">
            GAMMAT &amp; Tech Summit 2026 convened ministers, regulators, CEOs,
            investors, and infrastructure developers in Lagos to move
            Africa&apos;s aviation, maritime, and mobility agenda from
            conversation to action.
          </p>

          <dl className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {atAGlance.map(({ icon: Icon, label, value, sub }) => (
              <div
                key={label}
                className="border-b border-white/10 py-6 sm:pr-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
              >
                <dt className="mb-2 flex items-center gap-2 text-sm text-sky-300">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="text-lg font-semibold leading-snug text-white">
                  {value}
                </dd>
                <dd className="mt-1 text-sm text-white/55">{sub}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: RAINBOW }}
        />
      </section>

      {/* ── Mission / Vision / Impact ── */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {missionPoints.map(
            ({ icon: Icon, tag, title, description, accent }) => (
              <div
                key={title}
                className="overflow-hidden rounded-xl border border-[#d3dcec] bg-white"
              >
                <div className="h-0.5 w-full" style={{ background: accent }} />
                <div className="p-7">
                  <span
                    className="mb-4 block text-lg tracking-wider"
                    style={{ ...display, color: accent }}
                  >
                    {tag}
                  </span>
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-md"
                    style={{
                      background: `${accent}18`,
                      border: `1px solid ${accent}40`,
                    }}
                  >
                    <Icon className="h-4 w-4" style={{ color: accent }} />
                  </div>
                  <h2 className="mb-2 text-lg font-bold text-[#061330]">
                    {title}
                  </h2>
                  <p className="text-sm leading-relaxed text-[#3d4b66]">
                    {description}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      {/* ── The summit in numbers ── */}
      <section className="bg-[#061330] px-6 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionLabel onDark>The summit in review</SectionLabel>
            <h2
              className="mb-6 text-5xl font-normal leading-none text-white sm:text-6xl"
              style={display}
            >
              What is GAMMAT <span style={gradientText}>2026?</span>
            </h2>
            <p className="mb-4 text-base leading-relaxed text-white/75">
              GAMMAT 2026 convened ministers, regulators, CEOs, investors, and
              infrastructure developers under one influential platform, driving
              intra-African trade, AfCFTA implementation, port modernisation,
              aviation expansion, and smart mobility innovation.
            </p>
            <p className="mb-10 text-base leading-relaxed text-white/60">
              The future of Africa&apos;s competitiveness depends on integrated
              transport ecosystems, and this is where action meets capital.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#recap"
                className={`inline-flex items-center gap-2 rounded-sm bg-red-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-600 ${focusRing}`}
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                Watch the highlights
              </a>
              <Link
                href="/gallery"
                className={`inline-flex items-center gap-2 rounded-sm border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5 ${focusRing}`}
              >
                Photo gallery
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-6 text-center"
              >
                <Icon
                  className="mx-auto mb-2 h-5 w-5 text-sky-300"
                  aria-hidden="true"
                />
                <div
                  className="mb-1 text-5xl font-normal leading-none text-white"
                  style={display}
                >
                  {value}
                </div>
                <div className="text-sm text-white/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recap: video + moments ── */}
      <section id="recap" className="scroll-mt-32 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-4 text-5xl font-normal leading-none text-[#061330] sm:text-6xl"
            style={display}
          >
            Moments from <span style={gradientText}>5 November</span>
          </h2>
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-[#3d4b66]">
            The day in two minutes and a few stills — keynotes, the exhibition
            floor, deal-making on the sidelines, and the leaders who made it
            happen.
          </p>

          {/* Video */}
          <div className="mb-12">
            <EventsHighlightVideo />
          </div>

          {/* Photo grid */}
          <div className="mb-6 flex items-end justify-between gap-4">
            <h3 className="text-lg font-bold text-[#061330]">
              Stills from the day
            </h3>
            <Link
              href="/gallery"
              className={`group inline-flex items-center gap-2 text-sm font-semibold text-[#1b5fc1] transition-colors hover:text-[#061330] ${focusRing}`}
            >
              <Images className="h-4 w-4" aria-hidden="true" />
              View all photos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {recapMoments.map((shot) => (
              <Link
                key={shot.src}
                href="/gallery"
                aria-label={`View the full gallery — ${shot.alt}`}
                className={`group relative aspect-[4/3] overflow-hidden rounded-xl border border-[#d3dcec] bg-[#dbe7f7] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-14px_rgba(6,19,48,0.3)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  quality={75}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programme ── */}
      <section className="border-t border-[#d3dcec] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-4 text-5xl font-normal leading-none text-[#061330] sm:text-6xl"
            style={display}
          >
            Three ways to <span style={gradientText}>engage</span>
          </h2>
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-[#3d4b66]">
            The programme combined policy discussion, a technology exhibition,
            and structured networking, so delegates could learn, see, and
            connect in the same room.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {programme.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-[#d3dcec] bg-white p-6"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-[#dbe7f7]">
                  <Icon className="h-4 w-4 text-[#1b5fc1]" />
                </div>
                <h3 className="mb-1.5 text-base font-bold text-[#061330]">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[#3d4b66]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Six sectors ── */}
      <section className="border-y border-[#d3dcec] bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-4 text-5xl font-normal leading-none text-[#061330] sm:text-6xl"
            style={display}
          >
            Six sectors, <span style={gradientText}>one agenda</span>
          </h2>
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-[#3d4b66]">
            Each sector depends on the others. GAMMAT brings them into a single
            conversation so that ports, runways, roads, capital and technology
            are planned together.
          </p>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map(({ icon: Icon, title, desc, accent }) => (
              <div
                key={title}
                className="border-l-2 pl-4"
                style={{ borderColor: accent }}
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <Icon
                    className="h-4 w-4"
                    style={{ color: accent }}
                    aria-hidden="true"
                  />
                  <h3 className="text-base font-bold text-[#061330]">
                    {title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-[#3d4b66]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Organisers and partners ── */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2
              className="mb-4 text-5xl font-normal leading-none text-[#061330] sm:text-6xl"
              style={display}
            >
              Organisers &amp; <span style={gradientText}>partners</span>
            </h2>
            <p className="mb-6 text-base leading-relaxed text-[#3d4b66]">
              GAMMAT 2026 was powered by NIMASA and Aspire West Africa, and
              organised by Aspire West Africa / ELIAD, with the support of
              national authorities and partners from the transport sector.
            </p>
            <Link
              href="/dignitaries"
              className={`inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-[#1b5fc1] underline-offset-4 hover:underline ${focusRing}`}
            >
              Meet the dignitaries
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="divide-y divide-[#d3dcec] rounded-xl border border-[#d3dcec] bg-white">
            {convenors.map(({ name, role }) => (
              <li
                key={name}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <span className="text-sm font-semibold text-[#061330]">
                  {name}
                </span>
                <span className="text-sm text-[#3d4b66]">{role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Core values ── */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-10 text-5xl font-normal leading-none text-[#061330] sm:text-6xl"
            style={display}
          >
            The principles <span style={gradientText}>behind</span> the summit
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {coreValues.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-[#d3dcec] bg-white p-6 transition-colors hover:border-[#1b5fc1]/50"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-[#dbe7f7]">
                  <Icon className="h-4 w-4 text-[#1b5fc1]" />
                </div>
                <h3 className="mb-1.5 text-base font-bold text-[#061330]">
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

      {/* ── Why attend ── */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-10 text-5xl font-normal leading-none text-[#061330] sm:text-6xl"
            style={display}
          >
            Six reasons to <span style={gradientText}>be there</span>
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-3 rounded-lg border border-[#d3dcec] bg-white p-4"
              >
                <CheckCircle
                  className="h-4 w-4 shrink-0 text-[#1b5fc1]"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-[#061330]">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Looking ahead to 2027 ── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl bg-[#061330] p-8 sm:p-12">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_85%_30%,rgba(27,95,193,0.4),transparent_70%)]"
              aria-hidden="true"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-0.5 w-6 bg-[#1b5fc1]" />
                  <span className="text-sm font-semibold text-sky-300">
                    GAMMAT 2027
                  </span>
                </div>
                <h2
                  className="mb-5 text-4xl font-normal leading-[0.95] text-white sm:text-5xl lg:text-6xl"
                  style={display}
                >
                  The next chapter is{" "}
                  <span style={gradientText}>already taking shape</span>
                </h2>
                <p className="mb-8 max-w-xl text-base leading-relaxed text-white/70">
                  GAMMAT 2026 proved what&apos;s possible when Africa&apos;s
                  transport leadership gathers in one room. The 2027 edition
                  builds on that — more ministers, more investors, more projects
                  crossing the finish line. Leave your details and be first to
                  hear when registration opens.
                </p>
                <div className="flex flex-wrap gap-3">
                  <InterestCTA label="Register 2027 interest" />
                  <a
                    href="#recap"
                    className={`inline-flex items-center gap-2 rounded-sm border border-white/25 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5 ${focusRing}`}
                  >
                    Relive 2026
                  </a>
                </div>
              </div>

              <ul className="space-y-3">
                {nextSummitPerks.map(({ icon: Icon, title, body }) => (
                  <li
                    key={title}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-sky-300/15">
                      <Icon
                        className="h-4 w-4 text-sky-300"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="mb-0.5 text-sm font-bold text-white">
                        {title}
                      </p>
                      <p className="text-xs leading-relaxed text-white/60">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ background: RAINBOW }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
