import styled from "@emotion/styled";

const Title = styled.h1<{ centered?: boolean; fontSize?: string }>`
  font-size: ${({ fontSize }) => fontSize || "24px"};
  color: #282c34;
  margin: 15px 0;
  letter-spacing: 1px;
  ${({ centered }) => centered && "text-align: center"};
`;

export default Title;
