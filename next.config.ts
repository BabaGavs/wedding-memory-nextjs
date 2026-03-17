import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Configure for mobile access
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Allow all network interfaces
  hostname: '0.0.0.0',
  port: 3000,
};

export default nextConfig;
