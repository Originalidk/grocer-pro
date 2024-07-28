/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'media.nedigital.sg',
            'img.rtacdn-os.com',
        ],
    },
    env: {
        NEXT_BACKEND_URL: process.env.NEXT_BACKEND_URL,
    },
};

export default nextConfig;
