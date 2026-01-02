/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/JARVIS',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
