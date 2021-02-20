import styled from "@emotion/styled";

const Header = styled.main<{ stretch?: boolean }>`
  @media (max-width: 1200px) {
    margin-top: 56px;
    margin-left: 0;
  }

  flex: auto;
  min-height: 0;
  padding: 24px;
  min-height: 280px;
  transition: 350ms;
  margin-left: ${({ stretch }) => (stretch ? "0px" : "280px")};
`;

export default Header;
