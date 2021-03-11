import styled from "@emotion/styled";

const FadeIn = styled.div<{ height?: string; timing?: string }>`
  animation: ${({ timing }) =>
    `fade-in ${timing || "1s"} 0s ease-in-out forwards`};
  ${({ height }) => height};
`;

export default FadeIn;
