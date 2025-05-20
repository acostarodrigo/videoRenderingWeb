require("dotenv").config();
const webpack = require("webpack");

module.exports = function override(config, env) {
  // 1) Provide global shims for process and Buffer
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.EnvironmentPlugin(["RPC_URL", "REST_URL"])
  );

  // 2) Resolve fallbacks (turn off Node polyfills you don't need)
  config.resolve.fallback = {
    ...config.resolve.fallback,
    buffer: false,
    crypto: false,
    events: false,
    path: false,
    stream: false,
    string_decoder: false,
  };

  // 3) Transpile any CommonJS modules (e.g. decode.ts) into browser-safe ESM
  config.module.rules.push({
    test: /decode\.ts$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [["@babel/preset-env", { targets: "defaults" }]],
      },
    },
  });

  return config;
};
