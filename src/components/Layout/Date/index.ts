import styled from "@emotion/styled";

const Date = styled.div<{ today?: boolean }>`
  @media (max-width: 600px) {
    width: 100%;
  }

  height: 150px;
  width: 210px;
  margin: 4px;
  padding: 4px 8px;
  color: rgba(0, 0, 0, 0.65);
  background: #f3f3f3;
  text-align: left;
  border: 2px solid #e8e8e8;
  border-radius: 5px;
  transition: background 0.3s;
  overflow-y: auto;
  ${({ today }) => today && "border-color: #1890ff;background: #e6f7ff;"};
`;

export default Date;
