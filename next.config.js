/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
    domains: [
      "images.unsplash.com", 
      "picsum.photos", 
      "cdn.example.com"
    ],
  },
};

module.exports = nextConfig;
