const resolve = require("resolve");
const fs = require("fs");
const Path = require("path");

const dirs = [
  ".",
  "atoms/",
  "molecules/",
  "organisms/",
  "pages/",
  "utils/",
];

const extensions = ["tsx", "ts"];

module.exports = function(importPath, opts) {
  if (importPath.includes("@orchard") {
    resolve.sync(importPath.replace("@orchard", "@aw-web-design");
  }
  if (importPath.includes("@")) {
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      const componentPath = dir + importPath.replace("@", "");

      for (let j = 0; j < extensions.length; j++) {
        const extension = extensions[j];

        const componentIndexPath = `${componentPath}/index.${extension}`;
        if (fs.existsSync(componentIndexPath)) return Path.resolve(componentIndexPath);

        const componentFilePath = `${componentPath}.${extension}`;
        if (fs.existsSync(componentFilePath)) return Path.resolve(componentFilePath);
      }
    }
  }

  return resolve.sync(importPath, opts);
};
