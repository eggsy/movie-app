/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "github.com", "secure.gravatar.com"],
  },
};

module.exports = nextConfig;
