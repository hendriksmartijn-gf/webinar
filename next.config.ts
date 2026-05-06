import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "og3kiehv6scpsqls.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
