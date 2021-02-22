/* istanbul ignore file */
import styled from "@emotion/styled";

const Header = styled.header`
  @media (max-width: 1200px) {
    position: fixed;
    z-index: 2;
    width: 100%;
  }

  display: flex;
  height: 56px;
  background: #fff;
  box-shadow: 2px 2px 0px 2px rgba(35, 207, 234, 0.15);
  z-index: 2;
  padding-right: 30px;
  padding-left: 5px;
`;

export default Header;
