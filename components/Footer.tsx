"use client";

import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { SocialIcon } from "react-social-icons";
import Image from "next/image";

const footerLinks = {
  quick: [
    { label: "About", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Ecosystem", href: "/ecosystem" },
    { label: "Sponsors", href: "/sponsors" },
    { label: "Dignitaries", href: "/dignitaries" },
  ],
  participate: [
    { label: "Register to Attend", href: "/register" },
    { label: "Become a Sponsor", href: "/sponsors" },
    { label: "Exhibition Booth", href: "/exhibition" },
    { label: "Become a Partner", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Code of Conduct", href: "#" },
  ],
};

const socialNetworks = [
  { url: "https://linkedin.com/company/aspirewestafrica", network: "linkedin" },
  { url: "https://facebook.com/aspirewestafrica", network: "facebook" },
  { url: "https://instagram.com/aspirewestafrica", network: "instagram" },
  { url: "https://twitter.com/aspirewestafrica", network: "x" },
  { url: "https://tiktok.com/@aspirewestafrica", network: "tiktok" },
];

export default function Footer() {
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#080f08] border-t border-white/8">
      {/* Newsletter strip */}
      <div className="border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                <span className="w-5 h-0.5 bg-[#3B6D11]" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase text-white/45">
                  GAMMA & TECH SUMMIT 2026
                </span>
              </div>
              <p className="text-[#3B6D11] text-sm">
                ... powered by <span className="font-bold">NIMASA</span> &
                <span className="font-bold ml-1">Aspire West Africa</span>.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="relative w-32 aspect-4/3 rounded-xl overflow-hidden flex items-center justify-center border border-white/10 group-hover:border-green-500/30 transition-colors bg-blue-950">
                <Image
                  src={"/partners/aspire-west-africa.png"}
                  alt="Aspire West Africa logo"
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  quality={100}
                  priority={false}
                />
              </div>
              <div className="relative w-32 aspect-4/3 rounded-xl overflow-hidden flex items-center justify-center border border-white/10 group-hover:border-green-500/30 transition-colors bg-white">
                <Image
                  src={"/partners/nimasa-logo.jpg"}
                  alt="NIMASA logo"
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  quality={100}
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <div className="flex flex-col gap-0.5">
                <span
                  className="text-[28px] leading-none font-black text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  GAMMAT{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, #e05c10 0%, #f4a200 30%, #3db340 60%, #1a70c8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    2026
                  </span>
                </span>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-white/30">
                  Africa&apos;s Integrated Transport Summit
                </span>
              </div>
            </Link>

            <p className="text-white/35 text-xs leading-relaxed">
              The premier platform connecting Africa&apos;s transport ecosystem
              — aviation, maritime, logistics, infrastructure, and technology.
            </p>

            <div className="flex flex-col gap-2.5 pt-1">
              {[
                {
                  Icon: Phone,
                  text: "+234 80666 26 462",
                  href: "tel:+2348066626462",
                },
                {
                  Icon: Mail,
                  text: "info@aspirewestafrica.com",
                  href: "mailto:info@aspirewestafrica.com",
                },
                { Icon: MapPin, text: "Lagos, Nigeria", href: undefined },
              ].map(({ Icon, text, href }) =>
                href ? (
                  <a
                    key={text}
                    href={href}
                    className="flex items-center gap-2 text-xs text-white/35 hover:text-green-400 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-green-400/60" />
                    {text}
                  </a>
                ) : (
                  <div
                    key={text}
                    className="flex items-center gap-2 text-xs text-white/35"
                  >
                    <Icon className="w-3.5 h-3.5 text-green-400/60" />
                    {text}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#3B6D11] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.quick.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="group flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-green-400" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Participate */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#3B6D11] mb-4">
              Get Involved
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.participate.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="group flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-green-400" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Social */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#3B6D11] mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 mb-8">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/40 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#3B6D11] mb-3">
              Follow Us
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {socialNetworks.map((social) => (
                <SocialIcon
                  key={social.network}
                  url={social.url}
                  network={social.network}
                  bgColor="transparent"
                  fgColor="#6dd06e"
                  className="hover:scale-110 transition-transform duration-200"
                  style={{ width: 30, height: 30 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rainbow stripe */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)",
        }}
      />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-white/20">
            © 2026 GAMMAT Summit. All rights reserved.
          </p>
          <p className="text-[11px] text-white/20">
            Organised by{" "}
            <a
              href="https://www.aspirewestafrica.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400/60 hover:text-green-400 transition-colors"
            >
              Aspire West Africa / ELIAD
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
