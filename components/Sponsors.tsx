// components/Sponsorship.tsx
"use client";

import {
  CheckCircle,
  ArrowRight,
  Crown,
  Building,
  Plane,
  Gem,
  Microchip,
  Star,
  Medal,
  type LucideIcon,
  GlassWaterIcon,
} from "lucide-react";

interface SponsorshipPackage {
  icon: LucideIcon;
  name: string;
  price: string;
  benefits: string[];
  cta: string;
}

const sponsorshipPackages: SponsorshipPackage[] = [
  {
    icon: Crown,
    name: "Headline Partner",
    price: "$73,000",
    benefits: [
      "Keynote & exclusive branding",
      "20 VIP passes + premium pavilion",
      "Media interviews & gala recognition",
    ],
    cta: "Secure Now",
  },
  {
    icon: Building,
    name: "Institutional Partner",
    price: "$44,000",
    benefits: [
      "Ministerial roundtable",
      "15 executive passes",
      "Premium logo placement",
    ],
    cta: "Inquire",
  },
  {
    icon: Plane,
    name: "Official Carrier",
    price: "$36,000",
    benefits: [
      "Aviation session branding",
      "10 executive passes",
      "Media publicity",
    ],
    cta: "Partner",
  },
  {
    icon: Gem,
    name: "Diamond Partner",
    price: "Price on request",
    benefits: [
      "Premium branding & award presentation",
      "10 VIP passes + speaking slot",
    ],
    cta: "Engage",
  },
  {
    icon: Microchip,
    name: "Tech & Innovation",
    price: "$29,000",
    benefits: [
      "Innovation showcase + speaking",
      "Premium exhibition space",
      "Media visibility",
    ],
    cta: "Innovate",
  },
  {
    icon: Star,
    name: "Platinum Partner",
    price: "$18,000",
    benefits: ["Exhibition booth + networking", "8 executive passes"],
    cta: "Sponsor",
  },
  {
    icon: Medal,
    name: "Gold Partner",
    price: "$12,000",
    benefits: ["Summit branding + 6 passes", "Media visibility"],
    cta: "Gold",
  },
  {
    icon: GlassWaterIcon,
    name: "Silver Partner",
    price: "$5,700",
    benefits: ["Logo visibility + 4 passes", "Digital recognition"],
    cta: "Participate",
  },
];

export default function Sponsorship() {
  return (
    <section
      id="sponsors"
      className="py-24 px-6 bg-linear-to-b from-black to-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Sponsorship{" "}
            <span className="bg-linear-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
              Packages
            </span>
          </h2>
          <p className="text-gray-400 mt-3">
            Elevate your brand among Africa&apos;s transport elite
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sponsorshipPackages.map((pkg, idx) => (
            <div
              key={idx}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 flex flex-col"
            >
              {/* Icon */}
              <pkg.icon className="w-12 h-12 text-blue-500 mb-4 group-hover:scale-110 transition-transform duration-300" />

              {/* Package Name */}
              <h3 className="text-xl font-bold text-white mb-1">{pkg.name}</h3>

              {/* Price */}
              <p className="text-blue-500 text-2xl font-bold mt-2">
                {pkg.price}
              </p>

              {/* Benefits List */}
              <ul className="mt-5 space-y-2 grow">
                {pkg.benefits.map((benefit, bidx) => (
                  <li
                    key={bidx}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="/register"
                className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-blue-500 rounded-full font-semibold text-blue-500 transition-all duration-300 hover:bg-blue-500 hover:text-black group/btn"
              >
                <span>{pkg.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
