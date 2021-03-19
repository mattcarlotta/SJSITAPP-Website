import styled from "@emotion/styled";

const Container = styled.div<{ height?: string }>`
  height: ${({ height }) => height || "90px"};
  width: 100%;
`;

export default Container;
