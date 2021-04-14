import styled from "@emotion/styled";

const NavTitle = styled.span<{ select?: string }>`
  font-size: 17px;
  user-select: ${({ select }) => select};
`;

export default NavTitle;
