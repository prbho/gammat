// app/exhibition/page.tsx
"use client";

import type { LucideIcon } from "lucide-react";
import {
  Building2,
  ArrowRight,
  CheckCircle,
  Users,
  Mic,
  Globe,
  Calendar,
  Phone,
  Mail,
  Crown,
  Sparkles,
  Rocket,
  Gem,
  Info,
  X,
  AlertCircle,
  Images,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

/* ─────────────────────────────────────────────────────────────
   Exhibition availability
   Flip to `false` when 2027 exhibition bookings open.
───────────────────────────────────────────────────────────── */
const EXHIBITION_CLOSED = true;

/* ───────────── Types & data ───────────── */

interface ExhibitionPackage {
  icon: LucideIcon;
  name: string;
  price: string;
  usdPrice: string;
  benefits: string[];
  highlighted?: boolean;
  tag?: string;
}

const exhibitionPackages: ExhibitionPackage[] = [
  {
    icon: Crown,
    name: "Premium Exhibition Pavilion",
    price: "₦5,000,000",
    usdPrice: "$3,800",
    tag: "Premium platform",
    benefits: [
      "Prime exhibition positioning",
      "Executive audience visibility",
      "Networking access",
      "Pitching opportunity",
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
    benefits: [
      "Exhibition booth space of 3 x 6m",
      "Brand visibility",
      "5-minute pitch opportunity",
      "6 delegate passes",
      "Certificate of attendance",
      "Summit networking opportunities",
    ],
  },
  {
    icon: Rocket,
    name: "SME Exhibition Package",
    price: "₦1,000,000",
    usdPrice: "$800",
    benefits: [
      "SME showcase space of 3 x 3m",
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
    benefits: [
      "Single banner showcase space",
      "Brand exposure",
      "Certificate of attendance",
      "3 delegate passes",
    ],
  },
];

const benefitsList = [
  "Showcase to industry leaders from across Africa",
  "Direct access to ministers and CEOs",
  "Generate qualified leads and partnerships",
  "Launch products to Africa's transport elite",
  "Media coverage and publicity",
  "Post-event delegate list access",
];

const steps = [
  {
    title: "Choose a package",
    desc: "Compare the four exhibition packages and pick the space that fits your goals.",
  },
  {
    title: "Send your inquiry",
    desc: "Use the package button or the acceptance form. Tell us about your organisation and requirements.",
  },
  {
    title: "Hear back within 24 hours",
    desc: "Our exhibition team confirms availability and shares payment details by email.",
  },
];

const stats = [
  { icon: Users, label: "Delegates", value: "200+" },
  { icon: Mic, label: "Speakers", value: "30" },
  { icon: Globe, label: "Countries represented", value: "12" },
  { icon: Calendar, label: "Summit date", value: "5 Nov 2026" },
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

const emptyForm: ModalFormData = {
  fullName: "",
  email: "",
  phone: "",
  organization: "",
  position: "",
  country: "",
  packageName: "",
  message: "",
};

/* ───────────── Shared styling ───────────── */

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

const inputCls =
  "mt-2 block w-full rounded-md border border-[#c7d3e8] bg-white px-3.5 py-2.5 text-sm text-[#061330] placeholder:text-[#8a96ad] focus:border-[#1b5fc1] focus:outline-none focus:ring-1 focus:ring-[#1b5fc1]/50";
const labelCls = "block text-sm font-semibold text-[#061330]";

function SectionLabel({
  children,
  onDark = false,
  center = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  center?: boolean;
}) {
  return (
    <div
      className={`mb-5 flex items-center gap-3 ${center ? "justify-center" : ""}`}
    >
      <span className="h-0.5 w-6 bg-[#1b5fc1]" />
      <span
        className={`text-sm font-semibold ${
          onDark ? "text-sky-300" : "text-[#1b5fc1]"
        }`}
      >
        {children}
      </span>
      {center && <span className="h-0.5 w-6 bg-[#1b5fc1]" />}
    </div>
  );
}

/* ───────────── Page wrapper ───────────── */

export default function ExhibitionPage() {
  if (EXHIBITION_CLOSED) return <ExhibitionClosed />;
  return <ExhibitionContent />;
}

function ExhibitionClosed() {
  return (
    <div className="min-h-screen bg-[#f2f6fc] pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-0.5 w-6 bg-[#4a5a4a]/30" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#4a5a4a]/70">
              Exhibition Closed
            </span>
            <span className="h-0.5 w-6 bg-[#4a5a4a]/30" />
          </div>

          <h1
            className="mb-6 text-4xl font-black leading-none text-[#061330] sm:text-5xl lg:text-6xl"
            style={display}
          >
            GAMMAT 2026 Has <span className="text-[#4a5a4a]/55">Concluded</span>
          </h1>

          <p className="mx-auto mb-3 max-w-2xl text-lg leading-relaxed text-[#3d4b66]">
            Thank you to every exhibitor and partner who made the GAMMAT 2026
            exhibition floor a success in Lagos.
          </p>
          <p className="mx-auto max-w-2xl text-[#3d4b66]">
            Exhibition bookings for GAMMAT 2027 will open soon. In the meantime,
            revisit the moments that made this year unforgettable.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-[#d3dcec] bg-white p-8 text-center">
          <div
            aria-disabled="true"
            className="mb-5 inline-flex cursor-not-allowed select-none items-center gap-2 rounded-md border border-[#d3dcec] bg-[#e3e5e0] px-8 py-3 text-sm font-bold uppercase tracking-wider text-[#4a5a4a]/55"
          >
            <AlertCircle className="h-4 w-4" />
            Exhibition Closed
          </div>

          <p className="mx-auto mb-6 max-w-md text-sm text-[#3d4b66]">
            The 2026 exhibition booking window has ended. Watch this page for
            the 2027 package announcement.
          </p>

          <div className="flex flex-wrap justify-center gap-3 uppercase">
            <Link
              href="/gallery"
              className={`inline-flex items-center gap-2 rounded-sm bg-[#0f1c3a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0f1c3a] ${focusRing}`}
            >
              <Images className="h-4 w-4" />
              View the Gallery
            </Link>
            <Link
              href="/interest"
              className={`inline-flex items-center gap-2 rounded-sm border border-[#0f1c3a] bg-white px-6 py-3 text-sm font-semibold text-[#061330] transition-colors hover:border-[#1b5fc1] hover:bg-[#e6eefb] ${focusRing}`}
            >
              Interest in 2027
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[#3d4b66]/80">
          For 2027 exhibition enquiries, email{" "}
          <a
            href="mailto:exhibition@aspirewestafrica.com"
            className="font-semibold text-[#1b5fc1] hover:underline"
          >
            exhibition@aspirewestafrica.com
          </a>
        </p>
      </div>
    </div>
  );
}

/* ───────────── Full exhibition page — only mounted when open ───────────── */

function ExhibitionContent() {
  const [selectedPackage, setSelectedPackage] =
    useState<ExhibitionPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [modalError, setModalError] = useState("");
  const [formData, setFormData] = useState<ModalFormData>(emptyForm);

  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const firstFieldRef = useRef<HTMLInputElement>(null);

  const trackGoogleAdsConversion = () => {
    if (typeof window === "undefined") return;
    const gtag = (
      window as Window &
        typeof globalThis & { gtag?: (...args: unknown[]) => void }
    ).gtag;
    gtag?.("event", "conversion", {
      send_to: "AW-18453740960/XRANCNGI8_0cEKD7tt9E",
    });
  };

  const openModal = (pkg: ExhibitionPackage) => {
    setSelectedPackage(pkg);
    setFormData({ ...emptyForm, packageName: pkg.name });
    setModalError("");
    setSubmitted(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
    setFormData(emptyForm);
    setModalError("");
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    firstFieldRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isModalOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string | null) => {
    if (value === null) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.country) {
      setModalError("Please select your country.");
      return;
    }
    setIsSubmitting(true);
    setModalError("");

    try {
      const response = await fetch("/api/get-involved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.organization,
          packageName: selectedPackage?.name,
          inquiryType: "Exhibition",
          message: `Package: ${selectedPackage?.name}\nPrice: ${selectedPackage?.price} (${selectedPackage?.usdPrice})\nCountry: ${formData.country}\nPosition: ${formData.position}\n\n${formData.message}`,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to submit exhibition inquiry.");
      }

      setSubmitted(true);
      trackGoogleAdsConversion();
    } catch (error) {
      console.error("Error submitting exhibition inquiry:", error);
      setModalError(
        "There was an error submitting your exhibition inquiry. Please try again or contact us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAcceptanceSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "").trim();

    setFormStatus("sending");
    try {
      const response = await fetch("/api/get-involved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: get("contactPerson"),
          email: get("email"),
          phone: get("phone"),
          company: get("companyName"),
          packageName: get("package"),
          inquiryType: "Exhibition acceptance form",
          message: [
            `Package: ${get("package")}`,
            `Company address: ${get("address")}`,
            `Stand name / theme: ${get("standTheme")}`,
            `Representatives: ${get("representatives")}`,
            `Additional requirements: ${get("additionalRequirements")}`,
            `Branding assets link: ${get("brandingLink")}`,
            `Promotional requirements: ${get("promoMaterials")}`,
          ].join("\n"),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to submit the form.");
      }
      setFormStatus("success");
      form.reset();
      trackGoogleAdsConversion();
    } catch (error) {
      console.error("Error submitting acceptance form:", error);
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f6fc]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#061330] px-6 pb-0 pt-36">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_85%_40%,rgba(27,95,193,0.35),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl">
          <SectionLabel onDark>Exhibition</SectionLabel>
          <h1
            className="mb-6 text-5xl font-normal leading-[0.95] text-white sm:text-6xl lg:text-7xl"
            style={display}
          >
            Exhibition <span style={gradientText}>opportunities</span>
          </h1>
          <p className="max-w-2xl pb-16 text-lg leading-relaxed text-white/70">
            Showcase your brand to Africa&apos;s transport elite. The GAMMAT
            exhibition puts your technology, infrastructure solution or service
            in front of the decision-makers shaping the continent&apos;s future.
          </p>

          <dl className="grid grid-cols-2 border-t border-white/10 lg:grid-cols-4">
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="border-b border-white/10 py-6 pr-4 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
              >
                <dt className="mb-2 flex items-center gap-2 text-sm text-sky-300">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </dt>
                <dd
                  className="text-4xl font-normal leading-none text-white"
                  style={display}
                >
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

      {/* ── Packages ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          {/* Status notice */}
          <div
            role="note"
            className="mb-12 flex items-start gap-3 rounded-lg border border-[#1b5fc1]/25 bg-[#e6eefb] p-4"
          >
            <Info
              className="mt-0.5 h-4 w-4 shrink-0 text-[#1b5fc1]"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-[#061330]">
              <span className="font-semibold">
                GAMMAT 2026 took place on 5 November.
              </span>{" "}
              The packages below show the 2026 exhibition rates. Send an inquiry
              to register your interest in exhibiting at the next edition.
            </p>
          </div>

          <SectionLabel>Exhibition packages</SectionLabel>
          <h2
            className="mb-10 text-5xl font-normal leading-none text-[#061330] sm:text-6xl"
            style={display}
          >
            Choose your <span style={gradientText}>platform</span>
          </h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {exhibitionPackages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col rounded-xl border bg-white p-6 ${
                  pkg.highlighted
                    ? "border-[#1b5fc1] shadow-lg ring-1 ring-[#1b5fc1]/20"
                    : "border-[#d3dcec]"
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-6 rounded-md bg-[#1b5fc1] px-3 py-1 text-xs font-semibold text-white">
                    Premium
                  </div>
                )}
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#dbe7f7]">
                  <pkg.icon className="h-4 w-4 text-[#1b5fc1]" />
                </div>
                {pkg.tag && (
                  <p className="mb-1 text-xs font-semibold text-[#1b5fc1]">
                    {pkg.tag}
                  </p>
                )}
                <h3 className="mb-1 text-base font-bold text-[#061330]">
                  {pkg.name}
                </h3>
                <div className="mt-2">
                  <p className="text-2xl font-bold text-[#1b5fc1]">
                    {pkg.price}
                  </p>
                  <p className="text-sm text-[#3d4b66]">{pkg.usdPrice}</p>
                </div>
                <ul className="mt-4 grow space-y-2">
                  {pkg.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2 text-sm text-[#3d4b66]"
                    >
                      <CheckCircle
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1b5fc1]"
                        aria-hidden="true"
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => openModal(pkg)}
                  className={`group mt-6 inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-sm font-semibold transition-colors ${focusRing} ${
                    pkg.highlighted
                      ? "bg-[#1b5fc1] text-white hover:bg-[#2670d8]"
                      : "border border-[#c7d3e8] bg-white text-[#061330] hover:border-[#1b5fc1] hover:bg-[#e6eefb]"
                  }`}
                >
                  Inquire now
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why exhibit + how it works ── */}
      <section className="border-y border-[#d3dcec] bg-white px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>Why exhibit</SectionLabel>
            <h2
              className="mb-6 text-5xl font-normal leading-none text-[#061330] sm:text-6xl"
              style={display}
            >
              Showcase at <span style={gradientText}>GAMMAT</span>
            </h2>
            <ul className="space-y-3">
              {benefitsList.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 rounded-lg border border-[#d3dcec] bg-[#f2f6fc] p-3"
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

          <div className="flex flex-col gap-8">
            <div>
              <SectionLabel>How it works</SectionLabel>
              <ol className="space-y-5">
                {steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#061330] text-xl text-white"
                      style={display}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#061330]">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#3d4b66]">
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-[#061330] to-[#0a1f4d] p-8">
              <Building2
                className="mb-3 h-8 w-8 text-sky-300"
                aria-hidden="true"
              />
              <h3 className="mb-2 text-xl font-bold text-white">
                Ready to exhibit?
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-white/70">
                Pick a package above to send an inquiry. Our team will respond
                within 24 hours.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:+2348066626462"
                  className={`inline-flex items-center gap-2 rounded-sm border border-white/25 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10 ${focusRing}`}
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call us
                </a>
                <a
                  href="mailto:exhibition@aspirewestafrica.com"
                  className={`inline-flex items-center gap-2 rounded-sm border border-white/25 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10 ${focusRing}`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Exhibition acceptance form ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <form
            onSubmit={handleAcceptanceSubmit}
            className="rounded-2xl border border-[#d3dcec] bg-white p-8 shadow-sm"
          >
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionLabel>Exhibition acceptance form</SectionLabel>
                <h2 className="text-3xl font-black text-[#061330] sm:text-4xl">
                  Powering Africa&apos;s connectivity through exhibition
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-[#3d4b66]">
                Complete your company information, select your exhibition
                package, and share your branding assets for the GAMMAT 2026
                exhibition programme.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className={labelCls}>
                    Company name *
                    <input
                      type="text"
                      name="companyName"
                      autoComplete="organization"
                      className={inputCls}
                      placeholder="Company name"
                      required
                    />
                  </label>
                  <label className={labelCls}>
                    Contact person *
                    <input
                      type="text"
                      name="contactPerson"
                      autoComplete="name"
                      className={inputCls}
                      placeholder="Full name"
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className={labelCls}>
                    Email address *
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      className={inputCls}
                      placeholder="info@company.com"
                      required
                    />
                  </label>
                  <label className={labelCls}>
                    Phone number *
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      className={inputCls}
                      placeholder="+234 801 234 5678"
                      required
                    />
                  </label>
                </div>

                <label className={labelCls}>
                  Company address
                  <input
                    type="text"
                    name="address"
                    autoComplete="street-address"
                    className={inputCls}
                    placeholder="Address, city, state"
                  />
                </label>

                <fieldset className="rounded-xl border border-[#d3dcec] bg-[#f2f6fc] p-5">
                  <legend className="px-1 text-sm font-semibold text-[#061330]">
                    Exhibition package *
                  </legend>
                  <div className="mt-2 grid gap-3">
                    {exhibitionPackages.map((pkg) => (
                      <label
                        key={pkg.name}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-[#d3dcec] bg-white px-4 py-3 text-sm font-medium text-[#061330] hover:border-[#1b5fc1]"
                      >
                        <input
                          type="radio"
                          name="package"
                          value={`${pkg.name} (${pkg.price})`}
                          className="h-4 w-4 accent-[#1b5fc1]"
                          required
                        />
                        <span>{pkg.name}</span>
                        <span className="ml-auto text-sm font-bold text-[#1b5fc1]">
                          {pkg.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl border border-[#d3dcec] bg-[#f2f6fc] p-6">
                  <p className="mb-4 text-sm font-semibold text-[#061330]">
                    Exhibition details
                  </p>
                  <div className="space-y-3">
                    <label className={labelCls}>
                      Stand name / theme
                      <input
                        type="text"
                        name="standTheme"
                        className={inputCls}
                        placeholder="Innovation Hub"
                      />
                    </label>
                    <label className={labelCls}>
                      Number of representatives
                      <input
                        type="number"
                        name="representatives"
                        min="1"
                        className={inputCls}
                        placeholder="3"
                      />
                    </label>
                    <label className={labelCls}>
                      Additional requirements
                      <textarea
                        name="additionalRequirements"
                        rows={4}
                        className={inputCls}
                        placeholder="Power supply, furniture, branding requests"
                      />
                    </label>
                  </div>
                </div>

                <div className="rounded-xl border border-[#d3dcec] bg-[#e6eefb] p-6">
                  <p className="mb-4 text-sm font-semibold text-[#061330]">
                    Branding &amp; promotional materials
                  </p>
                  <div className="space-y-3">
                    <label className={labelCls}>
                      Branding assets link
                      <input
                        type="url"
                        name="brandingLink"
                        className={inputCls}
                        placeholder="https://"
                      />
                    </label>
                    <label className={labelCls}>
                      Promotional requirements
                      <textarea
                        name="promoMaterials"
                        rows={3}
                        className={inputCls}
                        placeholder="Banner placement, programme ads, sampling"
                      />
                    </label>
                  </div>
                </div>

                <div className="rounded-xl border border-[#d3dcec] bg-white p-6">
                  <p className="mb-4 text-sm font-semibold text-[#061330]">
                    Payment information
                  </p>
                  <div className="space-y-2 text-sm text-[#3d4b66]">
                    <p>
                      Payment can be made by bank transfer to our finance team.
                    </p>
                    <p className="font-semibold text-[#061330]">
                      Bank: Zenith Bank
                    </p>
                    <p>Account name: Intra-Costal Communication Ltd</p>
                    <p>Account number: 1311930150</p>
                    <p>
                      Send payment confirmation to{" "}
                      <a
                        href="mailto:info@aspirewestafrica.com"
                        className="text-[#1b5fc1] underline"
                      >
                        info@aspirewestafrica.com
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-[#d3dcec] pt-8">
              <div className="grid gap-4">
                <label className="flex items-start gap-3 text-sm text-[#3d4b66]">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-[#1b5fc1]"
                    required
                  />
                  I agree to the terms and conditions and confirm that the
                  information provided is accurate.
                </label>
                <label className="flex items-start gap-3 text-sm text-[#3d4b66]">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-[#1b5fc1]"
                    required
                  />
                  I authorise GAMMAT to contact me about exhibition logistics
                  and payment details.
                </label>
              </div>

              <div aria-live="polite" className="mt-6">
                {formStatus === "success" && (
                  <div
                    role="status"
                    className="rounded-lg border border-[#1b5fc1]/30 bg-[#e6eefb] px-4 py-3 text-sm text-[#061330]"
                  >
                    Your inquiry was sent. Our exhibition team will contact you
                    within 24 hours.
                  </div>
                )}
                {formStatus === "error" && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
                  >
                    There was an error submitting your inquiry. Please try again
                    or contact us directly.
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-[#3d4b66]">
                  Questions? Email{" "}
                  <a
                    href="mailto:exhibition@aspirewestafrica.com"
                    className="text-[#1b5fc1] underline"
                  >
                    exhibition@aspirewestafrica.com
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className={`inline-flex items-center justify-center gap-2 rounded-sm bg-[#1b5fc1] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2670d8] disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
                >
                  {formStatus === "sending" ? "Sending..." : "Submit inquiry"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-xl bg-[#061330] p-12 text-center">
            <h2
              className="mb-4 text-5xl font-normal leading-none text-white sm:text-6xl"
              style={display}
            >
              Secure your <span style={gradientText}>exhibition space</span>
            </h2>
            <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-white/65">
              Position your brand at the forefront of Africa&apos;s transport
              transformation.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className={`group inline-flex items-center gap-2 rounded-sm bg-[#1b5fc1] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2670d8] ${focusRing}`}
              >
                Join us in 2027
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/sponsorship"
                className={`inline-flex items-center gap-2 rounded-sm border border-white/25 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5 ${focusRing}`}
              >
                View sponsorship
              </Link>
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ background: RAINBOW }}
            />
          </div>
        </div>
      </section>

      {/* ── Inquiry modal ── */}
      {isModalOpen && selectedPackage && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-4 sm:items-center">
          <div
            className="fixed inset-0 bg-[#061330]/80"
            onClick={closeModal}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exhibition-modal-title"
            className="relative my-8 w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl"
          >
            {/* Header */}
            <div className="relative bg-[#061330] px-6 py-5">
              <button
                type="button"
                onClick={closeModal}
                className={`absolute right-4 top-4 rounded-sm p-1 text-white/60 transition-colors hover:text-white ${focusRing}`}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3 pr-8">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#dbe7f7]">
                  <selectedPackage.icon className="h-5 w-5 text-[#1b5fc1]" />
                </div>
                <div>
                  <h3
                    id="exhibition-modal-title"
                    className="text-xl font-bold text-white"
                  >
                    {selectedPackage.name}
                  </h3>
                  <p className="text-sm font-semibold text-sky-300">
                    {selectedPackage.price} ({selectedPackage.usdPrice})
                  </p>
                </div>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: RAINBOW }}
              />
            </div>

            {/* Body */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className={labelCls}>
                    Full name *
                    <input
                      ref={firstFieldRef}
                      type="text"
                      name="fullName"
                      autoComplete="name"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="John Doe"
                    />
                  </label>
                  <label className={labelCls}>
                    Email address *
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="john@company.com"
                    />
                  </label>
                  <label className={labelCls}>
                    Phone number *
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="+234 801 234 5678"
                    />
                  </label>
                  <label className={labelCls}>
                    Organisation *
                    <input
                      type="text"
                      name="organization"
                      autoComplete="organization"
                      required
                      value={formData.organization}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="Company name"
                    />
                  </label>
                  <label className={labelCls}>
                    Position / title
                    <input
                      type="text"
                      name="position"
                      autoComplete="organization-title"
                      value={formData.position}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="CEO, Director, etc."
                    />
                  </label>
                  <div>
                    <span className={`${labelCls} mb-2`}>Country *</span>
                    <Select
                      value={formData.country}
                      onValueChange={(v) => handleSelectChange("country", v)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nigeria">Nigeria</SelectItem>
                        <SelectItem value="Ghana">Ghana</SelectItem>
                        <SelectItem value="Kenya">Kenya</SelectItem>
                        <SelectItem value="South Africa">
                          South Africa
                        </SelectItem>
                        <SelectItem value="Rwanda">Rwanda</SelectItem>
                        <SelectItem value="Egypt">Egypt</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <label className={`${labelCls} block`}>
                  Additional requirements
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="Tell us about your exhibition goals, specific requirements, or questions..."
                  />
                </label>

                <div className="rounded-lg bg-[#e6eefb] p-3">
                  <p className="mb-1 text-sm font-semibold text-[#061330]">
                    Selected package benefits
                  </p>
                  <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#3d4b66]">
                    {selectedPackage.benefits.slice(0, 3).map((benefit) => (
                      <li key={benefit}>• {benefit}</li>
                    ))}
                    {selectedPackage.benefits.length > 3 && (
                      <li>• +{selectedPackage.benefits.length - 3} more</li>
                    )}
                  </ul>
                </div>

                <div aria-live="polite">
                  {modalError && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
                    >
                      {modalError}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className={`rounded-sm border border-[#c7d3e8] bg-white px-5 py-2.5 text-sm font-semibold text-[#061330] transition-colors hover:border-[#1b5fc1] ${focusRing}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center gap-2 rounded-sm bg-[#1b5fc1] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2670d8] disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
                  >
                    {isSubmitting ? "Sending..." : "Send inquiry"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="px-6 py-12 text-center" role="status">
                <CheckCircle
                  className="mx-auto mb-4 h-14 w-14 text-[#1b5fc1]"
                  aria-hidden="true"
                />
                <h3 className="mb-2 text-xl font-bold text-[#061330]">
                  Inquiry sent
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-[#3d4b66]">
                  Thank you for your interest in the {selectedPackage.name}. Our
                  exhibition team will contact you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className={`rounded-sm bg-[#1b5fc1] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2670d8] ${focusRing}`}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
