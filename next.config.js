const ContextReplacementPlugin = require("webpack").ContextReplacementPlugin;
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const open = require("opener");

const { analyze, CLIENT, INDEVELOPMENT } = process.env;

/* opens a browser window */
if (INDEVELOPMENT) setTimeout(() => open(CLIENT), 1000);

module.exports = {
  webpack(config, { isServer }) {
    /* adds custom plugins to client and server */
    config.plugins.push(
      ...[
        new ContextReplacementPlugin(/moment[\/\\]locale/, /\b\B/),
        analyze &&
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: isServer
              ? "../analyze/server.html"
              : "./analyze/client.html"
          })
      ].filter(Boolean)
    );

    /* return new config to next */
    return config;
  }
};
