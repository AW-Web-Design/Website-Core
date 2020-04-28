const path = require("path");
const merge = require("webpack-merge");
const { webpackDevConfig } = require("../../../utils/webpack-config");

const ROOT_DIR = path.resolve(__dirname, "..");
const SRC_DIR = path.resolve(ROOT_DIR, "src");
const DIST_DIR = path.resolve(ROOT_DIR, "dist");

module.exports = merge(webpackDevConfig(ROOT_DIR, SRC_DIR, DIST_DIR), {
  entry: path.join(SRC_DIR, "index.tsx"),
  output: {
    path: DIST_DIR,
    filename: "bundle.js",
    publicPath: "/",
  },
});
