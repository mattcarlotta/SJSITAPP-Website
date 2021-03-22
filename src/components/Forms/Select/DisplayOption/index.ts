import styled from "@emotion/styled";

const DisplayOption = styled.div<{ value?: string; icon?: string }>`
  color: ${({ value }) => (value ? "#282c34;" : "#ccc")};
  padding: ${({ icon }) => (icon ? "8px 0 8px 48px" : "8px 8px 8px 14px")};
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
`;

export default DisplayOption;
