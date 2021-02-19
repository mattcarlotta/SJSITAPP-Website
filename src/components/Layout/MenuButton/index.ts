import styled from "@emotion/styled";

const MenuButton = styled.button<{ hoverable?: boolean }>`
  cursor: pointer;
  color: #025f6d;
  background-color: transparent;
  transition: color 0.2s ease-in-out, background 0.2s ease-in-out,
    border 0.2s ease-in-out;
  border-radius: 50px;
  border: 2px solid transparent;
  padding: 6px;

  :hover {
    color: #025f6d;
    background-color: ${({ hoverable }) =>
      hoverable ? "#d8d8d8" : "transparent"};
    border: 2px solid transparent;
  }

  :focus {
    outline: 0;
  }
`;

export default MenuButton;
