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
    { label: "Join us in 2027", href: "/register" },
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

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300";

const headingCls = "mb-4 text-sm font-semibold text-sky-300";

/* ── Module-scope helpers + components ──
   Kept outside Footer() so React sees a stable component type
   across renders and doesn't remount the list. */

function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (href.startsWith("#") && href.length > 1) {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }
}

function LinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            onClick={(e) => smoothScroll(e, link.href)}
            className={`group flex items-center gap-1.5 rounded-sm text-sm text-white/65 transition-colors hover:text-white ${focusRing}`}
          >
            <ArrowRight className="h-3 w-3 -translate-x-1 text-sky-300 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#04102a]">
      {/* Organiser strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <div className="mb-1.5 flex items-center gap-3">
                <span className="h-0.5 w-5 bg-[#1b5fc1]" />
                <span className="text-sm font-semibold text-white/70 sm:text-base">
                  GAMMA &amp; Tech Summit 2026
                </span>
              </div>
              <p className="text-sm text-sky-300">
                Powered by <span className="font-bold">NIMASA</span> &amp;
                <span className="ml-1 font-bold">Aspire West Africa</span>.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 md:flex-row">
              <div className="relative flex aspect-[4/3] w-32 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-blue-950">
                <Image
                  src={"/partners/aspire-west-africa.png"}
                  alt="Aspire West Africa logo"
                  fill
                  className="object-contain p-3"
                  sizes="128px"
                  quality={75}
                  priority={false}
                />
              </div>
              <div className="relative flex aspect-[4/3] w-32 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white">
                <Image
                  src={"/partners/nimasa-logo.jpg"}
                  alt="NIMASA logo"
                  fill
                  className="object-contain p-3"
                  sizes="128px"
                  quality={75}
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-5">
            <Link href="/" className={`inline-block rounded-sm ${focusRing}`}>
              <div className="flex flex-col gap-1">
                <span
                  className="text-[32px] font-normal leading-none text-white"
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
                <span className="text-xs text-white/50">
                  Africa&apos;s Integrated Transport Summit
                </span>
              </div>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              The premier platform connecting Africa&apos;s transport ecosystem:
              aviation, maritime, logistics, infrastructure, and technology.
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
                    className={`flex items-center gap-2 rounded-sm text-sm text-white/65 transition-colors hover:text-sky-300 ${focusRing}`}
                  >
                    <Icon className="h-3.5 w-3.5 text-sky-300/80" />
                    {text}
                  </a>
                ) : (
                  <div
                    key={text}
                    className="flex items-center gap-2 text-sm text-white/65"
                  >
                    <Icon className="h-3.5 w-3.5 text-sky-300/80" />
                    {text}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className={headingCls}>Quick links</h4>
            <LinkList links={footerLinks.quick} />
          </div>

          {/* Get involved */}
          <div>
            <h4 className={headingCls}>Get involved</h4>
            <LinkList links={footerLinks.participate} />
          </div>

          {/* Legal + social */}
          <div>
            <h4 className={headingCls}>Legal</h4>
            <ul className="mb-8 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`rounded-sm text-sm text-white/65 transition-colors hover:text-white ${focusRing}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className={headingCls}>Follow us</h4>
            <div className="flex flex-wrap gap-1.5">
              {socialNetworks.map((social) => (
                <SocialIcon
                  key={social.network}
                  url={social.url}
                  network={social.network}
                  bgColor="transparent"
                  fgColor="#7cc0f7"
                  className="transition-transform duration-200 hover:scale-110"
                  style={{ width: 30, height: 30 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rainbow stripe */}
      <div
        className="h-0.5 w-full"
        style={{
          background:
            "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)",
        }}
      />

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-xs text-white/45">
            © 2026 GAMMAT Summit. All rights reserved.
          </p>
          <p className="text-xs text-white/45">
            Organised by{" "}
            <a
              href="https://www.aspirewestafrica.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-sm text-sky-300 transition-colors hover:text-white ${focusRing}`}
            >
              Aspire West Africa / ELIAD
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
