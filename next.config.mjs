import "./app/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-8e2ea353913b4ca5be175d242c8f6789.r2.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
