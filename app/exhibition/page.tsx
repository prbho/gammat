// app/exhibition/page.tsx
"use client";

import type { LucideIcon } from "lucide-react";
import {
  Building2,
  ArrowRight,
  CheckCircle,
  Users,
  Calendar,
  Eye,
  Phone,
  Mail,
  Crown,
  Sparkles,
  Rocket,
  Gem,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ExhibitionPackage {
  icon: LucideIcon;
  name: string;
  price: string;
  usdPrice: string;
  benefits: string[];
  popular?: boolean;
  highlighted?: boolean;
  tag?: string;
}

const exhibitionPackages: ExhibitionPackage[] = [
  {
    icon: Crown,
    name: "Premium Exhibition Pavilion",
    price: "₦5,000,000",
    usdPrice: "$3,800",
    tag: "PREMIUM PLATFORM",
    benefits: [
      "Prime exhibition positioning",
      "Executive audience visibility",
      "Networking access",
      "Pitching Opportunity",
      "Certificate of attendance",
      "Corporate branding exposure",
      "10 delegate passes",
    ],
    highlighted: true,
  },
  {
    icon: Gem,
    name: "Standard Exhibition Booth",
    price: "₦2,500,000",
    usdPrice: "$1,900",
    tag: "EXHIBITION PACKAGES",
    benefits: [
      "Exhibition booth space of (3 x 6m)",
      "Brand visibility",
      "5mins Pitch Opportunity",
      "6 delegate passes",
      "Certificate of Attendance",
      "Summit Networking opportunities",
    ],
  },
  {
    icon: Rocket,
    name: "SME Exhibition Package",
    price: "₦1,000,000",
    usdPrice: "$800",
    tag: "EXHIBITION PACKAGES",
    benefits: [
      "SME showcase space (3 x 3m)",
      "Brand exposure",
      "Certificate of attendance",
      "4 delegate passes",
    ],
  },
  {
    icon: Sparkles,
    name: "Single Slot Exhibition",
    price: "₦800,000",
    usdPrice: "$600",
    tag: "EXHIBITION PACKAGES",
    benefits: [
      "Single banner showcase space",
      "Brand exposure",
      "Certificate of attendance",
      "3 delegate passes",
    ],
  },
];

const benefitsList = [
  "Showcase to 2,000+ industry leaders",
  "Direct access to ministers and CEOs",
  "Generate qualified leads and partnerships",
  "Launch products to African transport elite",
  "Media coverage and publicity",
  "Post-event delegate list access",
];

const statsData = [
  { icon: Users, label: "Expected Attendees", value: "2,000+" },
  { icon: Building2, label: "Exhibitors", value: "50+" },
  { icon: Calendar, label: "Summit Days", value: "1" },
  { icon: Eye, label: "Brand Exposure", value: "10,000+" },
];

interface ModalFormData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  position: string;
  country: string;
  packageName: string;
  message: string;
}

export default function ExhibitionPage() {
  const [selectedPackage, setSelectedPackage] =
    useState<ExhibitionPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ModalFormData>({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    position: "",
    country: "",
    packageName: "",
    message: "",
  });

  const openModal = (pkg: ExhibitionPackage) => {
    setSelectedPackage(pkg);
    setFormData((prev) => ({ ...prev, packageName: pkg.name }));
    setIsModalOpen(true);
    setSubmitted(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      position: "",
      country: "",
      packageName: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailContent = `
Exhibition Inquiry - ${selectedPackage?.name}

Contact Information:
-------------------
Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Organization: ${formData.organization}
Position: ${formData.position}
Country: ${formData.country}

Exhibition Details:
-------------------
Package: ${selectedPackage?.name}
Price: ${selectedPackage?.price} (${selectedPackage?.usdPrice})

Message:
${formData.message}

---
Submitted via GAMMAT 2026 Exhibition Page
    `;

    const subject = encodeURIComponent(
      `Exhibition Inquiry: ${selectedPackage?.name} - ${formData.organization}`
    );
    const body = encodeURIComponent(emailContent);
    window.location.href = `mailto:exhibition@aspirewestafrica.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        closeModal();
      }, 2000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] pt-32">
      {/* ── Hero ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Limited Spaces Available
            </span>
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-[#1a2b1a] mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Exhibition{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Opportunities
            </span>
          </h1>
          <p className="text-[#4a5a4a] text-lg leading-relaxed max-w-2xl mx-auto">
            Showcase your brand to Africa&apos;s transport elite. Secure premium
            exhibition space at GAMMAT 2026 and connect with decision-makers
            shaping the continent&apos;s future.
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

      {/* ── Exhibition Title ── */}
      <section className="px-6 mb-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a2b1a] mb-3"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            GAMMA{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Exhibition
            </span>{" "}
            Platform
          </h2>
        </div>
      </section>

      {/* ── Exhibition Packages Grid ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exhibitionPackages.map((pkg, idx) => (
              <div
                key={idx}
                className={`bg-white border rounded-xl p-6 transition-all duration-300 flex flex-col relative cursor-pointer ${
                  pkg.highlighted
                    ? "border-[#3B6D11] shadow-lg ring-1 ring-[#3B6D11]/20"
                    : "border-[#d4d8d0] hover:border-[#3B6D11]/40"
                }`}
                onClick={() => openModal(pkg)}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-[#3B6D11] rounded-md text-[10px] font-bold uppercase tracking-wider text-white">
                    Premium
                  </div>
                )}
                <div className="w-10 h-10 rounded-md bg-[#eaf3de] flex items-center justify-center mb-4">
                  <pkg.icon className="w-4 h-4 text-[#3B6D11]" />
                </div>
                <p className="text-[10px] font-bold tracking-wider text-[#3B6D11]/70 mb-1">
                  {pkg.tag}
                </p>
                <h3 className="text-base font-bold text-[#1a2b1a] mb-1">
                  {pkg.name}
                </h3>
                <div className="mt-2">
                  <p className="text-[#3B6D11] text-xl font-bold">
                    {pkg.price}
                  </p>
                  <p className="text-[10px] text-[#4a5a4a]/50">
                    {pkg.usdPrice}
                  </p>
                </div>
                <ul className="mt-4 space-y-2 grow">
                  {pkg.benefits.map((benefit, bidx) => (
                    <li
                      key={bidx}
                      className="flex items-start gap-2 text-xs text-[#4a5a4a]"
                    >
                      <CheckCircle className="w-3 h-3 text-[#3B6D11] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    pkg.highlighted
                      ? "bg-[#2d6e2e] border border-[#3d9e3e] text-white hover:bg-[#3a8a3b]"
                      : "bg-white border border-[#d4d8d0] text-[#1a2b1a] hover:border-[#3B6D11] hover:bg-[#eaf3de]"
                  }`}
                >
                  Inquire Now
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Exhibit Section ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-0.5 bg-[#3B6D11]" />
                <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
                  Why Exhibit
                </span>
              </div>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-[#1a2b1a] mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Showcase at{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  GAMMAT 2026
                </span>
              </h2>
              <div className="space-y-3">
                {benefitsList.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-white border border-[#d4d8d0] rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4 text-[#3B6D11] shrink-0" />
                    <span className="text-sm text-[#1a2b1a] font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-[#eaf3de] rounded-xl border border-[#3B6D11]/20">
                <p className="text-[#3B6D11] text-sm font-semibold mb-1">
                  🎯 Limited Spaces Available
                </p>
                <p className="text-[#4a5a4a] text-xs">
                  Exhibition spaces are allocated on a first-come, first-served
                  basis. Secure your position today.
                </p>
              </div>
            </div>

            {/* ── Quick Contact CTA ── */}
            <div className="bg-linear-to-br from-[#0d1a0f] to-[#1a2b1a] rounded-xl p-8 text-center">
              <Building2 className="w-12 h-12 text-[#3B6D11] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Ready to Exhibit?
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Click on any exhibition package above to send an inquiry. Our
                team will respond within 24 hours.
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="tel:+2348066626462"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-md text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Us
                </a>
                <a
                  href="mailto:exhibition@aspirewestafrica.com"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-md text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Exhibition Acceptance Form ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-[#d4d8d0] rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
              <div>
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#3B6D11] mb-3">
                  Exhibition Acceptance Form
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1a2b1a]">
                  Powering Africa&apos;s Connectivity through Exhibition
                  Participation
                </h2>
              </div>
              <p className="max-w-xl text-sm text-[#4a5a4a]">
                Complete your company information, select your exhibition
                package, and provide branding assets for the GAMMA TECH SUMMIT
                2026 exhibition program.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-semibold text-[#1a2b1a]">
                    Company Name*
                    <input
                      type="text"
                      name="companyName"
                      className="mt-2 block w-full rounded-2xl border border-[#d4d8d0] bg-[#fbfaf7] px-4 py-3 text-sm focus:border-[#3B6D11] focus:outline-none"
                      placeholder="Company name"
                      required
                    />
                  </label>
                  <label className="block text-sm font-semibold text-[#1a2b1a]">
                    Contact Person*
                    <input
                      type="text"
                      name="contactPerson"
                      className="mt-2 block w-full rounded-2xl border border-[#d4d8d0] bg-[#fbfaf7] px-4 py-3 text-sm focus:border-[#3B6D11] focus:outline-none"
                      placeholder="Full name"
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-semibold text-[#1a2b1a]">
                    Email Address*
                    <input
                      type="email"
                      name="email"
                      className="mt-2 block w-full rounded-2xl border border-[#d4d8d0] bg-[#fbfaf7] px-4 py-3 text-sm focus:border-[#3B6D11] focus:outline-none"
                      placeholder="info@company.com"
                      required
                    />
                  </label>
                  <label className="block text-sm font-semibold text-[#1a2b1a]">
                    Phone Number*
                    <input
                      type="tel"
                      name="phone"
                      className="mt-2 block w-full rounded-2xl border border-[#d4d8d0] bg-[#fbfaf7] px-4 py-3 text-sm focus:border-[#3B6D11] focus:outline-none"
                      placeholder="+234 801 234 5678"
                      required
                    />
                  </label>
                </div>

                <label className="block text-sm font-semibold text-[#1a2b1a]">
                  Company Address
                  <input
                    type="text"
                    name="address"
                    className="mt-2 block w-full rounded-2xl border border-[#d4d8d0] bg-[#fbfaf7] px-4 py-3 text-sm focus:border-[#3B6D11] focus:outline-none"
                    placeholder="Address, city, state"
                  />
                </label>

                <div className="rounded-3xl border border-[#d4d8d0] bg-[#f7f8f5] p-5">
                  <p className="text-sm font-semibold text-[#1a2b1a] mb-3">
                    Exhibition Package Selection
                  </p>
                  <div className="grid gap-3">
                    {[
                      {
                        label: "Gold Exhibition Stand — 3m x 2m",
                        price: "₦800,000",
                      },
                      {
                        label: "Premium Exhibition Stand — 4m x 3m",
                        price: "₦1,500,000",
                      },
                      {
                        label: "Platinum Exhibition Stand — 6m x 3m",
                        price: "₦2,500,000",
                      },
                      {
                        label: "Diamond Exhibition Stand — 9m x 3m",
                        price: "₦3,500,000",
                      },
                      {
                        label: "Titanium Experience Stand — 12m x 6m",
                        price: "₦5,000,000",
                      },
                    ].map((option) => (
                      <label
                        key={option.label}
                        className="inline-flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-[#d4d8d0] bg-white px-4 py-3 text-sm font-medium text-[#1a2b1a] hover:border-[#3B6D11]"
                      >
                        <input
                          type="radio"
                          name="package"
                          value={option.label}
                          className="h-4 w-4 text-[#3B6D11] border-[#d4d8d0] focus:ring-[#3B6D11]"
                          required
                        />
                        <span>{option.label}</span>
                        <span className="ml-auto text-sm font-bold text-[#3B6D11]">
                          {option.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-[#d4d8d0] bg-[#f7f8f5] p-6">
                  <p className="text-sm font-semibold text-[#1a2b1a] mb-4">
                    Exhibition Details
                  </p>
                  <label className="block text-sm font-semibold text-[#1a2b1a] mb-3">
                    Stand Name / Theme
                    <input
                      type="text"
                      name="standTheme"
                      className="mt-2 block w-full rounded-2xl border border-[#d4d8d0] bg-white px-4 py-3 text-sm focus:border-[#3B6D11] focus:outline-none"
                      placeholder="Innovation Hub"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-[#1a2b1a] mb-3">
                    Number of Representatives
                    <input
                      type="number"
                      name="representatives"
                      min="1"
                      className="mt-2 block w-full rounded-2xl border border-[#d4d8d0] bg-white px-4 py-3 text-sm focus:border-[#3B6D11] focus:outline-none"
                      placeholder="3"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-[#1a2b1a]">
                    Additional Requirements
                    <textarea
                      name="additionalRequirements"
                      rows={4}
                      className="mt-2 block w-full rounded-2xl border border-[#d4d8d0] bg-white px-4 py-3 text-sm focus:border-[#3B6D11] focus:outline-none"
                      placeholder="Power supply, furniture, branding requests"
                    />
                  </label>
                </div>

                <div className="rounded-3xl border border-[#d4d8d0] bg-[#eef5ea] p-6">
                  <p className="text-sm font-semibold text-[#1a2b1a] mb-4">
                    Branding & Promotional Materials
                  </p>
                  <label className="block text-sm font-semibold text-[#1a2b1a] mb-3">
                    Branding Assets Link
                    <input
                      type="url"
                      name="brandingLink"
                      className="mt-2 block w-full rounded-2xl border border-[#d4d8d0] bg-white px-4 py-3 text-sm focus:border-[#3B6D11] focus:outline-none"
                      placeholder="https://"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-[#1a2b1a] mb-3">
                    Promotional Requirements
                    <textarea
                      name="promoMaterials"
                      rows={3}
                      className="mt-2 block w-full rounded-2xl border border-[#d4d8d0] bg-white px-4 py-3 text-sm focus:border-[#3B6D11] focus:outline-none"
                      placeholder="Banner placement, program ads, sampling"
                    />
                  </label>
                </div>

                <div className="rounded-3xl border border-[#d4d8d0] bg-white p-6">
                  <p className="text-sm font-semibold text-[#1a2b1a] mb-4">
                    Payment Information
                  </p>
                  <div className="space-y-3 text-sm text-[#4a5a4a]">
                    <p>
                      Secure payment can be made via bank transfer to our
                      finance team.
                    </p>
                    <p className="font-semibold text-[#1a2b1a]">
                      Bank: Zenith Bank
                    </p>
                    <p>Account Name: Intra-Costal Communication Ltd</p>
                    <p>Account Number: 1311930150</p>
                    <p>
                      Send payment confirmation to{" "}
                      <a
                        href="mailto:finance@aspirewestafrica.com"
                        className="text-[#3B6D11] underline"
                      >
                        finance@aspirewestafrica.com
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-[#e3e6df] pt-8">
              <div className="grid gap-4">
                <label className="flex items-start gap-3 text-sm text-[#4a5a4a]">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-[#d4d8d0] text-[#3B6D11] focus:ring-[#3B6D11]"
                    required
                  />
                  I agree to the terms and conditions and confirm that the
                  information provided is accurate.
                </label>
                <label className="flex items-start gap-3 text-sm text-[#4a5a4a]">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-[#d4d8d0] text-[#3B6D11] focus:ring-[#3B6D11]"
                    required
                  />
                  I authorize GAMMAT 2026 to contact me about exhibition
                  logistics and payment details.
                </label>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-[#4a5a4a]">
                  Questions? Email{" "}
                  <a
                    href="mailto:exhibition@aspirewestafrica.com"
                    className="text-[#3B6D11] underline"
                  >
                    exhibition@aspirewestafrica.com
                  </a>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-[#3B6D11] px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#2e5f1e]"
                >
                  Submit Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
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
                Exhibition Space
              </span>
            </h2>
            <p className="text-white/40 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Position your brand at the forefront of Africa&apos;s transport
              transformation.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 px-7 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors"
              >
                Register as Delegate
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/sponsorship"
                className="inline-flex items-center gap-2 px-7 py-3 bg-transparent border border-white/20 rounded-md text-sm font-semibold text-white/70 hover:border-white/40 hover:text-white transition-colors"
              >
                View Sponsorship
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      {isModalOpen && selectedPackage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-black bg-opacity-75"
              onClick={closeModal}
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              {/* Modal Header */}
              <div className="relative bg-[#0d1a0f] px-6 py-5">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-[#eaf3de] flex items-center justify-center">
                    {selectedPackage.icon && (
                      <selectedPackage.icon className="w-5 h-5 text-[#3B6D11]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {selectedPackage.name}
                    </h3>
                    <p className="text-[#3B6D11] font-semibold text-sm">
                      {selectedPackage.price} ({selectedPackage.usdPrice})
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              {!submitted ? (
                <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1a2b1a] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-sm focus:outline-none focus:border-[#3B6D11]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1a2b1a] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-sm focus:outline-none focus:border-[#3B6D11]"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1a2b1a] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-sm focus:outline-none focus:border-[#3B6D11]"
                        placeholder="+234 801 234 5678"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1a2b1a] mb-1">
                        Organization *
                      </label>
                      <input
                        type="text"
                        name="organization"
                        required
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-sm focus:outline-none focus:border-[#3B6D11]"
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1a2b1a] mb-1">
                        Position/Title
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-sm focus:outline-none focus:border-[#3B6D11]"
                        placeholder="CEO, Director, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1a2b1a] mb-1">
                        Country *
                      </label>
                      <select
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-sm focus:outline-none focus:border-[#3B6D11]"
                      >
                        <option value="">Select Country</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Kenya">Kenya</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Egypt">Egypt</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1a2b1a] mb-1">
                      Additional Requirements
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-sm focus:outline-none focus:border-[#3B6D11]"
                      placeholder="Tell us about your exhibition goals, specific requirements, or questions..."
                    />
                  </div>

                  {/* Package Benefits Summary */}
                  <div className="bg-[#eaf3de] rounded-lg p-3">
                    <p className="text-xs font-semibold text-[#1a2b1a] mb-1">
                      Selected Package Benefits:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {selectedPackage.benefits
                        .slice(0, 3)
                        .map((benefit, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] text-[#4a5a4a]"
                          >
                            • {benefit}
                          </span>
                        ))}
                      {selectedPackage.benefits.length > 3 && (
                        <span className="text-[10px] text-[#4a5a4a]">
                          • +{selectedPackage.benefits.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-5 py-2 bg-white border border-[#d4d8d0] rounded-md text-sm font-semibold text-[#1a2b1a] hover:border-[#3B6D11] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-5 py-2 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold uppercase text-white hover:bg-[#3a8a3b] transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Send Inquiry"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="px-6 py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-[#3B6D11] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#1a2b1a] mb-2">
                    Inquiry Sent!
                  </h3>
                  <p className="text-[#4a5a4a] text-sm mb-4">
                    Thank you for your interest in the {selectedPackage.name}.
                    Our exhibition team will contact you within 24 hours.
                  </p>
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-[#2d6e2e] rounded-md text-sm font-bold text-white hover:bg-[#3a8a3b] transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
