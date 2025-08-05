/** @type {import('next').NextConfig} */

// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   runtimeCaching,
// });

const nextConfig = {
  images: {
    remotePatterns: [new URL("https://cdn.weatherapi.com/weather/**")],
  },
};

export default nextConfig;
