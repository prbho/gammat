"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Menu, X, Play, ArrowRight } from "lucide-react";
import { SocialIcon } from "react-social-icons";
import Image from "next/image";
import VideoModal from "./VideoModal";
import InterestModal from "./InterestModal";

const navLinks = [
  { href: "/about", label: "About", isPage: true },
  { href: "/events", label: "Events", isPage: true },
  { href: "/gallery", label: "Gallery", isPage: true },
  { href: "/exhibition", label: "Exhibition", isPage: true },
  { href: "/dignitaries", label: "Dignitaries", isPage: true },
  { href: "/sponsorship", label: "Sponsors", isPage: true },
  { href: "/participation", label: "Participation", isPage: true },
  { href: "/interest", label: "Register", isPage: true },
];

const socialNetworks = [
  { url: "https://linkedin.com/company/aspirewestafrica", network: "linkedin" },
  { url: "https://facebook.com/aspirewestafrica", network: "facebook" },
  { url: "https://instagram.com/aspirewestafrica", network: "instagram" },
  { url: "https://twitter.com/aspirewestafrica", network: "x" },
  { url: "https://tiktok.com/@aspirewestafrica", network: "tiktok" },
];

const RAINBOW =
  "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300";

// Shared video used by the nav CTA
const HIGHLIGHTS_VIDEO_ID = "AphgVPPhReU";
const HIGHLIGHTS_START = 12; // matches ?t=12s

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [interestOpen, setInterestOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      if (pathname === "/") {
        const sections = [
          "about",
          "objectives",
          "ecosystem",
          "sponsors",
          "dignitaries",
        ];
        const scrollPosition = window.scrollY + 100;
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const openVideoFromMobile = () => {
    setMenuOpen(false);
    setVideoOpen(true);
  };

  const openInterestFromMobile = () => {
    setMenuOpen(false);
    setInterestOpen(true);
  };

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        closeMenu();
      }
    } else {
      closeMenu();
    }
  };

  const isActiveLink = (href: string) => {
    if (href.startsWith("#"))
      return pathname === "/" && activeSection === href.substring(1);
    return pathname === href;
  };

  const display = { fontFamily: "'Bebas Neue', sans-serif" } as const;

  return (
    <>
      {/* Top bar: contact + social */}
      <div
        className={`fixed left-0 right-0 top-0 z-50 hidden transition-all duration-500 md:block ${
          scrolled
            ? "pointer-events-none -translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="border-b border-white/10 bg-[#04102a]/85 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-9 items-center justify-between">
              <div className="flex items-center gap-6 text-[12px]">
                <a
                  href="tel:+2348066626462"
                  className="flex items-center gap-1.5 text-white/55 transition-colors hover:text-sky-300"
                >
                  <Phone className="h-3 w-3" />
                  +234 80666 26 462
                </a>
                <a
                  href="mailto:info@aspirewestafrica.com"
                  className="flex items-center gap-1.5 text-white/55 transition-colors hover:text-sky-300"
                >
                  <Mail className="h-3 w-3" />
                  info@aspirewestafrica.com
                </a>
                <div className="flex items-center gap-1.5 text-white/40">
                  <MapPin className="h-3 w-3" />
                  Lagos, Nigeria
                </div>
              </div>
              <div className="flex items-center gap-1">
                {socialNetworks.map((social) => (
                  <SocialIcon
                    key={social.network}
                    url={social.url}
                    network={social.network}
                    bgColor="transparent"
                    fgColor="#7cc0f7"
                    className="transition-transform duration-200 hover:scale-110"
                    style={{ width: 22, height: 22 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "top-0 border-b border-white/10 bg-[#061330]/95 shadow-2xl backdrop-blur-xl"
            : "top-0 bg-[#061330]/70 backdrop-blur-md md:top-9"
        }`}
      >
        {scrolled && (
          <div
            className="absolute left-0 right-0 top-0 h-0.5"
            style={{ background: RAINBOW }}
          />
        )}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-[72px]">
            {/* Logo */}
            <Link href="/" className={`shrink-0 rounded-sm ${focusRing}`}>
              <Image
                src="/logo-w.webp"
                alt="GAMMAT 2026"
                width={260}
                height={58}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-0.5 md:flex" style={display}>
              {navLinks.map((link) => {
                const active = isActiveLink(link.href);
                const cls = `relative rounded-sm px-4 py-2 text-base tracking-widest font-light transition-colors duration-200 ${focusRing}  ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/90 hover:bg-white/5 hover:text-white"
                }`;
                const underline = active && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#3b9cf0]" />
                );
                return (
                  <li key={link.href}>
                    {link.isPage ? (
                      <Link href={link.href} className={cls}>
                        {link.label}
                        {underline}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        className={cls}
                        style={display}
                      >
                        {link.label}
                        {underline}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
            {/* <button
              type="button"
              onClick={() => setInterestOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={interestOpen}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-sm bg-[#2d6e2e] border border-[#3d9e3e] px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-[#3a8a3b] ${focusRing}`}
            >
              Register interest
              <ArrowRight className="h-3.5 w-3.5" />
            </button> */}

            {/* Desktop CTAs — Watch (lg+), Register (md+) */}
            <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={videoOpen}
                className={`hidden cursor- tracking-widest items-center gap-2 rounded-sm bg-red-700 px-5 py-1 text-lg font-semibold text-white transition-colors duration-200 hover:bg-red-600 lg:inline-flex ${focusRing}`}
                style={display}
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                Watch highlights
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className={`flex h-9 w-9 items-center justify-center rounded-sm border border-white/15 bg-white/10 transition-colors hover:bg-white/20 md:hidden ${focusRing}`}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="h-[18px] w-[18px] text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-[#061330] transition-opacity duration-300 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <div
          className="absolute left-0 right-0 top-0 h-0.5"
          style={{ background: RAINBOW }}
        />

        <button
          onClick={closeMenu}
          className={`absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-sm border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 ${focusRing}`}
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex min-h-screen flex-col items-center justify-center gap-5 overflow-y-auto px-8 py-16">
          <Image
            src="/logo.png"
            alt="GAMMAT 2026"
            width={140}
            height={50}
            className="mb-4 h-9 w-auto opacity-90"
          />

          {navLinks.map((link, idx) => {
            const cls = `text-4xl text-white/70 transition-all duration-300 hover:text-white ${focusRing} ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`;
            const style = {
              fontFamily: "'Bebas Neue', sans-serif",
              transitionDelay: `${idx * 40}ms`,
              letterSpacing: "0.04em",
            };
            return link.isPage ? (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cls}
                style={style}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={cls}
                style={style}
              >
                {link.label}
              </a>
            );
          })}

          {/* Primary: Register interest */}
          <button
            type="button"
            onClick={openInterestFromMobile}
            aria-haspopup="dialog"
            aria-expanded={interestOpen}
            className={`mt-6 inline-flex items-center gap-2 rounded-sm bg-[#2d6e2e] border border-[#3d9e3e] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#3a8a3b] ${focusRing} ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Register interest
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          {/* Secondary: Watch highlights */}
          <button
            type="button"
            onClick={openVideoFromMobile}
            aria-haspopup="dialog"
            aria-expanded={videoOpen}
            className={`inline-flex items-center gap-2 rounded-sm bg-red-700 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-600 ${focusRing} ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "240ms" }}
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            Watch highlights
          </button>

          <div
            className={`mt-8 flex flex-col items-center gap-3 transition-opacity duration-500 ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "280ms" }}
          >
            <div className="flex flex-col items-center gap-2">
              <a
                href="tel:+2348066626462"
                className="flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-sky-300"
              >
                <Phone className="h-3.5 w-3.5" />
                +234 80666 26 462
              </a>
              <a
                href="mailto:info@aspirewestafrica.com"
                className="flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-sky-300"
              >
                <Mail className="h-3.5 w-3.5" />
                info@aspirewestafrica.com
              </a>
            </div>
            <div className="mt-1 flex gap-1.5">
              {socialNetworks.map((social) => (
                <SocialIcon
                  key={social.network}
                  url={social.url}
                  network={social.network}
                  bgColor="transparent"
                  fgColor="#7cc0f7"
                  className="transition-transform duration-200 hover:scale-110"
                  style={{ width: 28, height: 28 }}
                />
              ))}
            </div>
          </div>

          <p className="mt-6 text-xs text-white/35">
            © 2026 GAMMAT Summit. All rights reserved.
          </p>
        </div>
      </div>

      {/* Shared video modal */}
      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoId={HIGHLIGHTS_VIDEO_ID}
        start={HIGHLIGHTS_START}
        title="Summit highlights"
      />

      {/* 2027 interest modal */}
      <InterestModal
        open={interestOpen}
        onClose={() => setInterestOpen(false)}
      />
    </>
  );
}
