import styled from "styled-components";
import { compose, layout, space, color } from "styled-system";

const StyledBox = styled.div`
  display: block;
  box-sizing: border-box;
  ${compose(
    layout,
    space,
    color,
  )}
`;

export default StyledBox;
