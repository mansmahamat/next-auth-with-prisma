/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  images: {
    domains: [
      "images.pexels.com",
      "images.unsplash.com",
      "res.cloudinary.com",
      "www.pexels.com",
    ],
  },
}

module.exports = nextConfig
