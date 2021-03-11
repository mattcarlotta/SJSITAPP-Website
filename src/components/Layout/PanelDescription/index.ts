import styled from "@emotion/styled";

const PanelDescription = styled.div<{ margin?: string }>`
  color: #888;
  margin: ${({ margin }) => margin || "5px 0 0 0"};
  font-size: 14px;
`;

export default PanelDescription;
