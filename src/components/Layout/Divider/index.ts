import styled from "@emotion/styled";

const Divider = styled.hr<{ margin?: string }>`
  margin: ${({ margin }) => margin || 0};
  opacity: 0.2;
`;

export default Divider;
