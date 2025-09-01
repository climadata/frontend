/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      { source: '/api/:path*', destination: 'http://api-gateway:3000/api/:path*' },
    ];
  },
};
export default nextConfig;
