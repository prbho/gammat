import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV !== "production";

// ─────────────────────────────────────────────────────────────
// Origins, grouped by service for easy maintenance
// ─────────────────────────────────────────────────────────────

// Google Tag Manager + Google Analytics (GA4)
const GTM_SCRIPTS = [
  "https://www.googletagmanager.com",
  "https://tagmanager.google.com",
];
const GTM_CONNECT = [
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://analytics.google.com",
  "https://region1.google-analytics.com",
  "https://stats.g.doubleclick.net",
];
const GTM_IMAGES = [
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://www.gstatic.com",
];

// Google Ads (conversion tracking, remarketing)
const GADS_SCRIPTS = [
  "https://googleads.g.doubleclick.net",
  "https://www.googleadservices.com",
  "https://www.google.com",
  "https://pagead2.googlesyndication.com",
  "https://tpc.googlesyndication.com",
];
const GADS_CONNECT = [
  "https://googleads.g.doubleclick.net",
  "https://www.googleadservices.com",
  "https://www.google.com",
  "https://www.google.com.ng",
  "https://ad.doubleclick.net",
  "https://pagead2.googlesyndication.com",
];
const GADS_IMAGES = [
  "https://googleads.g.doubleclick.net",
  "https://www.googleadservices.com",
  "https://www.google.com",
  "https://www.google.com.ng",
  "https://ad.doubleclick.net",
  "https://pagead2.googlesyndication.com",
  "https://www.gstatic.com",
];

// Cloudflare Web Analytics / Insights
const CF_SCRIPTS = ["https://static.cloudflareinsights.com"];
const CF_CONNECT = ["https://cloudflareinsights.com"];

// Paystack inline checkout
const PAYSTACK_SCRIPTS = ["https://js.paystack.co"];
const PAYSTACK_CONNECT = [
  "https://js.paystack.co",
  "https://api.paystack.co",
  "https://checkout.paystack.com",
];
const PAYSTACK_FRAMES = [
  "https://checkout.paystack.com",
  "https://js.paystack.co",
];
const PAYSTACK_IMAGES = [
  "https://js.paystack.co",
  "https://checkout.paystack.com",
];

const ContentSecurityPolicy = [
  "default-src 'self'",

  // Scripts
  [
    "script-src 'self' 'unsafe-inline'",
    ...(isDevelopment ? ["'unsafe-eval'"] : []),
    ...GTM_SCRIPTS,
    ...GADS_SCRIPTS,
    ...CF_SCRIPTS,
    ...PAYSTACK_SCRIPTS,
  ].join(" "),

  [
    "script-src-elem 'self' 'unsafe-inline'",
    ...GTM_SCRIPTS,
    ...GADS_SCRIPTS,
    ...CF_SCRIPTS,
    ...PAYSTACK_SCRIPTS,
  ].join(" "),

  // Hardening
  "object-src 'none'",
  "base-uri 'self'",

  // Frames: Paystack checkout modal only (+ GTM noscript iframe)
  [
    "frame-src 'self'",
    "https://www.googletagmanager.com",
    ...PAYSTACK_FRAMES,
    ...GADS_SCRIPTS,
  ].join(" "),

  "frame-ancestors 'none'",

  // Images
  [
    "img-src 'self' data:",
    ...GTM_IMAGES,
    ...GADS_IMAGES,
    ...CF_SCRIPTS,
    ...PAYSTACK_IMAGES,
  ].join(" "),

  // Styles / fonts
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",

  // XHR / fetch / WebSocket
  [
    "connect-src 'self'",
    ...GTM_CONNECT,
    ...GADS_CONNECT,
    ...CF_CONNECT,
    ...PAYSTACK_CONNECT,
  ].join(" "),
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Content-Security-Policy", value: ContentSecurityPolicy },
        ],
      },
    ];
  },
};

export default nextConfig;
