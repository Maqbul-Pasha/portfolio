const withImages = require('next-images');

module.exports = withImages({
  images: {
    domains: [process.env.BACKEND_HOST || ''], // Default to an empty string if BACKEND_HOST is not defined
  },
  async rewrites() {
    return [
      {
        source: '/about',
        destination: `${process.env.BACKEND_URL}/about/`,
      },
      {
        source: '/projects',
        destination: `${process.env.BACKEND_URL}/projects/`,
      },
      {
        source: '/technologies',
        destination: `${process.env.BACKEND_URL}/technologies/`,
      },
      {
        source: '/contact',
        destination: `${process.env.BACKEND_URL}/contact/`,
      },
      {
        source: '/weather',
        destination: `${process.env.BACKEND_URL}/weather/`,
      },
    ];
  },
});
