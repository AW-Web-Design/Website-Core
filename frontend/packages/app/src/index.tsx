import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "@orchard/theme/theme-provider";
import { ThemeModeEnum } from "@orchard/theme/enums/themeModeEnum";

import theme from "@/theme";

import App from "./containers/App";

const Root = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
