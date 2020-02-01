import { resolve } from "path";
import webpack, { Configuration } from "webpack";
import { pathExists } from "fs-extra";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import globby from "globby";

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
    contentBase: [
      resolve(__dirname, "dist"),
      resolve(__dirname, "public"),
      resolve(__dirname, "../vendor/dist")
    ],
    compress: true,
    port: 9000,
    historyApiFallback: true,
    before: app => {
      const modules = globby
        .sync(["*"], {
          cwd: resolve("../"),
          onlyDirectories: true
        })
        .filter(moduleName => moduleName.startsWith("module-"));

      modules.forEach(moduleName => {
        app.get(new RegExp(`^/${moduleName}/.+`), async (req, res) => {
          const { path } = req;
          const sourcePath = resolve(
            __dirname,
            `../${path.replace(`/${moduleName}`, `/${moduleName}/dist`)}`
          );

          const isExists = await pathExists(sourcePath);

          if (isExists) {
            res.sendFile(sourcePath);
          } else {
            res.sendFile(resolve(__dirname, "public/index.html"));
          }
        });
      });
    }
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: resolve(__dirname, ".."),
      manifest: require("../vendor/dist/vendor-manifest.json")
    })
  ]
};

export default webpackConfig;
