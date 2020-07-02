import React, { ElementType, ReactNode } from "react";

import StyledBox from "./styled";

interface BoxProps {
  // Shouldn't be manually passed
  className?: string;
  as?: ElementType;
  children: ReactNode;
}

const Box = ({ children, as = "div", className = "" }: BoxProps) => (
  <StyledBox as={as} className={className}>
    {children}
  </StyledBox>
);

export default Box;
