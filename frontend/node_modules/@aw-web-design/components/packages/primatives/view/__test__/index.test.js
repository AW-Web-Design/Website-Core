import React from "react";
import toJson from "enzyme-to-json";

import { shallowWithTheme } from "@/test-tools";

import View from "../View";

describe("<View />", () => {
  it("renders correctly", () => {
    const wrapper = shallowWithTheme(
      <View>
        content
      </View>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
