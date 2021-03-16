import styled from "@emotion/styled";

const Main = styled.main<{ stretch?: boolean }>`
  @media (max-width: 1400px) {
    margin-left: 0;
  }

  padding: 26px 24px 24px;
  min-height: 280px;
  transition: 350ms;
  margin-top: 56px;
  margin-left: ${({ stretch }) => (stretch ? "0px" : "270px")};
`;

export default Main;
