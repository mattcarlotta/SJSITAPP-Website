/* istanbul ignore file */
import styled from "@emotion/styled";

const StickyMenu = styled.aside<{
  collapsed?: boolean;
}>`
  position: sticky;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  flex: 0 0 ${({ collapsed }) => (collapsed ? "0px" : "266px")};
  height: calc(100vh - 56px);
  overflow: hidden;
  top: 56px;
  z-index: 3;
  white-space: nowrap;
  overflow-y: auto;
  transition: all 0.2s;
  transition: flex 350ms ease, padding 350ms ease, width 350ms ease;
  width: ${({ collapsed }) => (collapsed ? "0px" : "266px")};
  box-shadow: ${({ collapsed }) =>
    !collapsed ? "2px 6px 3px 2px rgba(35, 207, 234, 0.15)" : "none"};
`;

export default StickyMenu;
