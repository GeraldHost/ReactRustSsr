const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const commonPaths = require("./paths");

module.exports = {
  mode: "production",
  output: {
    filename: `[name].[hash].js`,
    path: path.join(commonPaths.outputPath, "client"),
    chunkFilename: `[name].[chunkhash].js`
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: true
      }),
    ],
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "initial"
        },
        async: {
          test: /[\\/]node_modules[\\/]/,
          name: "async",
          chunks: "async",
          minChunks: 4
        }
      }
    },
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true
  },

  module: {
    rules: []
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  devtool: "source-map"
};
