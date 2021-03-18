/* istanbul ignore file */
import styled from "@emotion/styled";

const OptionsContainer = styled.div`
  top: 100%;
  background-color: hsl(0, 0%, 100%);
  border-radius: 4px;
  box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1);
  position: absolute;
  width: 100%;
  z-index: 1;
  max-height: 200px;
  overflow-y: auto;
`;

export default OptionsContainer;
