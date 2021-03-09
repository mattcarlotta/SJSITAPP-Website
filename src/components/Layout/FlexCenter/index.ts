import styled from "@emotion/styled";

const FlexCenter = styled.div<{
  direction?: string;
  height?: string;
  justify?: string;
}>`
  color: ${({ color }) => color || "inherit"};
  height: ${({ height }) => height || "auto"};
  flex-direction: ${({ direction }) => direction || "row"};
  display: flex;
  align-items: center;
  width: 100%;
  ${({ justify }) => (justify ? `justify-content: ${justify}` : undefined)};
`;

export default FlexCenter;
