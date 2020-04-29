import React from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components";

export const ThemeProvider = ({ children }) => <SCThemeProvider>{children}</SCThemeProvider>;

const theme = {};

export default theme;
