const path = require("path");
const webpack = require("webpack");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

module.exports = function override(config, env) {
  // ───────────────────────────────────────────────────────────────────────────
  // 1) Ensure there's exactly one React in the bundle
  // ───────────────────────────────────────────────────────────────────────────
  // Remove the scope plugin only if you still need imports outside src/
  config.resolve.plugins = config.resolve.plugins.filter(
    (p) => p.constructor.name !== "ModuleScopePlugin"
  );

  // Force all React imports to come from our root node_modules
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    react: path.resolve(__dirname, "node_modules/react"),
    "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    "process/browser": require.resolve("process/browser.js"),
  };

  // ───────────────────────────────────────────────────────────────────────────
  // 2) Transpile only the problematic CosmJS crypto code
  // ───────────────────────────────────────────────────────────────────────────
  const oneOf = config.module.rules.find((r) => Array.isArray(r.oneOf)).oneOf;
  for (const rule of oneOf) {
    if (rule.loader && rule.loader.includes("babel-loader")) {
      rule.include = [
        path.resolve(__dirname, "src"),
        // Only transpile CosmJS crypto pbkdf2.js and related
        path.resolve(__dirname, "node_modules/@cosmjs/crypto/build/pbkdf2.js"),
      ];
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 3) Polyfill Node globals & expose env vars
  // ───────────────────────────────────────────────────────────────────────────
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.EnvironmentPlugin(["RPC_URL", "REST_URL"])
  );

  config.resolve.fallback = {
    buffer: require.resolve("buffer/"),
    crypto: require.resolve("crypto-browserify"),
    events: require.resolve("events/"),
    path: require.resolve("path-browserify"),
    stream: require.resolve("stream-browserify"),
    string_decoder: require.resolve("string_decoder/"),
  };

  return config;
};
