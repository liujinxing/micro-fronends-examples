import { resolve } from "path";
import { Configuration } from "webpack";

const webpackConfig: Configuration = {
  mode: "development",

  entry: resolve(__dirname, "src/index.tsx"),

  output: {
    path: resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "/module-b/"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-ts-lib"],
            cacheDirectory: true
          }
        }
      }
    ]
  }
};

export default webpackConfig;
