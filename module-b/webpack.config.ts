import { resolve } from "path";
import webpack, { Configuration } from "webpack";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const webpackConfig: Configuration = {
  mode: "development",

  entry: resolve(__dirname, "src/index.tsx"),

  output: {
    path: resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "/module-b/"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js"],
    plugins: [new TsconfigPathsPlugin()]
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

  plugins: [
    new webpack.DllReferencePlugin({
      context: resolve(__dirname, ".."),
      manifest: require("../vendor/dist/vendor-manifest.json")
    })
  ]
};

export default webpackConfig;
