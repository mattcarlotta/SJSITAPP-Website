/* istanbul ignore file */
import styled from "@emotion/styled";

const MainLayout = styled.main`
  display: flex;
  flex-flow: row nowrap;
  direction: row;
  max-width: 100vw;

  :after {
    clear: both;
    content: "";
    display: table;
  }
`;

export default MainLayout;
