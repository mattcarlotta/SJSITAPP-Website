/* istanbul ignore file */
import styled from "@emotion/styled";

const CardBody = styled.div<{ padding?: string }>`
  min-height: 315px;
  padding: ${({ padding }) => padding || "24px"};

  .MuiTabs-root {
    min-height: 40px;
  }
`;

export default CardBody;
