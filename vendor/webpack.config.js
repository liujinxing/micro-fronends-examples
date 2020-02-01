const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js", ".jsx"]
  },
  entry: {
    vendor: [
      "react",
      "react-dom",
      "react-router-dom",
      "history",
      path.resolve(__dirname, "../commons/src/index.ts")
    ]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-ts-lib"],
            cacheDirectory: true
          }
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    library: "[name]_[hash]"
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      context: path.join(__dirname, ".."),
      path: path.join(__dirname, "dist", "[name]-manifest.json"),
      name: "[name]_[hash]"
    })
  ]
};
