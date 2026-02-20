/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    LAST_MODIFIED_YEAR: new Date().getFullYear().toString(),
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

module.exports = nextConfig;
