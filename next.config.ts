import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  // next.js config
});

export default nextConfig;
