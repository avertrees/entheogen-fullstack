/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
    ignoreDuringBuilds: true,
  },
  api: {
    bodyParser: false,
  },
}

export default nextConfig
