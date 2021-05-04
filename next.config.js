module.exports = {
  // Uncomment this to allow eslint on build
  // experimental: {
  //   eslint: true,
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    return config;
  },
};
