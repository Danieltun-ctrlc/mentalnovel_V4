/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Tells Next.js to generate static HTML
  images: {
    unoptimized: true, // Required for static export
  },
  // IMPORTANT: Replace 'repo-name' with your actual GitHub repository name
  // If your repo is named 'mental-health-story', this should be '/mental-health-story'
  basePath: "/mentalnovel",
  assetPrefix: "/mentalnovel/",
};

module.exports = nextConfig;
