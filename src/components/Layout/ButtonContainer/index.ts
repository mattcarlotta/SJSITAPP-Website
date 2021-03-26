import styled from "@emotion/styled";

const ButtonContainer = styled.div<{
  maxWidth: string;
}>`
  max-width: ${({ maxWidth }) => maxWidth};
  border-radius: 50px;
  margin-top: 10px;
  background: transparent;
  margin: 0 auto;
`;

export default ButtonContainer;
