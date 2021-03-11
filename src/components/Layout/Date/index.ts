import styled from "@emotion/styled";

const Date = styled.div<{ today?: boolean; fadeIn?: string }>`
  @media (max-width: 600px) {
    width: 100%;
  }

  height: 160px;
  width: 210px;
  margin: 4px;
  padding: 4px 8px;
  color: rgba(0, 0, 0, 0.65);
  background: #f3f3f3;
  text-align: left;
  border: 2px solid #e8e8e8;
  transition: background 0.3s;
  overflow-y: auto;
  animation: ${({ fadeIn }) =>
    `fade-in ${fadeIn || "1s"} 0s ease-in-out forwards`};
  ${({ today }) => today && "border-color: #1890ff;background: #e6f7ff;"};
`;

export default Date;
