import styled from "@emotion/styled";

const FadeIn = styled.div<{ height?: string; timing?: string }>`
  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  animation: ${({ timing }) =>
    `fade-in ${timing || "1s"} 0s ease-in-out forwards`};
  ${({ height }) => height};
`;

export default FadeIn;
