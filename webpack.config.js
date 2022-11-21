const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevMode = process.env.NODE_ENV === "development";
const isProdMode = !isDevMode;
console.log(`IS DEV: ${isDevMode}`);

const resolvedPathFromRoot = (pathName) => path.resolve(__dirname, pathName);
const resolvedPathFromSrc = (pathName) =>
  resolvedPathFromRoot(`src/${pathName}`);

module.exports = {
  context: resolvedPathFromRoot("src"),
  entry: {
    app: "./index.ts",
  },
  output: {
    path: resolvedPathFromRoot("dist"),
    filename: isDevMode ? "[name].js" : "[name].[contenthash].js",
  },
  devServer: { port: 4200, hot: isDevMode, historyApiFallback: true },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      src: resolvedPathFromRoot("src"),
      api: resolvedPathFromSrc("api"),
      assets: resolvedPathFromSrc("assets"),
      components: resolvedPathFromSrc("components"),
      core: resolvedPathFromSrc("core"),
      hocs: resolvedPathFromSrc("hocs"),
      pages: resolvedPathFromSrc("pages"),
      services: resolvedPathFromSrc("services"),
      styles: resolvedPathFromSrc("styles"),
      utils: resolvedPathFromSrc("utils"),
      handlebars: resolvedPathFromRoot(
        "node_modules/handlebars/dist/handlebars.js"
      ),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: { collapseWhitespace: isProdMode },
    }),
    new CircularDependencyPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "assets/favicon.ico",
          to: "favicon.ico",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: isDevMode ? "[name].css" : "[name].[contenthash].css",
    }),
  ],
};
