import styled from "@emotion/styled";

const FixedMenu = styled.aside<{
  collapsed?: boolean;
}>`
  position: fixed;
  top: 52px;
  z-index: 3;
  white-space: nowrap;
  min-height: 100vh;
  height: 100vh;
  overflow-y: auto;
  transition: all 0.2s;
  transition: width 350ms ease, padding 350ms ease, overflow 350ms ease;
  overflow: ${({ collapsed }) => (collapsed ? "hidden" : "auto")};
  padding: ${({ collapsed }) => (collapsed ? "5px 0 0 0" : "5px 0 5px 0")};
  width: ${({ collapsed }) => (collapsed ? "0px" : "266px")};
  box-shadow: ${({ collapsed }) =>
    !collapsed ? "2px 6px 3px 2px rgba(35, 207, 234, 0.15)" : "none"};
`;

export default FixedMenu;
