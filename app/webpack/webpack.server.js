const path = require("path");
const nodeExternals = require("webpack-node-externals");
const commonPaths = require("./paths");

module.exports = {
  entry: "./src/server.js",

  target: "node",

  externals: [nodeExternals()],

  output: {
    path: commonPaths.outputPath,
    filename: "server.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ],
  },
};
