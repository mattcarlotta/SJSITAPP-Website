import styled from "@emotion/styled";
import Avatar from "~components/Layout/Avatar";

const MenuButton = styled.button<{
  hoverable?: boolean;
  padding?: string;
  margin?: string;
  primary?: boolean;
}>`
  cursor: pointer;
  color: ${({ primary }) => (primary ? "#efefef" : "#025f6d")};
  background-color: transparent;
  transition: color 0.2s ease-in-out, background 0.2s ease-in-out,
    border 0.2s ease-in-out;
  border-radius: 50%;
  border: 2px solid transparent;
  padding: ${({ padding }) => padding || "8px"};
  font-size: 15px;
  text-align: left;
  display: flex;
  align-items: center;
  margin: ${({ margin }) => margin || "0px"};

  :hover {
    ${Avatar} {
      color: #025f6d;
    }
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
