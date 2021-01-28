import React from "react";
import { mount, shallow } from "enzyme";

import { ThemeProvider } from "@aw-web-design/theme/theme-provider";

import theme from "@/theme";

const removeProperties = () => {
  const keys = ["theme", "styledTheme"];

  return {
    test: (val) => {
      return (
        val &&
        typeof val === "object" &&
        "props" in val &&
        Object.keys(val.props).some((prop) => keys.some((key) => key === prop))
      );
    },
    print: (val, serialize) => {
      keys.forEach((key) => {
        delete val.props[key];
      });
      return serialize(val);
    },
  };
};

export const shallowWithTheme = (children) =>
  shallow(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
    .dive()
    .shallow();

export const mountWithTheme = (children) => {
  expect.addSnapshotSerializer(removeProperties());

  return mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};
