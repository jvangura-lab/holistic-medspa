import type { NextConfig } from "next";

/**
 * holistic-v6 site-figma — Next.js 16 config
 * Security headers + image optimization per studio/templates/stack-conventions.md
 * CSP allowlists Fontshare (Clash Display Variable) and Vercel Analytics.
 */

const SECURITY_CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' https://api.fontshare.com https://cdn.fontshare.com data:",
  "style-src 'self' 'unsafe-inline' https://api.fontshare.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "api.fontshare.com" },
      { protocol: "https", hostname: "cdn.fontshare.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: SECURITY_CSP },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
