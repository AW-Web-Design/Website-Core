import React from "react";
import ReactDOM from "react-dom";

import theme, { ThemeProvider } from "@/theme";

import App from "./containers/App";

const Root = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
