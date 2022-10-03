/** @type {import('next').NextConfig} */

const nextConfig = {
  publicRuntimeConfig: {
    backendUrl: process.env.BACKEND_URL,
    frontendUrl: process.env.FRONTEND_URL,
  },
  // reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
