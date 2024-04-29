/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
  env: {
    YANDEX_API: "801af6f1-1ee4-4bf8-b47a-0718a19c7655",
  },
};

export default nextConfig;
