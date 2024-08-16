/** @type {import('next').NextConfig} */
const nextConfig = {
	publicRuntimeConfig: {
		lastModifiedYear: new Date().getFullYear(),
	},
	experimental: {
		optimizePackageImports: ['@mantine/core', '@mantine/form', '@mantine/hooks', '@mantine/notifications'],
	},
};

module.exports = nextConfig;
