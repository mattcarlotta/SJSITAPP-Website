import styled from "@emotion/styled";

const Tree = styled.aside<{ collapsed: boolean }>`
  @media (max-width: 1200px) {
    display: none;
  }

  overflow: ${({ collapsed }) => (collapsed ? "hidden" : "auto")};
  padding: ${({ collapsed }) => (collapsed ? "5px 0 0 0" : "5px 0 5px 20px")};
  width: ${({ collapsed }) => (collapsed ? "0px" : "266px")};
  white-space: nowrap;
  background: #fff;
  box-shadow: ${({ collapsed }) =>
    collapsed ? "none" : "2px 2px 0px 2px rgba(35, 207, 234, 0.15)"};
  transition: all 0.2s;
  min-height: 100vh;
  position: fixed;
  top: 60px;
  z-index: 3;
  transition: 350ms;
`;

export default Tree;
