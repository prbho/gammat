// app/sponsorship/page.tsx
"use client";

import type { LucideIcon } from "lucide-react";
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
  GlassWater,
  FileText,
  Calendar,
  Users,
  Award,
  Phone,
  Mail,
  X,
  Send,
} from "lucide-react";
import { useState } from "react";
import { Select } from "../../components/ui/Select";

interface SponsorshipPackage {
  icon: LucideIcon;
  name: string;
  price: string;
  benefits: string[];
  cta: string;
  popular?: boolean;
  highlighted?: boolean;
}

const sponsorshipPackages: SponsorshipPackage[] = [
  {
    icon: Crown,
    name: "Headline Partner",
    price: "$73,000",
    benefits: [
      "Keynote speaking slot (20 mins)",
      "Exclusive branding across all materials",
      "20 VIP passes + premium pavilion",
      "Media interviews & gala recognition",
      "Logo on all event communications",
      "Full-page ad in event program",
    ],
    cta: "Secure Now",
    highlighted: true,
  },
  {
    icon: Building,
    name: "Institutional Partner",
    price: "$44,000",
    benefits: [
      "Ministerial roundtable participation",
      "15 executive passes",
      "Premium logo placement",
      "Branding in dedicated session",
      "Half-page ad in event program",
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
      "Logo on airport transfers",
      "Quarter-page ad in event program",
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
      "Exclusive networking dinner host",
      "Full brand integration",
    ],
    cta: "Engage",
  },
  {
    icon: Microchip,
    name: "Tech & Innovation",
    price: "$29,000",
    benefits: [
      "Innovation showcase (15 mins)",
      "Speaking slot in Tech Track",
      "Premium exhibition space",
      "Media visibility",
      "Quarter-page ad in event program",
    ],
    cta: "Innovate",
  },
  {
    icon: Star,
    name: "Platinum Partner",
    price: "$18,000",
    benefits: [
      "Exhibition booth (3x3m)",
      "Networking session host",
      "8 executive passes",
      "Logo on event website",
    ],
    cta: "Sponsor",
  },
  {
    icon: Medal,
    name: "Gold Partner",
    price: "$12,000",
    benefits: [
      "Summit branding",
      "6 executive passes",
      "Media visibility",
      "Logo in event program",
    ],
    cta: "Gold",
  },
  {
    icon: GlassWater,
    name: "Silver Partner",
    price: "$5,700",
    benefits: [
      "Logo visibility",
      "4 executive passes",
      "Digital recognition",
      "Name in event program",
    ],
    cta: "Participate",
  },
];

const benefitsList = [
  "Access to 2,000+ industry leaders",
  "Brand exposure to Africa's transport elite",
  "Speaking and networking opportunities",
  "Media coverage and publicity",
  "Post-event delegate list access",
  "Priority exhibition placement",
];

const statsData = [
  { icon: Users, label: "Expected Delegates", value: "200+" },
  { icon: Building, label: "Companies", value: "500+" },
  { icon: Calendar, label: "Days", value: "2" },
  { icon: FileText, label: "Speaking Slots", value: "20+" },
];

interface ModalFormData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  position: string;
  country: string;
  budget: string;
  message: string;
  hearAbout: string;
}

export default function SponsorshipPage() {
  const [selectedPackage, setSelectedPackage] =
    useState<SponsorshipPackage | null>(null);
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
    budget: "",
    message: "",
    hearAbout: "",
  });

  const openModal = (pkg: SponsorshipPackage) => {
    setSelectedPackage(pkg);
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
      budget: "",
      message: "",
      hearAbout: "",
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

    try {
      const response = await fetch("/api/get-involved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.organization,
          message: `Package: ${selectedPackage?.name}\nPrice: ${selectedPackage?.price}\nBudget Range: ${formData.budget}\nHow did you hear about us: ${formData.hearAbout}\n\n${formData.message}`,
          packageName: selectedPackage?.name,
          budget: formData.budget,
          inquiryType: "Sponsorship",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Unable to submit sponsorship inquiry."
        );
      }

      setSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      alert(
        "There was an error submitting your inquiry. Please try again or email us directly."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] pt-32">
      {/* ── Hero ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Limited Opportunities Available
            </span>
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-[#1a2b1a] mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Sponsorship{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Packages
            </span>
          </h1>
          <p className="text-[#4a5a4a] text-lg leading-relaxed max-w-2xl mx-auto">
            Elevate your brand among Africa&apos;s transport elite. Choose the
            package that aligns with your business goals and maximize your
            impact.
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

      {/* ── Packages Grid ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Partnership Levels
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-[#1a2b1a] mb-12"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Choose Your{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Partnership Level
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sponsorshipPackages.map((pkg, idx) => (
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
                    Recommended
                  </div>
                )}
                <div className="w-10 h-10 rounded-md bg-[#eaf3de] flex items-center justify-center mb-4">
                  <pkg.icon className="w-4 h-4 text-[#3B6D11]" />
                </div>
                <h3 className="text-base font-bold text-[#1a2b1a] mb-1">
                  {pkg.name}
                </h3>
                <p className="text-[#3B6D11] text-xl font-bold mt-2">
                  {pkg.price}
                </p>
                <ul className="mt-5 space-y-2 grow">
                  {pkg.benefits.slice(0, 4).map((benefit, bidx) => (
                    <li
                      key={bidx}
                      className="flex items-start gap-2 text-xs text-[#4a5a4a]"
                    >
                      <CheckCircle className="w-3 h-3 text-[#3B6D11] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                  {pkg.benefits.length > 4 && (
                    <li className="text-[10px] text-[#4a5a4a]/50 pl-5">
                      + {pkg.benefits.length - 4} more benefits
                    </li>
                  )}
                </ul>
                <button
                  className={`mt-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    pkg.highlighted
                      ? "bg-[#2d6e2e] border border-[#3d9e3e] text-white hover:bg-[#3a8a3b]"
                      : "bg-white border border-[#d4d8d0] text-[#1a2b1a] hover:border-[#3B6D11] hover:bg-[#eaf3de]"
                  }`}
                >
                  <span>{pkg.cta}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Sponsor Section ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-0.5 bg-[#3B6D11]" />
                <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
                  Why Sponsor
                </span>
              </div>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-[#1a2b1a] mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Why Sponsor{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  GAMMAT 2026?
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
                  🎯 Limited Availability
                </p>
                <p className="text-[#4a5a4a] text-xs">
                  Packages are allocated on a first-come, first-served basis.
                  Secure your position today.
                </p>
              </div>
            </div>

            {/* ── Quick Contact CTA ── */}
            <div className="bg-linear-to-br from-[#0d1a0f] to-[#1a2b1a] rounded-xl p-8 text-center">
              <Award className="w-12 h-12 text-[#3B6D11] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Ready to Partner?
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Click on any sponsorship package above to send an inquiry. Our
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
                  href="mailto:sponsors@aspirewestafrica.com"
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

      {/* ── Modal ── */}
      {isModalOpen && selectedPackage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-black/20 bg-opacity-75 z-10"
              onClick={closeModal}
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full relative z-20">
              {/* Modal Header */}
              <div className="relative bg-[#0d1a0f] px-6 py-5">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
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
                      {selectedPackage.price}
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
                        className="w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-sm focus:outline-none focus:border-[#3B6D11]  placeholder:text-stone-400 placeholder:text-stone-400"
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
                        className="w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-sm focus:outline-none focus:border-[#3B6D11]  placeholder:text-stone-400 placeholder:text-stone-400"
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
                        className="w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-sm focus:outline-none focus:border-[#3B6D11]  placeholder:text-stone-400 placeholder:text-stone-400"
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
                        className="w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-sm focus:outline-none focus:border-[#3B6D11]  placeholder:text-stone-400 placeholder:text-stone-400"
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1a2b1a] mb-1">
                        Position/Title *
                      </label>
                      <input
                        type="text"
                        name="position"
                        required
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-sm focus:outline-none focus:border-[#3B6D11]  placeholder:text-stone-400 placeholder:text-stone-400"
                        placeholder="CEO, Director, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1a2b1a] mb-1">
                        Country *
                      </label>
                      <Select
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="mt-3"
                      >
                        <option value="">Select Country</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Kenya">Kenya</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Egypt">Egypt</option>
                        <option value="Other">Other</option>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1a2b1a] mb-1">
                        Budget Range
                      </label>
                      <Select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="mt-3"
                      >
                        <option value="">Select budget range</option>
                        <option value="$5,000 - $10,000">
                          $5,000 - $10,000
                        </option>
                        <option value="$10,000 - $25,000">
                          $10,000 - $25,000
                        </option>
                        <option value="$25,000 - $50,000">
                          $25,000 - $50,000
                        </option>
                        <option value="$50,000 - $100,000">
                          $50,000 - $100,000
                        </option>
                        <option value="$100,000+">$100,000+</option>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1a2b1a] mb-1">
                        How did you hear about us?
                      </label>
                      <Select
                        name="hearAbout"
                        value={formData.hearAbout}
                        onChange={handleChange}
                        className="mt-3"
                      >
                        <option value="">Select an option</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Twitter/X">Twitter/X</option>
                        <option value="Email">Email</option>
                        <option value="Colleague">Colleague</option>
                        <option value="Website">Website</option>
                        <option value="Other">Other</option>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1a2b1a] mb-1">
                      Message / Specific Requirements
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-[#d4d8d0] rounded-md text-sm focus:outline-none focus:border-[#3B6D11]  placeholder:text-stone-400 placeholder:text-stone-400"
                      placeholder="Tell us about your sponsorship goals, specific requirements, or questions..."
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
                      <Send className="w-3.5 h-3.5" />
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
                    Thank you for your interest in the {selectedPackage.name}{" "}
                    package. Our sponsorship team will contact you within 24
                    hours.
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
