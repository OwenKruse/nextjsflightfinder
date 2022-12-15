/** @type {import('next').NextConfig} */



const nextConfig = {

    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.duffel.com',
        },
      ],
    },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.duffel.com/:path*',
      },
    ]
  },
}

module.exports = nextConfig
