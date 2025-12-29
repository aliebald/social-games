/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    lastModifiedYear: new Date().getFullYear(),
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

module.exports = nextConfig;
