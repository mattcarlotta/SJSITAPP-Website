import styled from "@emotion/styled";

const Title = styled.h1<{
  centered?: boolean;
  color?: string;
  fontSize?: string;
  margin?: string;
}>`
  font-size: ${({ fontSize }) => fontSize || "24px"};
  color: ${({ color }) => color || "#282c34"};
  margin: ${({ margin }) => margin || "15px 0"};
  letter-spacing: 1px;
  ${({ centered }) => centered && "text-align: center"};
`;

export default Title;
