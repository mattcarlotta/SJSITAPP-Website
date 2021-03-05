import styled from "@emotion/styled";

const Tree = styled.aside<{ collapsed: boolean }>`
  @media (max-width: 1200px) {
    display: none;
  }

  overflow: ${({ collapsed }) => (collapsed ? "hidden" : "auto")};
  padding: ${({ collapsed }) => (collapsed ? "10px 0 0 0" : "10px 0 5px 20px")};
  width: ${({ collapsed }) => (collapsed ? "0px" : "266px")};
  white-space: nowrap;
  background: #0d6472;
  color: #efefef;
  box-shadow: ${({ collapsed }) =>
    !collapsed ? "2px 6px 3px 2px rgba(35, 207, 234, 0.15)" : "none"};
  transition: all 0.2s;
  min-height: 100vh;
  position: fixed;
  top: 56px;
  z-index: 3;
  transition: width 350ms ease, padding 350ms ease, overflow 350ms ease;
`;

export default Tree;
