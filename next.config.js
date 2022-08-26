/** @type {import('next').NextConfig} */

const nextConfig = {
  publicRuntimeConfig: {
    backendUrl: process.env.BACKEND_URL,
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
