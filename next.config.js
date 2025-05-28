/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
            },

            {
                protocol: "https",
                hostname: "m.media-amazon.com",
            },

            {
                protocol: "https",
                hostname: "ik.imagekit.io",
                port: '',
            }
        ]
    }
};

module.exports = nextConfig;