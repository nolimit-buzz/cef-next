/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // Strapi-hosted media during local development
      { protocol: "http", hostname: "localhost" },
    ],
  },
};

export default nextConfig;
