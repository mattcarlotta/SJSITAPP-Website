/* istanbul ignore file */
import styled from "@emotion/styled";

const FlexCenter = styled.div<{
  direction?: string;
}>`
  flex-direction: ${({ direction }) => direction || "row"};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default FlexCenter;
