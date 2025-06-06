import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    reactStrictMode: process.env.NODE_ENV === 'development',
    productionBrowserSourceMaps: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.cometchat.io',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
