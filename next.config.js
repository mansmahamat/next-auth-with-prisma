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
      "q5fstuzu1uryvxr0.public.blob.vercel-storage.com",
    ],
  },
}

module.exports = nextConfig
