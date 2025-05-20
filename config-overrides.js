require("dotenv").config();
const webpack = require("webpack");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const path = require("path");

module.exports = function override(config, env) {
  // ────────────────────────────────────────────────────────────────
  // 1) Remove ModuleScopePlugin so imports outside src/ are allowed
  // ────────────────────────────────────────────────────────────────
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => plugin.constructor.name !== "ModuleScopePlugin"
  );

  // ────────────────────────────────────────────────────────────────
  // 2) Tell webpack to also look in your nested cosmosClient/node_modules
  // ────────────────────────────────────────────────────────────────
  config.resolve.modules = [
    path.resolve(__dirname, "src"),
    path.resolve(__dirname, "src/cosmosClient/node_modules"),
    "node_modules",
  ];

  // ────────────────────────────────────────────────────────────────
  // 3) Transpile rogue CJS (e.g. decode.ts) into proper ESM
  // ────────────────────────────────────────────────────────────────
  config.module.rules.push({
    test: /decode\.ts$/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [["@babel/preset-env", { targets: "defaults" }]],
      },
    },
  });

  // ────────────────────────────────────────────────────────────────
  // 4) Polyfill Node globals & expose your env vars
  // ────────────────────────────────────────────────────────────────
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.EnvironmentPlugin(["RPC_URL", "REST_URL"])
  );

  // ────────────────────────────────────────────────────────────────
  // 5) Browser‐friendly fallbacks for Node core modules
  // ────────────────────────────────────────────────────────────────
  config.resolve.fallback = {
    buffer: require.resolve("buffer/"),
    crypto: require.resolve("crypto-browserify"),
    events: require.resolve("events/"),
    path: require.resolve("path-browserify"),
    stream: require.resolve("stream-browserify"),
    string_decoder: require.resolve("string_decoder/"),
  };

  // ────────────────────────────────────────────────────────────────
  // 6) Alias process/browser → process/browser.js for strict ESM
  // ────────────────────────────────────────────────────────────────
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    "process/browser": require.resolve("process/browser.js"),
  };

  return config;
};
