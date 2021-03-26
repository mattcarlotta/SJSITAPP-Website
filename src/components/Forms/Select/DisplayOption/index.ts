import styled from "@emotion/styled";

const DisplayOption = styled.div<{
  padding?: string;
  value?: string;
  icon?: string;
  justifyContent?: string;
}>`
  color: ${({ value }) => (value ? "#282c34;" : "#ccc")};
  padding: ${({ padding, icon }) => {
    if (padding) return padding;
    if (icon) return "8px 0 8px 48px";
    return "8px 8px 8px 14px";
  }};
  justify-content: ${({ justifyContent }) => justifyContent};
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  position: relative;
  box-sizing: border-box;
  white-space: nowrap;
  flex: 1 0 0%;
  overflow: hidden;
  outline: 0;
`;

export default DisplayOption;
