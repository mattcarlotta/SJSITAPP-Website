/* istanbul ignore file */
import styled from "@emotion/styled";

const CardBody = styled.div<{ padding?: string }>`
  min-height: 300px;
  padding: ${({ padding }) => padding || "24px"};

  .MuiTabs-root {
    min-height: 34px;
  }
`;

export default CardBody;
