import React, { ElementType, ReactNode } from "react";

import StyledBox from "./styled";

interface BoxProps {
  // Shouldn't be manually passed
  className?: string;
  as?: ElementType;
  children: ReactNode;
}

const Box = ({ children, ...rest }) => <StyledBox {...rest}>{children}</StyledBox>
