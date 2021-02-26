import styled from "@emotion/styled";

const Section = styled.section<{ direction?: string; hideOverflowX?: boolean }>`
  flex-direction: ${({ direction }) => direction || "row"};
  height: 100%;
  display: flex;
  flex: auto;
  min-height: 0;
  background: #ebebeb;
  ${({ hideOverflowX }) => hideOverflowX && "overflow-x: hidden"};
`;

export default Section;
