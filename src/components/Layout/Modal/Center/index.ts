/* istanbul ignore file */
import styled from "@emotion/styled";

const Center = styled.div<{ maxWidth?: string }>`
  max-width: ${({ maxWidth }) => maxWidth || "425px"};
  width: 100%;
  margin: 0 auto;
`;

export default Center;
