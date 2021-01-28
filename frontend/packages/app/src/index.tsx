import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "@aw-web-design/theme/src/theme-provider";
import { ThemeModeEnum } from "@aw-web-design/theme/src/enums/themeModeEnum";

import theme from "@/theme";

import App from "./containers/App";

const Root = () => (
  <ThemeProvider theme={theme} mode={ThemeModeEnum.LIGHT}>
    <App />
  </ThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
