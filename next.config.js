const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false
});

module.exports = withBundleAnalyzer({
  experimental: {
    modern: true
  },
  webpack(config, options) {
    if (options.isServer) {
      config.externals = ['react', 'react-dom', ...config.externals];
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      react$: 'preact/compat',
      'react-dom$': 'preact/compat',
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    };

    return config;
  }
});
