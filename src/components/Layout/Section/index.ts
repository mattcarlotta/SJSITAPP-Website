import styled from "@emotion/styled";

const Section = styled.section<{ direction?: string; hideOverflowX?: boolean }>`
  flex-direction: ${({ direction }) => direction || "row"};
  min-height: 100vh;
  display: flex;
  background: #ebebeb;
`;

export default Section;
