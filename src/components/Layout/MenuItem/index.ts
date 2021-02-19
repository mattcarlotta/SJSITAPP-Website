/* istanbul ignore file */
import styled from "@emotion/styled";

const MenuItem = styled.div`
  display: flex;
  justify-content: flex-start;
  white-space: nowrap;
  user-select: none;
  transition: all 200ms ease-in-out;
  padding-left: 10px;

  :hover {
    background-color: #ddd;
  }
`;

export default MenuItem;
