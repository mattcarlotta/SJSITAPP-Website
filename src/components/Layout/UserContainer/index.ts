import styled from "@emotion/styled";

const UserContainer = styled.div<{ isDraggingOver?: boolean }>`
  height: 100%;
  min-height: 150px;
  transition: background-color 0.2s ease;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? "#ffebe6" : "#ebecf0"};
`;

export default UserContainer;
