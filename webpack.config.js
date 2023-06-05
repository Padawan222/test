const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: {
    main: path.join(__dirname, "src/index.js"),
    catalan: path.join(__dirname, "src/catalan/catalan.js"),
    english: path.join(__dirname, "src/english/english.js"),
    spanish: path.join(__dirname, "src/spanish/spanish.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["main"],
      hash: true,
    }),
    new HtmlWebpackPlugin({
      filename: "catalan.html",
      template: "./src/catalan/catalan.html",
      chunks: ["catalan"],
      hash: true,
    }),
    new HtmlWebpackPlugin({
      filename: "english.html",
      template: "./src/english/english.html",
      chunks: ["english"],
      hash: true,
    }),
    new HtmlWebpackPlugin({
      filename: "spanish.html",
      template: "./src/spanish/spanish.html",
      chunks: ["spanish"],
      hash: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets/images/*",
          to: "assets/images/[name][ext]",
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  stats: "maximal",
  devtool: "source-map",
  mode: "development",
  devServer: {
    open: true,
    static: path.resolve(__dirname, "./dist"),
    watchFiles: ["./src/**"],
    port: 4001,
    hot: true,
  },
};
