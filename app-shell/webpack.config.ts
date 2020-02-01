import { resolve } from "path";
import { Configuration } from "webpack";
import { pathExists } from "fs-extra";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const webpackConfig: Configuration & {
  devServer: any;
} = {
  mode: "development",

  entry: resolve(__dirname, "src/index.tsx"),

  output: {
    path: resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "/"
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

  devServer: {
    contentBase: [resolve(__dirname, "dist"), resolve(__dirname, "public")],
    compress: true,
    port: 9000,
    historyApiFallback: true,
    setup: app => {
      app.get(/^\/module-b\/.+/, async (req, res) => {
        const { path } = req;
        const sourcePath = resolve(
          __dirname,
          `../${path.replace("/module-b", "/module-b/dist")}`
        );

        const isExists = await pathExists(sourcePath);

        if (isExists) {
          res.sendFile(sourcePath);
        } else {
          res.sendFile(resolve(__dirname, "public/index.html"));
        }
      });
      app.get(/^\/module-a\/.+/, async (req, res) => {
        const { path } = req;
        const sourcePath = resolve(
          __dirname,
          `../${path.replace("/module-a", "/module-a/dist")}`
        );

        const isExists = await pathExists(sourcePath);

        if (isExists) {
          res.sendFile(sourcePath);
        } else {
          res.sendFile(resolve(__dirname, "public/index.html"));
        }
      });
    }
  }
};

export default webpackConfig;
