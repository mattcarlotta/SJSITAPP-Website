import styled from "@emotion/styled";

const Word = styled.div<{
  breakpoint?: boolean;
  bottom?: string;
  display?: string;
  left?: string;
  right?: string;
  top?: string;
}>`
  ${({ breakpoint }) =>
    breakpoint &&
    `@media (max-width: 500px) {
      display: block;
    }
  `};

  display: ${({ display }) => display || "inline-block"};
  margin-top: ${({ top }) => top || "0px"};
  margin-bottom: ${({ bottom }) => bottom || "0px"};
  margin-right: ${({ right }) => right || "0px"};
  margin-left: ${({ left }) => left || "0px"};
  word-wrap: break-word;
`;

export default Word;
