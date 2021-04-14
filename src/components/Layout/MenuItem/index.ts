import styled from "@emotion/styled";

const MenuItem = styled.div<{ justify?: string; padding?: string }>`
  display: flex;
  justify-content: ${({ justify }) => justify || "flex-start"};
  white-space: nowrap;
  user-select: none;
  transition: all 200ms ease-in-out;
  padding: ${({ padding }) => padding || "0 0 0 10px"};

  :hover {
    background-color: #ddd;
  }
`;

export default MenuItem;
