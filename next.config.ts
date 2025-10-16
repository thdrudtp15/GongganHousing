const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        formats: ['image/avif', 'image/webp'],
        hostname: 'res.cloudinary.com',
        pathname: '/dtodrrwy8/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // 서버액션 바디 사이즈 리밋 설정.
    },
  },
};

export default nextConfig;
