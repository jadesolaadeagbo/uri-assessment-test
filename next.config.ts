const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/insights/uri', // Replace 'hashtag' with the default hashtag
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
