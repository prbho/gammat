"use client";

import { FormEvent, useId, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Send,
  Building2,
  ArrowRight,
} from "lucide-react";
import FadeUp from "./FadeUp";
import { SocialIcon } from "react-social-icons";

const socialNetworks = [
  { url: "https://linkedin.com/company/aspirewestafrica", network: "linkedin" },
  { url: "https://facebook.com/aspirewestafrica", network: "facebook" },
  { url: "https://instagram.com/aspirewestafrica", network: "instagram" },
  { url: "https://twitter.com/aspirewestafrica", network: "twitter" },
  { url: "https://tiktok.com/@aspirewestafrica", network: "tiktok" },
];

const contactItems = [
  {
    icon: MapPin,
    lines: [
      "LF6A, DIDI Mall, By Novare Mall, KM 42",
      "Lekki/Epe Expressway, Sangotedo, Lagos, Nigeria.",
    ],
  },
  {
    icon: Phone,
    lines: ["+234 80666 26 462", "08144 00 7090  ·  090 3030 4088"],
  },
  {
    icon: Mail,
    lines: ["info@aspirewestafrica.com", "aspirewestafricamag@gmail.com"],
  },
  {
    icon: Globe,
    lines: ["www.aspirewestafrica.com"],
    href: "https://www.aspirewestafrica.com",
  },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300";

export default function GetInvolved() {
  return (
    <section id="get-involved" className="bg-[#061330] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left: contact info */}
          <div className="flex flex-col gap-6">
            <FadeUp>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-0.5 w-6 bg-[#1b5fc1]" />
                <span className="text-sm font-semibold text-sky-300">
                  Contact information
                </span>
              </div>
              <h2
                className="mb-3 text-[56px] font-normal leading-none text-white sm:text-[80px]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Get{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Involved
                </span>
              </h2>
              <p className="mb-14 max-w-md text-base leading-relaxed text-white/65">
                Be part of the continent&apos;s transformation story. Talk to us
                about sponsoring, exhibiting or partnering with GAMMAT 2027.
              </p>
            </FadeUp>

            <FadeUp delay={1}>
              {/* Org name */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#1b5fc1]/50 bg-[#1b5fc1]/20">
                  <Building2 className="h-4 w-4 text-sky-300" />
                </div>
                <span className="text-base font-semibold text-white">
                  Aspire West Africa / ELIAD
                </span>
              </div>

              {/* Contact rows */}
              <div className="flex flex-col gap-4">
                {contactItems.map(({ icon: Icon, lines, href }) => (
                  <div key={lines[0]} className="flex gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5">
                      <Icon className="h-3.5 w-3.5 text-sky-300" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {lines.map((line) =>
                        href ? (
                          <a
                            key={line}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`rounded-sm text-sm text-sky-300 transition-colors hover:text-white ${focusRing}`}
                          >
                            {line}
                          </a>
                        ) : (
                          <span
                            key={line}
                            className="text-sm leading-relaxed text-white/70"
                          >
                            {line}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Social icons */}
            <FadeUp delay={2}>
              <div className="mt-2 flex flex-wrap gap-2 rounded-lg border border-white/10 p-4">
                {socialNetworks.map((social) => (
                  <SocialIcon
                    key={social.network}
                    url={social.url}
                    network={social.network}
                    bgColor="transparent"
                    fgColor="#7cc0f7"
                    className="transition-transform duration-200 hover:scale-110"
                    style={{ width: 32, height: 32 }}
                  />
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right: inquiry form */}
          <FadeUp delay={2}>
            <div>
              <div className="mb-5">
                <h3 className="mb-1 text-lg font-semibold text-white">
                  Quick inquiry
                </h3>
                <p className="text-sm leading-relaxed text-white/60">
                  Send us a message and our team will get back to you within 24
                  hours.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                <InquiryForm />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-md border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/35 transition-colors focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/60";

function Field({
  label,
  required,
  children,
  id,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-white/70"
      >
        {label}
        {required && <span className="text-sky-300"> *</span>}
      </label>
      {children}
    </div>
  );
}

function InquiryForm() {
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const disabled = loading || !name.trim() || !email.trim() || !message.trim();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled) return;

    setLoading(true);
    setStatus("idle");
    setFeedback("");

    try {
      const response = await fetch("/api/get-involved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, company, message }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to send message.");
      }

      setStatus("success");
      setFeedback(
        "Your message was sent successfully. We will get back to you soon.",
      );
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setFeedback(
        "There was an issue sending your message. Please try again or contact us directly.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Full name" required id={`${uid}-name`}>
        <input
          id={`${uid}-name`}
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          className={inputCls}
        />
      </Field>
      <Field label="Email address" required id={`${uid}-email`}>
        <input
          id={`${uid}-email`}
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={inputCls}
        />
      </Field>
      <Field label="Phone number" id={`${uid}-phone`}>
        <input
          id={`${uid}-phone`}
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+234 800 000 0000"
          className={inputCls}
        />
      </Field>
      <Field label="Company / organisation" id={`${uid}-company`}>
        <input
          id={`${uid}-company`}
          type="text"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Your organisation"
          className={inputCls}
        />
      </Field>
      <Field label="Message" required id={`${uid}-message`}>
        <textarea
          id={`${uid}-message`}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message..."
          rows={4}
          className={`${inputCls} resize-none`}
        />
      </Field>

      <div aria-live="polite">
        {feedback ? (
          <div
            role={status === "error" ? "alert" : "status"}
            className={`rounded-lg border px-4 py-3 text-sm ${
              status === "success"
                ? "border-sky-300/30 bg-sky-400/10 text-sky-100"
                : "border-red-400/30 bg-red-500/10 text-red-200"
            }`}
          >
            {feedback}
          </div>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={disabled}
        className={`group flex w-full items-center justify-center gap-2 rounded-sm bg-[#1b5fc1] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#2670d8] disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
      >
        <Send className="h-3.5 w-3.5" />
        {loading ? "Sending..." : "Send message"}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
