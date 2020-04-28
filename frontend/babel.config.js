module.exports = function config(api) {
  api.cache(true);

  return {
    presets: [["@babel/preset-env", { targets: { chrome: "72" } }], "@babel/preset-react", "@babel/preset-typescript"],
    plugins: [["babel-plugin-styled-components", { fileName: false }], ["@babel/plugin-proposal-class-properties"]],
  };
};
