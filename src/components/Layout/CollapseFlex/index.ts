/* istanbul ignore file */
import styled from "@emotion/styled";
import FlexEnd from "~components/Layout/FlexEnd";
import Button from "~components/Layout/Button";
import FlexStart from "~components/Layout/FlexStart";
import Link from "~components/Navigation/Link";

const CollapseFlex = styled.div`
  @media (max-width: 768px) {
    display: block;
    ${FlexStart} {
      display: block;
      width: 100%;
    }
    ${FlexEnd} {
      display: block;
      width: 100%;
    }
    ${Button} {
      width: 100%;
      margin: 10px auto;
    }
    ${Link} {
      display: block;
      max-width: 250px;
      margin: 10px auto;
    }
  }

  display: flex;
  align-items: center;
  margin: 20px;
`;

export default CollapseFlex;
