import React from "react";
import { AppProps } from "next/app";

import { GlobalStyle } from "../styles/styled";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
);

export default MyApp;
