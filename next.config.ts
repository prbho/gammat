import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV !== "production";

const ContentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://googleads.g.doubleclick.net https://static.cloudflareinsights.com${
    isDevelopment ? " 'unsafe-eval'" : ""
  }`,
  "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://googleads.g.doubleclick.net https://static.cloudflareinsights.com",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-src 'none' https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.google.com https://www.google.com.ng https://ad.doubleclick.net https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.google.com https://www.google.com.ng https://ad.doubleclick.net https://www.googleadservices.com https://static.cloudflareinsights.com",
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
