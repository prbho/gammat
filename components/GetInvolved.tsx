"use client";

import { FormEvent, useState } from "react";
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

export default function GetInvolved() {
  return (
    <section id="get-involved" className="py-24 px-6 bg-[#0d1a0f]">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — Contact info */}
          <div className="flex flex-col gap-6">
            {/* Section label */}
            <FadeUp>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-0.5 bg-[#3B6D11]" />
                <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#3B6D11]">
                  Contact Information
                </span>
              </div>
              <h2
                className="text-[56px] sm:text-[72px] leading-none font-black text-white mb-3"
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
              <p className="text-white/40 text-sm mb-14 max-w-md leading-relaxed">
                Join Africa&apos;s premier transport leadership platform and be
                part of the continent&apos;s transformation story.
              </p>
            </FadeUp>
            <FadeUp delay={1}>
              {/* Org name */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-md bg-[#3B6D11]/20 border border-[#3B6D11]/40 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm font-bold text-white">
                  Aspire West Africa / ELIAD
                </span>
              </div>

              {/* Contact rows */}
              <div className="flex flex-col gap-4">
                {contactItems.map(({ icon: Icon, lines, href }) => (
                  <div key={lines[0]} className="flex gap-3">
                    <div className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {lines.map((line) =>
                        href ? (
                          <a
                            key={line}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-green-400 hover:text-green-300 transition-colors"
                          >
                            {line}
                          </a>
                        ) : (
                          <span
                            key={line}
                            className="text-xs text-white/55 leading-relaxed"
                          >
                            {line}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Social icons */}
            <FadeUp delay={2}>
              <div className="border border-white/10 rounded-lg p-4 flex flex-wrap gap-2 mt-2">
                {socialNetworks.map((social) => (
                  <SocialIcon
                    key={social.network}
                    url={social.url}
                    network={social.network}
                    bgColor="transparent"
                    fgColor="#6dd06e"
                    className="hover:scale-110 transition-transform duration-200"
                    style={{ width: 32, height: 32 }}
                  />
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right — Inquiry form */}
          <FadeUp delay={2}>
            <div>
              <div className="mb-5">
                <h3 className="text-base font-bold text-white mb-1">
                  Quick Inquiry
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  Send us a message and our team will get back to you within 24
                  hours.
                </p>
              </div>

              <div className="border border-white/10 rounded-xl p-6 bg-white/3">
                <InquiryForm />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function InquiryForm() {
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
        "Your message was sent successfully. We will get back to you soon."
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
        "There was an issue sending your message. Please try again or contact us directly."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[11px] font-bold tracking-wider uppercase text-white/40 mb-1.5">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your full name"
          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#3B6D11] focus:ring-1 focus:ring-[#3B6D11]/50 transition-colors"
        />
      </div>
      <div>
        <label className="block text-[11px] font-bold tracking-wider uppercase text-white/40 mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="your@email.com"
          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#3B6D11] focus:ring-1 focus:ring-[#3B6D11]/50 transition-colors"
        />
      </div>
      <div>
        <label className="block text-[11px] font-bold tracking-wider uppercase text-white/40 mb-1.5">
          Phone Number
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+234 800 000 0000"
          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#3B6D11] focus:ring-1 focus:ring-[#3B6D11]/50 transition-colors"
        />
      </div>
      <div>
        <label className="block text-[11px] font-bold tracking-wider uppercase text-white/40 mb-1.5">
          Company / Organisation
        </label>
        <input
          type="text"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          placeholder="Your organisation"
          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#3B6D11] focus:ring-1 focus:ring-[#3B6D11]/50 transition-colors"
        />
      </div>
      <div>
        <label className="block text-[11px] font-bold tracking-wider uppercase text-white/40 mb-1.5">
          Message
        </label>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Your message..."
          rows={4}
          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#3B6D11] focus:ring-1 focus:ring-[#3B6D11]/50 transition-colors resize-none"
        />
      </div>
      {feedback ? (
        <div
          className={`rounded-lg px-4 py-3 text-sm ${
            status === "success"
              ? "bg-[#eff9ef] text-[#194d26] border border-[#b7d1b2]"
              : "bg-[#fff1f1] text-[#6f1d1d] border border-[#e4c5c5]"
          }`}
        >
          {feedback}
        </div>
      ) : null}
      <button
        type="submit"
        disabled={disabled}
        className="group w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send className="w-3.5 h-3.5" />
        {loading ? "Sending..." : "Send Message"}
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </form>
  );
}
