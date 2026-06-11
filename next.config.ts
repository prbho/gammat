import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV !== "production";

const ContentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${
    isDevelopment ? " 'unsafe-eval'" : ""
  }`,
  "object-src 'none'",
  "base-uri 'self'",
  "frame-src 'none' https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
