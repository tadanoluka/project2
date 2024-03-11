/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/main',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/admin/panel',
        permanent: true,
      },
      {
        source: '/admin/posts',
        destination: '/admin/posts/panel',
        permanent: true,
      },
      {
        source: '/admin/files',
        destination: '/admin/files/panel',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
