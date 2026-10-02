import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.avoroclothing.lk",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avoro-clothing.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avoro-clothing-dev.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
