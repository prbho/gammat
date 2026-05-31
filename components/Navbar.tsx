"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Menu, X, ArrowRight } from "lucide-react";
import { SocialIcon } from "react-social-icons";
import Image from "next/image";

const navLinks = [
  { href: "/about", label: "About", isPage: true },
  { href: "/events", label: "Events", isPage: true },
  { href: "/exhibition", label: "Exhibition", isPage: true },
  { href: "/ecosystem", label: "Ecosystem", isPage: true },
  { href: "/sponsorship", label: "Sponsors", isPage: true },
  { href: "/dignitaries", label: "Dignitaries", isPage: false },
];

const socialNetworks = [
  { url: "https://linkedin.com/company/aspirewestafrica", network: "linkedin" },
  { url: "https://facebook.com/aspirewestafrica", network: "facebook" },
  { url: "https://instagram.com/aspirewestafrica", network: "instagram" },
  { url: "https://twitter.com/aspirewestafrica", network: "x" },
  { url: "https://tiktok.com/@aspirewestafrica", network: "tiktok" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const closeMenu = () => setMenuOpen(false);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
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

  return (
    <>
      {/* Top bar — contact + social */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 hidden md:block ${
          scrolled
            ? "opacity-0 -translate-y-full pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <div className="bg-[#080f08]/80 backdrop-blur-md border-b border-white/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-9">
              <div className="flex items-center gap-6 text-[11px]">
                <a
                  href="tel:+2348066626462"
                  className="flex items-center gap-1.5 text-white/40 hover:text-green-400 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  +234 80666 26 462
                </a>
                <a
                  href="mailto:info@aspirewestafrica.com"
                  className="flex items-center gap-1.5 text-white/40 hover:text-green-400 transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  info@aspirewestafrica.com
                </a>
                <div className="flex items-center gap-1.5 text-white/30">
                  <MapPin className="w-3 h-3" />
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
                    fgColor="#6dd06e"
                    className="hover:scale-110 transition-transform duration-200"
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
            ? "top-0 bg-[#0d1a0f]/95 backdrop-blur-xl border-b border-white/8 shadow-2xl"
            : "top-0 bg-[#0d1a0f]/70 backdrop-blur-md md:top-9"
        }`}
      >
        {/* Rainbow stripe on top of scrolled nav */}
        {scrolled && (
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{
              background:
                "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)",
            }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src="/logo.png"
                alt="GAMMAT 2026"
                width={260}
                height={58}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const active = isActiveLink(link.href);
                const cls = `relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-200 rounded-md ${
                  active
                    ? "text-white bg-white/8"
                    : "text-white/55 hover:text-white hover:bg-white/5"
                }`;
                return (
                  <li key={link.href}>
                    {link.isPage ? (
                      <Link href={link.href} className={cls}>
                        {link.label}
                        {active && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#3B6D11] rounded-full" />
                        )}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        className={cls}
                      >
                        {link.label}
                        {active && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#3B6D11] rounded-full" />
                        )}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-wider uppercase text-white hover:bg-[#3a8a3b] transition-colors duration-200"
              >
                Register Now
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-9 h-9 rounded-md bg-white/8 border border-white/12 hover:bg-white/15 transition-colors flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu className="w-4.5 h-4.5 text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-60 bg-[#0d1a0f] transition-all duration-400 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Rainbow stripe top */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background:
              "linear-gradient(90deg, #e05c10 0%, #f4a200 18%, #3db340 36%, #1a9c6e 50%, #1a70c8 68%, #6e28d9 84%, #c4267a 100%)",
          }}
        />

        <button
          onClick={closeMenu}
          className="absolute top-5 right-5 w-9 h-9 rounded-md bg-white/8 border border-white/12 text-white hover:bg-white/15 transition-colors flex items-center justify-center"
          aria-label="Close menu"
        >
          <X className="w-4 h-4" />
        </button>

        <nav className="flex flex-col items-center justify-center min-h-screen gap-5 px-8">
          {/* Logo in mobile menu */}
          <Image
            src="/logo.png"
            alt="GAMMAT 2026"
            width={140}
            height={50}
            className="h-9 w-auto mb-4 opacity-80"
          />

          {navLinks.map((link, idx) => {
            const cls = `text-2xl font-black text-white/60 hover:text-white transition-all duration-300 transform ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`;
            return link.isPage ? (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cls}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  transitionDelay: `${idx * 40}ms`,
                  letterSpacing: "0.04em",
                }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={cls}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  transitionDelay: `${idx * 40}ms`,
                  letterSpacing: "0.04em",
                }}
              >
                {link.label}
              </a>
            );
          })}

          <Link
            href="/register"
            onClick={closeMenu}
            className={`mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-[#2d6e2e] border border-[#3d9e3e] rounded-md text-sm font-bold tracking-widest uppercase text-white hover:bg-[#3a8a3b] transition-all duration-300 ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Register Now
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div
            className={`mt-8 flex flex-col items-center gap-3 transition-all duration-500 ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "260ms" }}
          >
            <div className="flex flex-col items-center gap-2">
              <a
                href="tel:+2348066626462"
                className="flex items-center gap-2 text-xs text-white/35 hover:text-green-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                +234 80666 26 462
              </a>
              <a
                href="mailto:info@aspirewestafrica.com"
                className="flex items-center gap-2 text-xs text-white/35 hover:text-green-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                info@aspirewestafrica.com
              </a>
            </div>
            <div className="flex gap-1.5 mt-1">
              {socialNetworks.map((social) => (
                <SocialIcon
                  key={social.network}
                  url={social.url}
                  network={social.network}
                  bgColor="transparent"
                  fgColor="#6dd06e"
                  className="hover:scale-110 transition-transform duration-200"
                  style={{ width: 28, height: 28 }}
                />
              ))}
            </div>
          </div>

          <p
            className={`absolute bottom-7 text-[11px] text-white/20 transition-all duration-500 delay-500 ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            © 2026 GAMMAT Summit. All rights reserved.
          </p>
        </nav>
      </div>
    </>
  );
}
