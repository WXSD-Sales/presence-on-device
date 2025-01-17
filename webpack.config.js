const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");


const webpack = require("webpack");
const smp = new SpeedMeasurePlugin();
const Dotenv = require('dotenv-webpack');

module.exports = smp.wrap({
  entry: {
    app: ["./src/index.tsx", path.resolve(__dirname, './src/styles/index.scss')]
  },
  target: "web",
  stats: 'errors-only',
  output: {
    path: path.resolve(__dirname, "./docs"),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".png"],
    fallback: {
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      util: require.resolve("util"),
      os: require.resolve("os-browserify/browser"),
      fs: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader',
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader',
      },
      // { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader' },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader" },

      { test: /\.ico$/, loader: 'file-loader' },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, './docs'),
    publicPath: '/',

  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new HtmlWebpackPlugin({
      path: path.resolve(__dirname, "./docs"),
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new webpack.ProvidePlugin({
      process: path.resolve(path.join(__dirname, "node_modules/process/browser")),
    }),
  ],
});
