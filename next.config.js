module.exports = {
  basePath: '/intake',
  images: {
    domains: [
      'localhost',
      'divorcepath-production.s3.ca-central-1.amazonaws.com',
      'divorcepath-staging.s3.ca-central-1.amazonaws.com',
      'divorcepath-dev.s3.ca-central-1.amazonaws.com'
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};
