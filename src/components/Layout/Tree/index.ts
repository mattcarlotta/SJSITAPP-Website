import styled from "@emotion/styled";

const Tree = styled.aside<{ collapse: boolean }>`
  @media (max-width: 1200px) {
    display: none;
  }

  overflow: ${({ collapse }) => (collapse ? "hidden" : "auto")};
  padding: ${({ collapse }) => (collapse ? "5px 0 0 0" : "5px 0 5px 20px")};
  width: ${({ collapse }) => (collapse ? "0px" : "266px")};
  white-space: nowrap;
  background: #fff;
  box-shadow: ${({ collapse }) =>
    collapse ? "none" : "2px 2px 0px 2px rgba(35, 207, 234, 0.15)"};
  transition: all 0.2s;
  min-height: 100vh;
  position: fixed;
  top: 60px;
  z-index: 3;
  transition: 350ms;
`;

export default Tree;
