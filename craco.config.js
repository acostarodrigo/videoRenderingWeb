const webpack = require("webpack");
module.exports = {
  webpack: {
    configure: (config) => {
      // 1) Polyfill node core modules if you need them
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert"),
        buffer: require.resolve("buffer/"),
      };
      // 2) Provide global shims
      config.plugins.push(
        new webpack.ProvidePlugin({
          process: "process/browser",
          Buffer: ["buffer", "Buffer"],
        })
      );
      // 3) Force-decode.ts through Babel so it doesn’t emit raw `exports`
      config.module.rules.push({
        test: /decode\.ts$/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
      });
      return config;
    },
  },
};
