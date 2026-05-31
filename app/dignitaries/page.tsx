// app/dignitaries/page.tsx
"use client";

import {
  Users,
  User,
  Building2,
  Globe,
  MapPin,
  Briefcase,
  Award,
  Star,
  Shield,
  Anchor,
  Plane,
  Ship,
  Truck,
  GraduationCap,
  Landmark,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

interface Dignitary {
  name: string;
  title: string;
  organization: string;
  country?: string;
  category: string;
  icon?: LucideIcon;
}

const dignitaries: Dignitary[] = [
  // Ministers & Government Officials
  {
    name: "Hon. Festus Keyamo SAN",
    title: "Minister",
    organization: "Ministry of Aviation and Aerospace",
    country: "Nigeria",
    category: "Ministers",
    icon: Award,
  },
  {
    name: "H.E. Adegboyega Oyetola, CON",
    title: "Honourable Minister",
    organization: "Ministry of Marine and Blue Economy",
    country: "Nigeria",
    category: "Ministers",
    icon: Award,
  },
  {
    name: "H.E. Wamkele Mene",
    title: "Secretary-General",
    organization: "AfCFTA Secretariat",
    country: "Africa",
    category: "Ministers",
    icon: Globe,
  },
  {
    name: "Hon. Ahmed Kolosh Mohamed",
    title: "Chairperson",
    organization: "Kenya Maritime Authority",
    country: "Kenya",
    category: "Ministers",
    icon: Award,
  },

  // Agency Heads & Directors General
  {
    name: "Capt. Chris Ona Najomo",
    title: "Director General",
    organization: "Nigerian Civil Aviation Authority (NCAA)",
    country: "Nigeria",
    category: "Agency Heads",
    icon: Plane,
  },
  {
    name: "Rev. Stephen Wilfred Arthur",
    title: "Director General",
    organization: "Ghana Civil Aviation Authority",
    country: "Ghana",
    category: "Agency Heads",
    icon: Plane,
  },
  {
    name: "Maj. Gen. Paul Seidu Tanye-Kulomo",
    title: "Director General",
    organization: "Ghana Ports Authority",
    country: "Ghana",
    category: "Agency Heads",
    icon: Anchor,
  },
  {
    name: "Dr. Dayo Mobereola",
    title: "Director General",
    organization: "NIMASA",
    country: "Nigeria",
    category: "Agency Heads",
    icon: Ship,
  },
  {
    name: "Dr. Kamal-Deen Ali",
    title: "Director General",
    organization: "Ghana Maritime Authority",
    country: "Ghana",
    category: "Agency Heads",
    icon: Anchor,
  },
  {
    name: "Mr. Evariste Rugigana",
    title: "Director General",
    organization: "Rwanda Utilities Regulatory Authority",
    country: "Rwanda",
    category: "Agency Heads",
    icon: Building2,
  },

  // Ports & Aviation Authority CEOs
  {
    name: "Captain William Ruto",
    title: "CEO",
    organization: "Kenya Ports Authority",
    country: "Kenya",
    category: "Ports & Aviation",
    icon: Anchor,
  },
  {
    name: "Dr. Abubakar Dantsoho",
    title: "Managing Director",
    organization: "Nigerian Ports Authority (NPA)",
    country: "Nigeria",
    category: "Ports & Aviation",
    icon: Ship,
  },
  {
    name: "Mrs. Olubunmi Kuku",
    title: "CEO",
    organization: "FAAN",
    country: "Nigeria",
    category: "Ports & Aviation",
    icon: Plane,
  },
  {
    name: "Mr. Mohammed Abdool",
    title: "Representative",
    organization: "Transnet National Ports Authority",
    country: "South Africa",
    category: "Ports & Aviation",
    icon: Anchor,
  },

  // Transport & Infrastructure
  {
    name: "Engr. Mrs. Abimbola Akinajo",
    title: "CEO",
    organization: "LAMATA",
    country: "Nigeria",
    category: "Transport & Infrastructure",
    icon: Truck,
  },

  // Shippers Councils
  {
    name: "Prof. Ransford Edward Gyampo",
    title: "CEO",
    organization: "Ghana Shippers Council",
    country: "Ghana",
    category: "Shippers Councils",
    icon: Briefcase,
  },
  {
    name: "Barr. Pius Akutah",
    title: "Executive Secretary/CEO",
    organization: "Nigerian Shippers' Council",
    country: "Nigeria",
    category: "Shippers Councils",
    icon: Briefcase,
  },
  {
    name: "Mr. Ogayo Ogambi",
    title: "CEO",
    organization: "Shippers Council of Eastern Africa",
    country: "Kenya",
    category: "Shippers Councils",
    icon: Briefcase,
  },

  // Development & Banking
  {
    name: "Dr. Olasupo Olusi",
    title: "Managing Director/CEO",
    organization: "Bank of Industry",
    country: "Nigeria",
    category: "Development & Banking",
    icon: Landmark,
  },

  // Academia
  {
    name: "Prof. Folasade Ogunsola, FAS",
    title: "Vice Chancellor",
    organization: "University of Lagos (UNILAG)",
    country: "Nigeria",
    category: "Academia",
    icon: GraduationCap,
  },
];

const categories = [
  { name: "Ministers", icon: Award, color: "#e05c10" },
  { name: "Agency Heads", icon: Shield, color: "#f4a200" },
  { name: "Ports & Aviation", icon: Anchor, color: "#3db340" },
  { name: "Transport & Infrastructure", icon: Truck, color: "#1a70c8" },
  { name: "Shippers Councils", icon: Briefcase, color: "#6e28d9" },
  { name: "Development & Banking", icon: Landmark, color: "#c4267a" },
  { name: "Academia", icon: GraduationCap, color: "#1a9c6e" },
];

const statsData = [
  { icon: Users, label: "Distinguished Speakers", value: "20+" },
  { icon: Globe, label: "African Nations", value: "6+" },
  { icon: Building2, label: "Organizations", value: "15+" },
  { icon: Star, label: "Industry Leaders", value: "25+" },
];

export default function DignitariesPage() {
  return (
    <div className="min-h-screen bg-[#f7f6f2] pt-32">
      {/* ── Hero ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Distinguished Speakers
            </span>
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-[#1a2b1a] mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Africa&apos;s Transport{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Leadership
            </span>
          </h1>
          <p className="text-[#4a5a4a] text-lg leading-relaxed max-w-2xl mx-auto">
            Convening ministers, agency heads, CEOs, and industry leaders from
            across Africa to shape the continent&apos;s transport future.
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4">
            {statsData.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="bg-white border border-[#d4d8d0] rounded-xl p-6 text-center"
              >
                <div className="w-10 h-10 rounded-md bg-[#eaf3de] flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-4 h-4 text-[#3B6D11]" />
                </div>
                <div
                  className="text-3xl font-black text-[#1a2b1a] leading-none mb-1"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {value}
                </div>
                <div className="text-[11px] font-semibold tracking-wider uppercase text-[#4a5a4a]/50">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories & Dignitaries ── */}
      {categories.map((category) => {
        const categoryDignitaries = dignitaries.filter(
          (d) => d.category === category.name
        );
        if (categoryDignitaries.length === 0) return null;

        return (
          <section key={category.name} className="px-6 mb-16">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}18` }}
                >
                  <category.icon
                    className="w-4 h-4"
                    style={{ color: category.color }}
                  />
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-black text-[#1a2b1a]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {category.name}
                </h2>
                <span className="w-12 h-0.5 bg-[#d4d8d0]" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryDignitaries.map((dignitary, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-[#d4d8d0] rounded-xl p-5 hover:border-[#3B6D11]/40 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${category.color}18` }}
                      >
                        {dignitary.icon ? (
                          <dignitary.icon
                            className="w-4 h-4"
                            style={{ color: category.color }}
                          />
                        ) : (
                          <User
                            className="w-4 h-4"
                            style={{ color: category.color }}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-[#1a2b1a] mb-0.5 leading-tight">
                          {dignitary.name}
                        </h3>
                        <p className="text-[11px] font-semibold text-[#3B6D11]">
                          {dignitary.title}
                        </p>
                        <p className="text-[11px] text-[#4a5a4a] mt-1">
                          {dignitary.organization}
                        </p>
                        {dignitary.country && (
                          <div className="flex items-center gap-1 mt-1.5">
                            <MapPin className="w-2.5 h-2.5 text-[#4a5a4a]/50" />
                            <span className="text-[10px] text-[#4a5a4a]/70">
                              {dignitary.country}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Senior Industry Executives Section ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-md bg-[#3B6D11]/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-[#3B6D11]" />
            </div>
            <h2
              className="text-2xl sm:text-3xl font-black text-[#1a2b1a]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Senior Industry Executives
            </h2>
            <span className="w-12 h-0.5 bg-[#d4d8d0]" />
          </div>
          <div className="bg-white border border-[#d4d8d0] rounded-xl p-8 text-center">
            <Users className="w-12 h-12 text-[#3B6D11] mx-auto mb-4 opacity-50" />
            <p className="text-[#4a5a4a] text-base leading-relaxed">
              Senior industry executives, transport operators, development
              institutions, and strategic stakeholders
              <br />
              <span className="text-[#3B6D11] font-semibold">
                from across Africa
              </span>
            </p>
          </div>
        </div>
      </section>

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
              Join Africa&apos;s{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Transport Elite
              </span>
            </h2>
            <p className="text-white/40 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Network with decision-makers shaping Africa&apos;s transport
              future.
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
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 bg-transparent border border-white/20 rounded-md text-sm font-semibold text-white/70 hover:border-white/40 hover:text-white transition-colors"
              >
                View Full Agenda
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
