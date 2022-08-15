/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");

const nextConfig = {
  optimizeFonts: false,
  reactStrictMode: false,
  images: {
    domains: ["s3.sa-east-1.amazonaws.com"],
    dangerouslyAllowSVG: true,
  },
};

const withImages = require("next-images");

module.exports = withPlugins([[withImages({ esModule: true })]], nextConfig);
