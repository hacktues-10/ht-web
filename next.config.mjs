import { env } from "./app/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: env.HOSTNAME,
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/timetable",
        destination: "/schedule",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
