import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow <Image quality={...}> values used in the app (default is 75; hero uses 85)
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
