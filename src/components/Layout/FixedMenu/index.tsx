import styled from "@emotion/styled";

const FixedMenu = styled.aside<{
  collapsed?: boolean;
}>`
  position: fixed;
  top: 56px;
  z-index: 3;
  white-space: nowrap;
  height: 100vh;
  overflow-y: auto;
  transition: all 0.2s;
  transition: width 300ms ease, padding 300ms ease, overflow 300ms ease;
  width: ${({ collapsed }) => (collapsed ? "0px" : "266px")};
  box-shadow: ${({ collapsed }) =>
    !collapsed ? "2px 6px 3px 2px rgba(35, 207, 234, 0.15)" : "none"};
`;

export default FixedMenu;
