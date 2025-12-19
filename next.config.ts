import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // You can remove "output: export" to use Vercel's image optimization
  // or keep it if you still want a purely static site.
  // Generally, removing it is better for Vercel.

  images: {
    unoptimized: true, // You can keep this or set to false if you remove output: export
  },
};

export default nextConfig;
