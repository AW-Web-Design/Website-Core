const Webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Path = require("path");
const AliasPlugin = require("enhanced-resolve/lib/AliasPlugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

const webpackProdConfig = (ROOT_DIR, SRC_DIR) => ({
  mode: "production",

  context: Path.resolve(__dirname, "..", "..", ".."),

  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          rootMode: "upward",
        },
      },
      {
        test: /\.ts(x?)$/,
        exclude: /^\/node_modules\/((?!@orchard).)*$/,
        use: [
          {
            loader: "ts-loader",
            options: { allowTsInNodeModules: true }
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: true,
              localIdentName: "[app]__[local]--[hash:base64:5]",
            },
          },
          {
            loader: "sass-loader",
            options: {
              outputStyle: "expanded",
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: "svg-react-loader",
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
      },
      {
        test: /\.md$/,
        loader: "raw-loader",
      },
    ],
  },

  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
    ],
    plugins: [
      new AliasPlugin('described-resolve', [
        {
          name: "@",
          alias: [
            Path.resolve(__dirname, "..", ".."),
            Path.resolve(__dirname, "..", "..", "atoms"),
            Path.resolve(__dirname, "..", "..", "molecules"),
            Path.resolve(__dirname, "..", "..", "organisms"),
            Path.resolve(__dirname, "..", "..", "pages"),
            Path.resolve(__dirname, "..", "..", "utils"),
          ]
        }
      ], "resolve")
    ]
  },

  plugins: [
    new CopyWebpackPlugin([{ from: Path.resolve(ROOT_DIR, "public", "fonts"), to: "fonts" }]),
    new HtmlWebpackPlugin({ template: `${ROOT_DIR}/index.html`, favicon: `${ROOT_DIR}/favicon.ico` }),
    new MiniCssExtractPlugin({ filename: "bundle.[contenthash].css" }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: false,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
  ],

  stats: { children: false },
});

module.exports = webpackProdConfig;
