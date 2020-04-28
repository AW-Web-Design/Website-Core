const CSSLoaderIdent = require("css-loader/lib/getLocalIdent");
const path = require("path");

/**
 * Custom ident function to add app / component folder to classnames
 *
 * For pages within 'packages/containers' the app name will be used. For
 * all other cases the folder name will suffice.
 */
const getLocalIdent = (loaderContext, localIdentName, localName, options) => {
  const parsed = loaderContext.resourcePath.split(path.sep);

  const packages = ["atoms", "molecules", "organisms", "pages"];
  let app = "[folder]";

  if (parsed.length > 3 && parsed[parsed.length - 2] === "src") {
    packages.forEach(pkg => {
      const index = parsed.indexOf(pkg);

      if (index !== -1) {
        app = parsed[index + 1];
      }
    });
  }

  return CSSLoaderIdent(loaderContext, localIdentName.replace(/\[app\]/gi, app), localName, options);
};

module.exports = {
  getLocalIdent,
};
