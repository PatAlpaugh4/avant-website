import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    async redirects() {
        return [
            { source: '/industries', destination: '/services', permanent: true },
            { source: '/audit', destination: '/services', permanent: true },
            { source: '/marketplace', destination: '/services', permanent: true },
            { source: '/skills', destination: '/services', permanent: true },
            { source: '/skills/:slug*', destination: '/services', permanent: true },
            { source: '/case-studies/professional-services-client-intake', destination: '/case-studies/vc-meeting-prep', permanent: true },
        ];
    },
};

export default nextConfig;
