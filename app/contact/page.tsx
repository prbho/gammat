// app/contact/page.tsx
"use client";

import { useMemo, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Globe,
  Headphones,
  Award,
  Users,
  AlertCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SocialIcon } from "react-social-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

/* ─────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────── */

interface InfoLine {
  text: string;
  href?: string;
}

interface ContactInfo {
  icon: LucideIcon;
  title: string;
  color: string;
  lines: InfoLine[];
}

const contactInfo: ContactInfo[] = [
  {
    icon: MapPin,
    title: "Visit Us",
    color: "#e05c10",
    lines: [
      {
        text: "Oriental Hotel Lagos",
        href: "https://maps.google.com/?q=Oriental+Hotel+Lagos",
      },
      { text: "3 Lekki - Epe Expressway" },
      { text: "Victoria Island, Lagos, Nigeria" },
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    color: "#f4a200",
    lines: [
      { text: "+234 806 662 6462", href: "tel:+2348066626462" },
      { text: "+234 802 345 6789", href: "tel:+2348023456789" },
    ],
  },
  {
    icon: Mail,
    title: "Email Us",
    color: "#3db340",
    lines: [
      {
        text: "info@aspirewestafrica.com",
        href: "mailto:info@aspirewestafrica.com",
      },
    ],
  },
  {
    icon: Clock,
    title: "Office Hours",
    color: "#1a70c8",
    lines: [
      { text: "Monday - Friday: 9:00 AM - 6:00 PM" },
      { text: "Saturday: 10:00 AM - 2:00 PM" },
      { text: "Sunday: Closed" },
    ],
  },
];

const teamContacts = [
  {
    name: "Conference Secretariat",
    role: "General Inquiries & Registration",
    email: "info@aspirewestafrica.com",
    phone: "+234 806 662 6462",
    icon: Headphones,
  },
  {
    name: "Sponsorship Team",
    role: "Sponsorship & Exhibition Opportunities",
    email: "info@aspirewestafrica.com",
    phone: "+234 802 345 6789",
    icon: Award,
  },
  {
    name: "Speakers Bureau",
    role: "Speaker Nominations & Panel Proposals",
    email: "info@aspirewestafrica.com",
    phone: "+234 803 456 7890",
    icon: Users,
  },
  {
    name: "Media & PR",
    role: "Media Accreditation & Press Inquiries",
    email: "info@aspirewestafrica.com",
    phone: "+234 804 567 8901",
    icon: Globe,
  },
];

const faqs = [
  {
    question: "When and where is GAMMAT 2026 taking place?",
    answer:
      "GAMMAT 2026 will take place on 5th November 2026 at the Oriental Hotel, Lagos, Nigeria.",
  },
  {
    question: "How can I register for the summit?",
    answer:
      "You can register online through our registration page. Early bird registration is currently open.",
  },
  {
    question: "Are there sponsorship opportunities available?",
    answer:
      "Yes, we have various sponsorship packages ranging from Silver to Headline Partner. Contact our sponsorship team for more details.",
  },
  {
    question: "Can I submit a proposal to speak at the summit?",
    answer:
      "Yes, speaker nominations are open. Please contact our Speakers Bureau via email.",
  },
  {
    question: "Is there a dress code for the summit?",
    answer:
      "Business formal is recommended for the summit sessions, and black-tie for the Gala Dinner.",
  },
  {
    question: "Will there be networking opportunities?",
    answer:
      "Yes, the summit includes dedicated networking breaks, a leadership luncheon, and a Gala Dinner.",
  },
];

const SUBJECTS = [
  "Registration Inquiry",
  "Sponsorship Opportunity",
  "Speaking Proposal",
  "Media Accreditation",
  "General Question",
];

const GRADIENT =
  "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)";
const gradientText: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/* ─────────────────────────────────────────────────────────────
   Form types + validation
───────────────────────────────────────────────────────────── */

interface ContactForm {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FieldName = keyof ContactForm;
type FormErrors = Partial<Record<FieldName, string>>;

const EMPTY_FORM: ContactForm = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const FIELD_ORDER: FieldName[] = [
  "fullName",
  "email",
  "phone",
  "subject",
  "message",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = (d: ContactForm): FormErrors => {
  const e: FormErrors = {};

  if (d.fullName.trim().length < 2) e.fullName = "Enter your full name.";

  if (!d.email.trim()) e.email = "Enter your email address.";
  else if (!EMAIL_RE.test(d.email.trim()))
    e.email = "Enter a valid email, like name@example.com.";

  // Phone is optional, but must look right if provided
  if (d.phone.trim()) {
    const digits = d.phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15 || /[^\d+\s()-]/.test(d.phone))
      e.phone = "Enter a valid number, like +234 801 234 5678.";
  }

  if (!d.subject) e.subject = "Choose what your message is about.";

  if (d.message.trim().length < 10)
    e.message = "Tell us a little more (at least 10 characters).";

  return e;
};

/* ─────────────────────────────────────────────────────────────
   Field components (outside the page so inputs keep focus)
───────────────────────────────────────────────────────────── */

const inputClass = (hasError: boolean) =>
  `w-full px-3 py-2.5 bg-white border rounded-md text-sm text-[#1a2b1a] placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-colors ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
      : "border-[#d4d8d0] focus:border-[#3B6D11] focus:ring-[#3B6D11]/20"
  }`;

function FieldShell({
  id,
  label,
  required,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-[#1a2b1a] mb-1.5"
      >
        {label}
        {required && <span className="text-red-600"> *</span>}
        {optional && (
          <span className="text-[#4a5a4a]/60 font-normal"> (optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-xs text-red-600 mt-1.5"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>(EMPTY_FORM);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {}
  );
  const [attempted, setAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const errors = useMemo(() => validate(formData), [formData]);
  const errorFor = (name: FieldName) =>
    touched[name] || attempted ? errors[name] : undefined;

  const trackGoogleAdsConversion = () => {
    if (typeof window === "undefined") return;

    const gtag = (
      window as Window &
        typeof globalThis & {
          gtag?: (...args: unknown[]) => void;
        }
    ).gtag;

    gtag?.("event", "conversion", {
      send_to: "AW-18453740960/XRANCNGI8_0cEKD7tt9E",
    });
  };

  const setField = (name: FieldName, value: string) => {
    setErrorMessage(null);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setField(e.target.name as FieldName, e.target.value);
  };

  const handleBlur = (name: FieldName) => {
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const firstInvalid = FIELD_ORDER.find((f) => errors[f]);
    if (firstInvalid) {
      setAttempted(true);
      const el = document.getElementById(firstInvalid);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/get-involved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: "Contact Page",
          inquiryType: "Contact",
          message: `Subject: ${formData.subject}\n\n${formData.message.trim()}`,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to send contact message.");
      }

      setSubmitted(true);
      trackGoogleAdsConversion();
      setFormData(EMPTY_FORM);
      setTouched({});
      setAttempted(false);
    } catch (error) {
      console.error("Error sending contact message:", error);
      setErrorMessage(
        "We couldn't send your message. Check your connection and try again, or email info@aspirewestafrica.com."
      );
    } finally {
      setIsSubmitting(false);
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
              Get in Touch
            </span>
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl leading-none font-black text-[#1a2b1a] mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Contact <span style={gradientText}>Us</span>
          </h1>
          <p className="text-[#4a5a4a] text-lg leading-relaxed max-w-2xl mx-auto">
            Have questions about GAMMAT 2026? We&apos;re here to help. Reach out
            to our team for inquiries about registration, sponsorship, speaking
            opportunities, or general information.
          </p>
        </div>
      </section>

      {/* ── Contact Info Grid ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="bg-white border border-[#d4d8d0] rounded-xl p-6 text-center transition-all hover:shadow-md"
              >
                <div
                  className="w-12 h-12 rounded-md flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${info.color}18` }}
                >
                  <info.icon
                    className="w-5 h-5"
                    style={{ color: info.color }}
                  />
                </div>
                <h3 className="text-base font-bold text-[#1a2b1a] mb-2">
                  {info.title}
                </h3>
                {info.lines.map((line) =>
                  line.href ? (
                    <a
                      key={line.text}
                      href={line.href}
                      target={
                        line.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        line.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="block text-sm text-[#3B6D11] leading-relaxed hover:underline break-words"
                    >
                      {line.text}
                    </a>
                  ) : (
                    <p
                      key={line.text}
                      className="text-sm text-[#4a5a4a] leading-relaxed"
                    >
                      {line.text}
                    </p>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form & Map ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white border border-[#d4d8d0] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-0.5 bg-[#3B6D11]" />
                <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
                  Send a Message
                </span>
              </div>
              <h2
                className="text-2xl font-black text-[#1a2b1a] mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                We&apos;d Love to{" "}
                <span style={gradientText}>Hear From You</span>
              </h2>
              <p className="text-sm text-[#4a5a4a] mb-6">
                Fill out the form below and our team will get back to you within
                24 hours.
              </p>

              {submitted ? (
                <div
                  role="status"
                  className="bg-[#eaf3de] border border-[#3B6D11]/30 rounded-lg p-6 text-center"
                >
                  <CheckCircle className="w-12 h-12 text-[#3B6D11] mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-[#1a2b1a] mb-1">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-[#4a5a4a] mb-4">
                    Thank you for reaching out. We&apos;ll respond shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-sm font-semibold text-[#3B6D11] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FieldShell
                      id="fullName"
                      label="Full Name"
                      required
                      error={errorFor("fullName")}
                    >
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={() => handleBlur("fullName")}
                        autoComplete="name"
                        aria-required
                        aria-invalid={!!errorFor("fullName")}
                        aria-describedby={
                          errorFor("fullName") ? "fullName-error" : undefined
                        }
                        className={inputClass(!!errorFor("fullName"))}
                        placeholder="John Doe"
                      />
                    </FieldShell>
                    <FieldShell
                      id="email"
                      label="Email Address"
                      required
                      error={errorFor("email")}
                    >
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        autoComplete="email"
                        inputMode="email"
                        autoCapitalize="none"
                        spellCheck={false}
                        aria-required
                        aria-invalid={!!errorFor("email")}
                        aria-describedby={
                          errorFor("email") ? "email-error" : undefined
                        }
                        className={inputClass(!!errorFor("email"))}
                        placeholder="john@example.com"
                      />
                    </FieldShell>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FieldShell
                      id="phone"
                      label="Phone Number"
                      optional
                      error={errorFor("phone")}
                    >
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={() => handleBlur("phone")}
                        autoComplete="tel"
                        inputMode="tel"
                        aria-invalid={!!errorFor("phone")}
                        aria-describedby={
                          errorFor("phone") ? "phone-error" : undefined
                        }
                        className={inputClass(!!errorFor("phone"))}
                        placeholder="+234 801 234 5678"
                      />
                    </FieldShell>

                    <FieldShell
                      id="subject"
                      label="Subject"
                      required
                      error={errorFor("subject")}
                    >
                      <Select
                        value={formData.subject}
                        onValueChange={(v) => {
                          setField("subject", v ?? "");
                          handleBlur("subject");
                        }}
                      >
                        <SelectTrigger
                          id="subject"
                          className={`w-full ${
                            errorFor("subject") ? "border-red-400" : ""
                          }`}
                          aria-invalid={!!errorFor("subject")}
                        >
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {SUBJECTS.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FieldShell>
                  </div>

                  <FieldShell
                    id="message"
                    label="Message"
                    required
                    error={errorFor("message")}
                  >
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={() => handleBlur("message")}
                      aria-required
                      aria-invalid={!!errorFor("message")}
                      aria-describedby={
                        errorFor("message") ? "message-error" : undefined
                      }
                      className={inputClass(!!errorFor("message"))}
                      placeholder="Tell us how we can help..."
                    />
                  </FieldShell>

                  {errorMessage && (
                    <div
                      role="alert"
                      className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3"
                    >
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Map & Location */}
            <div className="space-y-6">
              <div className="bg-white border border-[#d4d8d0] rounded-xl overflow-hidden">
                <div className="h-64 bg-[#eaf3de] relative">
                  <iframe
                    src="https://maps.google.com/maps?q=Oriental+Hotel+Lagos&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Oriental Hotel Lagos Location"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#1a2b1a] mb-2">
                    Venue Address
                  </h3>
                  <p className="text-sm text-[#4a5a4a]">
                    Oriental Hotel Lagos
                    <br />
                    3 Lekki - Epe Expressway
                    <br />
                    Victoria Island, Lagos, Nigeria
                  </p>
                </div>
              </div>

              <div className="bg-[#0d1a0f] rounded-xl p-5 text-center relative overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{
                    background:
                      "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)",
                  }}
                />
                <h3 className="text-white font-bold mb-2">
                  Need Immediate Assistance?
                </h3>
                <p className="text-white/60 text-sm mb-3">
                  Call our hotline for urgent inquiries
                </p>
                <a
                  href="tel:+2348066626462"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-[#2d6e2e] rounded-md text-sm font-bold text-white hover:bg-[#3a8a3b] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +234 806 662 6462
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team Contacts ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Our Team
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl leading-none font-black text-[#1a2b1a] mb-8"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Connect with the <span style={gradientText}>Right Team</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamContacts.map((contact) => (
              <div
                key={contact.name}
                className="bg-white border border-[#d4d8d0] rounded-xl p-5 hover:border-[#3B6D11]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-md bg-[#eaf3de] flex items-center justify-center mb-3">
                  <contact.icon className="w-4 h-4 text-[#3B6D11]" />
                </div>
                <h3 className="text-sm font-bold text-[#1a2b1a] mb-0.5">
                  {contact.name}
                </h3>
                <p className="text-[11px] text-[#4a5a4a] mb-3">
                  {contact.role}
                </p>
                <div className="space-y-1">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 text-xs text-[#3B6D11] hover:underline break-all"
                  >
                    <Mail className="w-3 h-3 shrink-0" />
                    {contact.email}
                  </a>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-xs text-[#4a5a4a] hover:text-[#3B6D11] transition-colors"
                  >
                    <Phone className="w-3 h-3 shrink-0" />
                    {contact.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-0.5 bg-[#3B6D11]" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
              Frequently Asked Questions
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl leading-none font-black text-[#1a2b1a] mb-8"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Got <span style={gradientText}>Questions?</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-white border border-[#d4d8d0] rounded-xl p-5 hover:border-[#3B6D11]/40 transition-colors"
              >
                <h3 className="text-sm font-bold text-[#1a2b1a] mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-[#4a5a4a] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Media ── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="bg-linear-to-br from-[#0d1a0f] to-[#1a2b1a] rounded-xl p-10 text-center relative overflow-hidden">
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)",
              }}
            />
            <h2
              className="text-3xl sm:text-4xl font-black text-white mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Stay <span style={gradientText}>Connected</span>
            </h2>
            <p className="text-white/40 text-sm mb-6 max-w-md mx-auto">
              Follow us on social media for updates, announcements, and
              behind-the-scenes content.
            </p>
            <div className="flex justify-center gap-4">
              {[
                ["https://facebook.com/aspirewestafrica", "Facebook"],
                ["https://twitter.com/aspirewestafrica", "X (Twitter)"],
                ["https://linkedin.com/company/aspirewestafrica", "LinkedIn"],
                ["https://instagram.com/aspirewestafrica", "Instagram"],
              ].map(([url, label]) => (
                <SocialIcon
                  key={url}
                  url={url}
                  label={label}
                  bgColor="transparent"
                  fgColor="#ffffff"
                  style={{ width: 40, height: 40, opacity: 0.6 }}
                  className="hover:opacity-100 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
