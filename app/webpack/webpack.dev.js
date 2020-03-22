const path = require("path");
const webpack = require("webpack");

const commonPaths = require("./paths");

module.exports = {
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.join(commonPaths.outputPath, "client"),
    chunkFilename: "[name].js"
  },
  devServer: {
    contentBase: path.join(commonPaths.outputPath, "client"),
    compress: true,
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
