import styled from "@emotion/styled";

const Column = styled.div<{ width?: string }>`
  @media (max-width: 1425px) {
    width: 100%;
  }

  width: ${({ width }) => width || "100%"};
  min-width: 225px;
  background-color: #ebecf0;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  white-space: normal;
  padding: 8px;
  margin: 5px;
`;

export default Column;
