/** @type {import('next').NextConfig} */
const nextConfig = {
  // Self-contained server bundle for the Docker/Dokploy deploy.
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // Strapi-hosted media in production
      { protocol: "https", hostname: "cms.cleanenergyfund.ng" },
      { protocol: "http", hostname: "cms.cleanenergyfund.ng" },
      // Strapi-hosted media during local development
      { protocol: "http", hostname: "localhost" },
    ],
  },
};

export default nextConfig;
