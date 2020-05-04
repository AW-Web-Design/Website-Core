const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Path = require("path");
const AliasPlugin = require("enhanced-resolve/lib/AliasPlugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");

const webpackDevConfig = (ROOT_DIR, SRC_DIR, DIST_DIR) => ({
  mode: "development",

  context: Path.resolve(__dirname, "..", "..", ".."),

  devtool: "cheap-module-eval-source-map",

  module: {
    rules: [
      {
        test: /\.(j|t)s(x)?$/,
        exclude: /^\/node_modules\/((?!@orchard).)*$/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          rootMode: "upward",
        },
      },
      {
        test: /(stories|story)\.[tj]sx?$/,
        loader: require.resolve("@storybook/source-loader"),
        include: [Path.resolve(__dirname, "..", "..")],
        enforce: "pre",
        options: {
          injectParameters: true,
          inspectLocalDependencies: false,
          inspectDependencies: false,
        },
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: "svg-react-loader",
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules/,
        loader: "file-loader",
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        loader: "url-loader",
      },
      {
        test: /\.md$/,
        exclude: /node_modules/,
        loader: "raw-loader",
      },
      {
        test: /\.mdx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-transform-react-jsx"],
            },
          },
          {
            loader: "@mdx-js/loader",
            options: {
              compilers: [createCompiler({})],
            },
          },
        ],
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
        },
        {
          name: "@orchard",
          alias: [
            Path.resolve(process.cwd(), "node_modules", "@aw-web-design")
          ]
        }
      ], "resolve")
    ]
  },

  plugins: [
    new CopyWebpackPlugin([{ from: Path.resolve(ROOT_DIR, "public"), to: "public" }]),
    new Webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: `${ROOT_DIR}/index.html`, favicon: `${SRC_DIR}/unknown[1].png` }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: false,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],

  devServer: {
    contentBase: DIST_DIR,
    port: 8080,
    hotOnly: true,
    historyApiFallback: true,
  },
});

module.exports = webpackDevConfig;
