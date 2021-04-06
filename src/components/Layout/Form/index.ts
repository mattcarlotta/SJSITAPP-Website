/* istanbul ignore file */
import styled from "@emotion/styled";

const Form = styled.form<{ maxWidth?: string; margin?: string }>`
  margin: ${({ margin }) => margin || "0 auto"};
  max-width: ${({ maxWidth }) => maxWidth || "500px"};
`;

export default Form;
